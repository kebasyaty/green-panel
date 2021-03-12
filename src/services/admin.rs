//! # Admin
//! Service/Subapplication for administration.
//!

use actix_files::Files;
use actix_files::NamedFile;
use actix_session::Session;
use actix_web::{web, Error, HttpResponse, Result};

use mongodb::{
    bson::{doc, Bson, Regex},
    options::FindOptions,
};
use serde::Deserialize;
use serde_json::{json, Value};

use crate::models::{registration::admin_panel, services::admin::users};
use mango_orm::{QCommon, QPaladins, DB_MAP_CLIENT_NAMES, FORM_CACHE};

pub use configure_urls::*;
pub use request_handlers::*;

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
        let username: String;
        let mut is_authenticated = false;
        let mut msg_err = String::new();
        // Access request identity
        // -----------------------------------------------------------------------------------------
        if let Some(user) = session.get::<String>("user")? {
            username = user;
            is_authenticated = true;
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
        if session.get::<String>("user")?.is_some() && session.get::<bool>("is_staff")?.unwrap() {
            is_authenticated = true;
        } else {
            msg_err = "Authentication failed.".to_string();
        }
        // Return json response
        Ok(HttpResponse::Ok().content_type("application/json").json(
            json!({ "service_list": admin_panel::service_list(),
                    "is_authenticated": is_authenticated,
                    "msg_err": msg_err }),
        ))
    }

    // Get document list
    // *********************************************************************************************
    #[derive(Deserialize)]
    pub struct DocListQuery {
        model_key: String,
        field_name: String,
        page_num: u32,
        search_query: String,
    }

    pub async fn document_list(
        session: Session,
        query: web::Query<DocListQuery>,
    ) -> Result<HttpResponse, Error> {
        let mut is_authenticated = false;
        let mut msg_err = String::new();
        let mut documents: Vec<Value> = Vec::new();
        let pages_number: u64;
        // Access request identity
        // -----------------------------------------------------------------------------------------
        if session.get::<String>("user")?.is_some() && session.get::<bool>("is_staff")?.unwrap() {
            is_authenticated = true;
        } else {
            msg_err = "Authentication failed.".to_string();
        }
        // Get doc list (database query)
        // -----------------------------------------------------------------------------------------
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
                .projection(Some(doc! {query.field_name.as_str(): 1}))
                .build(),
        );
        // Get read access from cache.
        // -----------------------------------------------------------------------------------------
        let form_store = FORM_CACHE.read().unwrap();
        let form_cache = form_store.get(query.model_key.as_str()).unwrap();
        let meta = &form_cache.meta;
        let client_store = DB_MAP_CLIENT_NAMES.read().unwrap();
        let client: &mongodb::sync::Client = client_store.get(&meta.db_client_name).unwrap();
        // Accessing the collection
        let coll = client
            .database(meta.database_name.as_str())
            .collection(meta.collection_name.as_str());
        // Get the number of pages (50 documents per page).
        pages_number =
            (coll.count_documents(filter.clone(), None).unwrap() as f64 / 50_f64).ceil() as u64;
        // Get cursor for selecting documents.
        let mut cursor = coll.find(filter, options).unwrap();
        // Selecting documents.
        // -----------------------------------------------------------------------------------------
        while let Some(doc) = cursor.next() {
            let doc = doc.unwrap();
            // Filling in the `documents` array
            documents.push(json!({
                "title": doc.get_str(query.field_name.as_str()).unwrap(),
                "hash": doc.get_object_id("_id").unwrap().to_hex(),
                "created_at": mongodb::bson::Bson::String(
                    doc.get_datetime("created_at").unwrap().to_rfc3339()[..16].into(),
                ),
                "updated_at": mongodb::bson::Bson::String(
                    doc.get_datetime("updated_at").unwrap().to_rfc3339()[..16].into(),
                )
            }))
        }
        // Return json response
        // -----------------------------------------------------------------------------------------
        Ok(HttpResponse::Ok().content_type("application/json").json(
            json!({ "documents": documents,
                    "pages_number": pages_number,
                    "is_authenticated": is_authenticated,
                    "msg_err": msg_err }),
        ))
    }

    // Get document
    // *********************************************************************************************
    /*
    #[derive(Deserialize)]
    pub struct DocQuery {
        model_key: String,
        doc_hash: String,
    }

    pub async fn document(
        session: Session,
        json: web::Json<DocQuery>,
    ) -> Result<HttpResponse, Error> {
        let mut is_authenticated = false;
        let mut msg_err = String::new();
        let mut document = Value::Null;
        // Access request identity
        // -----------------------------------------------------------------------------------------
        if session.get::<String>("user")?.is_some() && session.get::<bool>("is_staff")?.unwrap() {
            is_authenticated = true;
        } else {
            msg_err = "Authentication failed.".to_string();
        }
        // Get doc
        // -----------------------------------------------------------------------------------------
        ???
        // Return json response
        // -----------------------------------------------------------------------------------------
        Ok(HttpResponse::Ok()
            .content_type("application/json")
            .json(json!({ "document": document,
                    "is_authenticated": is_authenticated,
                    "msg_err": msg_err })))
    }
    */
}
