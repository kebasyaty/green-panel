//! # Admin
//! Service/Subapplication for administration.
//!

use actix_files::Files;
use actix_files::NamedFile;
use actix_session::Session;
use actix_web::{web, Error, HttpResponse, Result};

use futures::StreamExt;
use humansize::{file_size_opts, FileSize};
use mongodb::{
    bson::{doc, Bson, Regex},
    options::FindOptions,
};
use serde::Deserialize;
use serde_json::{json, Value};

use crate::models::{registration::admin_panel, services::admin::users};
use mango_orm::{QCommon, QPaladins, ToModel, DB_MAP_CLIENT_NAMES, FORM_CACHE};

pub use configure_urls::*;
pub use request_handlers::*;

use crate::settings;

const BRAND: &str = "Сompany Name";
const SLOGAN: &str = "Brief description of the company.";
// Default data size for the form - 16384 = ~16 Kb
// (max payload size is 2097152 = ~2mb)
const PAYLOAD_MAX_SIZE: usize = 2097_152;

fn admin_file_path(inner_path: &str) -> String {
    format!("./admin/{}", inner_path)
}

// CONFIGURE URLs
// #################################################################################################
pub mod configure_urls {
    use super::*;

    pub fn config(cfg: &mut web::ServiceConfig) {
        cfg.service(Files::new("/contrib", "./admin"));
        cfg.service(web::resource("/login").route(web::post().to(login)));
        cfg.service(web::resource("/logout").route(web::post().to(logout)));
        cfg.service(web::resource("/sign-in").route(web::get().to(admin_panel)));
        cfg.service(web::resource("/service-list").route(web::get().to(service_list)));
        cfg.service(web::resource("/document-list").route(web::get().to(document_list)));
        cfg.service(web::resource("/get-document").route(web::post().to(get_document)));
        cfg.service(
            web::resource("/{model_key}/save-document").route(web::post().to(save_document)),
        );
        cfg.service(web::resource("/*").route(web::get().to(admin_panel)));
        cfg.service(web::resource("").route(web::get().to(admin_panel)));
    }
}

// REQUEST HANDLERS
// #################################################################################################
pub mod request_handlers {
    use super::*;

    // Admin panel
    // *********************************************************************************************
    pub async fn admin_panel(session: Session) -> Result<NamedFile, Error> {
        // Access request identity
        if session.get::<String>("user")?.is_none() {
            // Create first user (administrator)
            if users::User::estimated_document_count(None).unwrap() == 0_i64 {
                let mut first_user = users::User {
                    // Valid characters: a-z A-Z 0-9 _ @ + .
                    // Max size: 150
                    username: Some("admin".into()),
                    email: Some("no_reply@email.net".into()),
                    // Valid characters: a-z A-Z 0-9 @ # $ % ^ & + = * ! ~ ) (
                    // Min size: 8
                    password: Some("12345678".into()),
                    confirm_password: Some("12345678".into()),
                    is_staff: Some(true),
                    is_active: Some(true),
                    ..Default::default()
                };
                let result = first_user.save(None, None, None).unwrap();
                if !result.bool() {
                    panic!(
                        "Model: `User` : Error while creating the first user. In detail: {}.",
                        result.hash().unwrap()
                    )
                }
            }
        }
        // Get path to admin page
        let path = admin_file_path("index.html");
        // Return response
        Ok(NamedFile::open(path)?)
    }

    // Login
    // *********************************************************************************************
    #[derive(Deserialize)]
    pub struct LoginForm {
        username: String,
        password: String,
    }

    pub async fn login(
        session: Session,
        login_form: web::Json<LoginForm>,
    ) -> Result<HttpResponse, Error> {
        //
        let username: String;
        let mut is_authenticated = false;
        let mut msg_err = String::new();

        // Access request identity
        // -----------------------------------------------------------------------------------------
        if let Some(user) = session.get::<String>("user")? {
            if user == login_form.username && session.get::<bool>("is_active")?.unwrap() {
                username = user;
                is_authenticated = true;
            } else {
                username = login_form.username.clone();
                msg_err = "Authentication failed.".to_string();
            }
        } else {
            username = login_form.username.clone();
            let password = login_form.password.clone();
            let filter =
                Some(doc! {"username": username.clone(), "is_staff": true, "is_active": true});
            // Search for a user in the database
            let output_data = users::User::find_one(filter, None).unwrap();
            // Check search result
            if output_data.bool() {
                // Get an instance of a User model
                let user = output_data.model::<users::User>().unwrap();
                // Check password
                if user.verify_password(password.as_str(), None).unwrap() {
                    // Add user identity to session
                    session.set("user", user.username.clone())?; // Set `id user`
                    session.set("hash", user.hash.clone())?; // Set `hash`
                    session.set("is_active", user.is_staff.clone())?; // Set `is active`
                    session.set("is_staff", user.is_staff.clone())?; // Set `is staff`
                    is_authenticated = true;
                } else {
                    msg_err = "Authentication failed.".to_string();
                }
            }
        }

        // Return json response
        // -----------------------------------------------------------------------------------------
        Ok(HttpResponse::Ok()
            .content_type("application/json")
            .json(json!( {
                "username": username,
                "is_authenticated": is_authenticated,
                "msg_err": msg_err
            })))
    }

    // Logout
    // *********************************************************************************************
    pub async fn logout(session: Session) -> Result<HttpResponse, Error> {
        // Clear session
        if session.get::<String>("user")?.is_some() {
            session.clear();
        }
        // Return json response
        Ok(HttpResponse::Ok()
            .content_type("application/json")
            .json(json!( {
                "msg": "Goodbye!"
            })))
    }

    // Get service list
    // *********************************************************************************************
    pub async fn service_list(session: Session) -> Result<HttpResponse, Error> {
        let mut is_authenticated = false;
        let mut msg_err = String::new();
        // Access request identity
        if session.get::<String>("user")?.is_some()
            && session.get::<bool>("is_active")?.unwrap()
            && session.get::<bool>("is_staff")?.unwrap()
        {
            is_authenticated = true;
        } else {
            msg_err = "Authentication failed.".to_string();
        }
        // Return json response
        Ok(HttpResponse::Ok()
            .content_type("application/json")
            .json(json!({
                "service_list": admin_panel::service_list(),
                "is_authenticated": is_authenticated,
                "msg_err": msg_err,
                "brand": BRAND,
                "slogan": SLOGAN
            })))
    }

    // Get document list
    // *********************************************************************************************
    #[derive(Deserialize)]
    pub struct QueryGetDocList {
        model_key: String,
        field_name: String,
        page_num: u32,
        search_query: String,
    }

    pub async fn document_list(
        session: Session,
        query: web::Query<QueryGetDocList>,
    ) -> Result<HttpResponse, Error> {
        //
        let mut is_authenticated = false;
        let mut msg_err = String::new();
        let mut documents: Vec<Value> = Vec::new();
        let mut page_count: u64 = 1;

        // Access request identity
        // -----------------------------------------------------------------------------------------
        if session.get::<String>("user")?.is_some()
            && session.get::<bool>("is_active")?.unwrap()
            && session.get::<bool>("is_staff")?.unwrap()
        {
            is_authenticated = true;
        } else {
            msg_err = "Authentication failed.".to_string();
        }

        if msg_err.is_empty() {
            // Define filter and options for database query.
            // -------------------------------------------------------------------------------------
            let filter = if !query.search_query.is_empty() {
                Some(doc! {
                    query.field_name.as_str():
                    Bson::RegularExpression(
                        Regex{pattern: query.search_query.clone(),
                              options: "im".to_string()}
                    )
                })
            } else {
                None
            };
            let limit = (50_u32 * query.page_num) as i64;
            let options = Some(
                FindOptions::builder()
                    .skip(limit - 50_i64)
                    .limit(limit)
                    .projection(Some(
                        doc! {query.field_name.as_str(): 1, "created_at": 1, "updated_at": 1},
                    ))
                    .build(),
            );

            // Get read access from cache.
            // -------------------------------------------------------------------------------------
            let form_store = FORM_CACHE.read().unwrap();
            let form_cache = form_store.get(query.model_key.as_str()).unwrap();
            let meta = &form_cache.meta;
            let client_store = DB_MAP_CLIENT_NAMES.read().unwrap();
            let client: &mongodb::sync::Client =
                client_store.get(meta.db_client_name.as_str()).unwrap();
            // Accessing the collection
            let coll = client
                .database(meta.database_name.as_str())
                .collection(meta.collection_name.as_str());
            // Get the number of pages (50 documents per page).
            page_count =
                (coll.count_documents(filter.clone(), None).unwrap() as f64 / 50_f64).ceil() as u64;
            // Get cursor for selecting documents.
            let mut cursor = coll.find(filter, options).unwrap();

            // Selecting documents.
            // -------------------------------------------------------------------------------------
            while let Some(doc) = cursor.next() {
                let doc = doc.unwrap();
                // Filling in the `documents` array
                documents.push(json!({
                    "title": doc.get_str(query.field_name.as_str()).unwrap(),
                    "hash": doc.get_object_id("_id").unwrap().to_hex(),
                    "created_at":
                        doc.get_datetime("created_at").unwrap().to_rfc3339()[..16],
                    "updated_at":
                        doc.get_datetime("updated_at").unwrap().to_rfc3339()[..16]
                }))
            }
        }

        // Return json response
        // -----------------------------------------------------------------------------------------
        Ok(HttpResponse::Ok()
            .content_type("application/json")
            .json(json!({
                "documents": documents,
                "page_count": page_count,
                "is_authenticated": is_authenticated,
                "msg_err": msg_err
            })))
    }

    // Get document
    // *********************************************************************************************
    #[derive(Deserialize)]
    pub struct QueryGetDoc {
        model_key: String,
        doc_hash: String,
    }

    pub async fn get_document(
        session: Session,
        query: web::Json<QueryGetDoc>,
    ) -> Result<HttpResponse, Error> {
        //
        let mut is_authenticated = false;
        let mut msg_err = String::new();
        let model_key = query.model_key.clone();
        let mut document = String::new();

        // Access request identity
        // -----------------------------------------------------------------------------------------
        if session.get::<String>("user")?.is_some()
            && session.get::<bool>("is_active")?.unwrap()
            && session.get::<bool>("is_staff")?.unwrap()
        {
            is_authenticated = true;
        } else {
            msg_err = "Authentication failed.".to_string();
        }

        // Define the desired model by `model_key` and
        // get an instance of the model in json format (for the administrator)
        //
        // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< ADD A MODEL TO HANDLE THE REQUEST
        if msg_err.is_empty() {
            if model_key == users::User::key() {
                // Model `users::User`
                // ---------------------------------------------------------------------------------
                let object_id = users::User::hash_to_id(query.doc_hash.as_str()).unwrap();
                let filter = doc! {"_id": object_id};
                let output_data = users::User::find_one(Some(filter), None);
                if let Ok(output_data) = output_data {
                    if output_data.bool() {
                        document = output_data
                            .model::<users::User>()
                            .unwrap()
                            .json_for_admin()
                            .unwrap();
                    }
                } else {
                    msg_err = "Error in the output data.".to_string();
                }

                // Other Models ...
                // ---------------------------------------------------------------------------------
            } else {
                msg_err = "No match for `model_key`.".to_string();
            }
        }

        // Return json response
        // -----------------------------------------------------------------------------------------
        Ok(HttpResponse::Ok()
            .content_type("application/json")
            .json(json!({
                "document": document,
                "is_authenticated": is_authenticated,
                "msg_err": msg_err,
                "max_size": PAYLOAD_MAX_SIZE
            })))
    }

    // Save/update document
    // *********************************************************************************************
    #[derive(Deserialize)]
    pub struct QuerySaveDoc {
        model_key: String,
    }

    pub async fn save_document(
        session: Session,
        mut payload: web::Payload,
        path: web::Path<QuerySaveDoc>,
        app_state: web::Data<settings::AppState>,
    ) -> Result<HttpResponse, Error> {
        //
        let mut is_authenticated = false;
        let mut msg_err = String::new();
        let model_key = path.model_key.clone();
        let mut document = String::new();

        // Access request identity
        // -----------------------------------------------------------------------------------------
        if session.get::<String>("user")?.is_some()
            && session.get::<bool>("is_active")?.unwrap()
            && session.get::<bool>("is_staff")?.unwrap()
        {
            is_authenticated = true;
        } else {
            msg_err = "Authentication failed.".to_string();
        }

        // Load the request body
        // -----------------------------------------------------------------------------------------
        let mut bytes = web::BytesMut::new();
        while let Some(chunk) = payload.next().await {
            let chunk = chunk?;
            // limit max size of in-memory payload
            if (bytes.len() + chunk.len()) > PAYLOAD_MAX_SIZE {
                msg_err = format!(
                    "Data volume exceeds the {} limit.",
                    PAYLOAD_MAX_SIZE
                        .file_size(file_size_opts::CONVENTIONAL)
                        .unwrap()
                );
                break;
            }
            bytes.extend_from_slice(&chunk);
        }

        // Define the desired model with `model_key` and save/update in the database
        //
        // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< ADD A MODEL TO HANDLE THE REQUEST
        if msg_err.is_empty() {
            if model_key == users::User::key() {
                // Model `users::User`
                // ---------------------------------------------------------------------------------
                let model = serde_json::from_slice::<users::User>(&bytes);
                if model.is_ok() {
                    let mut model = model?;
                    model.photo = app_state.to_file(model.photo, "admin/users");
                    if let Ok(output_data) = model.save(None, None, None) {
                        document = output_data.json_for_admin().unwrap();
                    } else {
                        msg_err = "Failed to save document to database.".to_string();
                    }
                } else {
                    msg_err = "Model initialization error.".to_string();
                }

                // Other Models ...
                // ---------------------------------------------------------------------------------
            } else {
                msg_err = "No match for `model_key`.".to_string();
            }
        }

        // Return json response
        // -----------------------------------------------------------------------------------------
        Ok(HttpResponse::Ok()
            .content_type("application/json")
            .json(json!({
                "document": document,
                "is_authenticated": is_authenticated,
                "msg_err": msg_err
            })))
    }
}
