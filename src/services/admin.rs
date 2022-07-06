//! Service (Subapplication) for admin panel.

use actix_files::Files;
use actix_files::NamedFile;
use actix_session::Session;
use actix_web::{error, web, Error, HttpRequest, HttpResponse, Result};

use futures::StreamExt;
use humansize::{file_size_opts, FileSize};
use mongodb::{
    bson::{doc, document::Document, oid::ObjectId, Bson, Regex},
    options::FindOptions,
};
use serde::Deserialize;
use serde_json::{json, Value};

use crate::models::{registration::admin_panel, services::accounts::users};
use mango_orm::{QCommons, QPaladins, ToModel, FORM_STORE, MONGODB_CLIENT_STORE};

pub use configure_urls::*;
pub use request_handlers::*;

use crate::settings;
use crate::settings::general::{
    BRAND, LANGUAGE_CODE, LOGO, MAX_UPLOAD_SIZE, RE_CAPTCHA_SECRET_KEY, RE_CAPTCHA_SITE_KEY, SLOGAN,
};

// Common functions.
fn admin_get_file_path(inner_path: &str) -> String {
    format!("./web-admin/{}", inner_path)
}

// CONFIGURE URLs
// #################################################################################################
pub mod configure_urls {
    use super::*;

    pub fn config(cfg: &mut web::ServiceConfig) {
        cfg.service(Files::new("/contrib", "./web-admin"));
        cfg.service(web::resource("/login").route(web::post().to(login)));
        cfg.service(web::resource("/logout").route(web::post().to(logout)));
        cfg.service(web::resource("/sign-in").route(web::get().to(admin_panel)));
        cfg.service(web::resource("/recaptcha-site-key").route(web::get().to(recaptcha_site_key)));
        cfg.service(web::resource("/service-list").route(web::post().to(service_list)));
        cfg.service(web::resource("/data-filters").route(web::post().to(data_filters)));
        cfg.service(web::resource("/document-list").route(web::post().to(document_list)));
        cfg.service(web::resource("/get-document").route(web::post().to(get_document)));
        cfg.service(
            web::resource("/{model_key}/save-document").route(web::post().to(save_document)),
        );
        cfg.service(web::resource("/delete-document").route(web::post().to(delete_document)));
        cfg.service(web::resource("/delete-many-doc").route(web::post().to(delete_many_doc)));
        cfg.service(web::resource("/update-dyn-data").route(web::post().to(update_dyn_data)));
        cfg.service(web::resource("/update-password").route(web::post().to(update_password)));
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
                    //
                    is_admin: Some(true),
                    is_staff: Some(true),
                    is_active: Some(true),
                    //
                    ..Default::default()
                };
                let result = first_user.save(None, None).unwrap();
                if !result.is_valid() {
                    panic!(
                        "Model: `User` : Error while creating the first user. In detail: {}.",
                        result.hash().unwrap()
                    )
                }
            }
        }
        // Get path to admin page
        let path = admin_get_file_path("index.html");
        // Return response
        Ok(NamedFile::open(path)?)
    }

    // reCaptcha v3 - Get site key
    // *********************************************************************************************
    pub async fn recaptcha_site_key() -> Result<HttpResponse, Error> {
        let msg_err = if RE_CAPTCHA_SITE_KEY.len() == 0 {
            String::from("Error: reCaptcha v3 - Missing site key.")
        } else {
            String::new()
        };
        // Return json response
        // -----------------------------------------------------------------------------------------
        Ok(HttpResponse::Ok()
            .content_type("application/json")
            .json(json!( {
                "site_key": RE_CAPTCHA_SITE_KEY,
                "msg_err": msg_err
            })))
    }

    // Login
    // *********************************************************************************************
    #[derive(Deserialize)]
    pub struct LoginForm {
        username: String,
        password: String,
        token: String, // reCaptcha v3
    }

    pub async fn login(
        session: Session,
        login_form: web::Json<LoginForm>,
        req: HttpRequest,
    ) -> Result<HttpResponse, Error> {
        //
        let mut username = String::new();
        let mut is_authenticated = false;
        let mut msg_err = String::new();

        // Access request identity
        // -----------------------------------------------------------------------------------------
        if let Some(user) = session.get::<String>("user")? {
            if user == login_form.username
                && session.get::<bool>("is_admin")?.unwrap()
                && session.get::<bool>("is_staff")?.unwrap()
                && session.get::<bool>("is_active")?.unwrap()
            {
                username = user;
                is_authenticated = true;
            } else {
                username = login_form.username.clone();
                msg_err = "Authentication failed.".to_string();
            }
        } else {
            // Validation reCAPTCHA
            let user_ip = req.peer_addr().unwrap().ip();
            let res_recaptcha = recaptcha::verify(
                RE_CAPTCHA_SECRET_KEY,
                login_form.token.as_str(),
                Some(&user_ip),
            )
            .await;
            if res_recaptcha.is_err() {
                msg_err = "Authentication failed - reCAPTCHA.".to_string();
            } else {
                // Validation of username and password
                username = login_form.username.clone();
                let password = login_form.password.clone();
                let filter = doc! {"username": username.clone(), "is_admin": true, "is_staff": true, "is_active": true};
                // Search for a user in the database
                let user =
                    users::User::find_one_to_model_instance::<users::User>(filter, None).unwrap();
                // Check search result
                if user.is_some() {
                    // Get an instance of a User model
                    let user = user.unwrap();
                    // Check password
                    let is_admin = user.is_admin.unwrap();
                    let is_staff = user.is_staff.unwrap();
                    let is_active = user.is_active.unwrap();
                    if user.verify_password(password.as_str(), None).unwrap()
                        && is_admin
                        && is_staff
                        && is_active
                    {
                        // Add user identity to session
                        session.set("user", user.username.unwrap())?; // Set `id user`
                        session.set("hash", user.hash.unwrap())?; // Set `hash`
                        session.set("is_admin", is_admin)?; // Set `is admin`
                        session.set("is_staff", is_staff)?; // Set `is staff`
                        session.set("is_active", is_active)?; // Set `is active`
                        is_authenticated = true;
                    } else {
                        msg_err = "Authentication failed.".to_string();
                    }
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
    pub async fn service_list(
        session: Session,
        app_state: web::Data<settings::AppState>,
    ) -> Result<HttpResponse, Error> {
        //
        let mut is_authenticated = false;
        let mut msg_err = String::new();
        // Access request identity
        if session.get::<String>("user")?.is_some()
            && session.get::<String>("hash")?.is_some()
            && session.get::<bool>("is_admin")?.unwrap()
            && session.get::<bool>("is_staff")?.unwrap()
            && session.get::<bool>("is_active")?.unwrap()
        {
            is_authenticated = true;
        } else {
            msg_err = "Authentication failed.".to_string();
        }
        // Return json response
        Ok(HttpResponse::Ok()
            .content_type("application/json")
            .json(json!({
                "is_authenticated": is_authenticated,
                "logo": app_state.format_static_url(LOGO),
                "brand": BRAND,
                "slogan": SLOGAN,
                "language_code": LANGUAGE_CODE,
                "service_list": admin_panel::service_list().unwrap(),
                "msg_err": msg_err
            })))
    }

    // Get data to filter by category (сategory - selection type fields).
    // *********************************************************************************************
    #[derive(Deserialize)]
    pub struct QueryGetDataFilters {
        model_key: String,
    }

    pub async fn data_filters(
        session: Session,
        query: web::Json<QueryGetDataFilters>,
    ) -> Result<HttpResponse, Error> {
        let mut is_authenticated = false;
        let mut msg_err = String::new();
        let mut filters = Vec::<Value>::new();

        // Access request identity
        // -----------------------------------------------------------------------------------------
        if session.get::<String>("user")?.is_some()
            && session.get::<String>("hash")?.is_some()
            && session.get::<bool>("is_admin")?.unwrap()
            && session.get::<bool>("is_staff")?.unwrap()
            && session.get::<bool>("is_active")?.unwrap()
        {
            is_authenticated = true;
            //
            let form_store = FORM_STORE.read().unwrap();
            let form_cache = form_store.get(query.model_key.as_str()).unwrap();
            let map_widgets = &form_cache.map_widgets;
            //
            for (field_name, widget) in map_widgets {
                let widget_name = widget.widget.as_str();
                if widget_name.contains("select") {
                    let value_type: &str = if widget_name.contains("F") {
                        "f64"
                    } else if widget_name.contains("I") || widget_name.contains("U") {
                        "i64"
                    } else {
                        "str"
                    };
                    let mut items = Vec::<Value>::new();
                    let options = widget.options.clone();
                    for (value, title) in options {
                        let item = json!({
                            "title": title,
                            "value": match value_type {
                                "f64" => json!(value.parse::<f64>().unwrap()),
                                "i64" => json!(value.parse::<i64>().unwrap()),
                                _ => json!(value)
                            }
                        });
                        items.append(&mut vec![item]);
                    }
                    let filter = json!({
                        "label": widget.label,
                        "field": field_name,
                        "negation": false,
                        "multiple": widget_name.contains("Mult"),
                        "items": items
                    });
                    filters.append(&mut vec![filter]);
                }
            }
        } else {
            msg_err = "Authentication failed.".to_string();
        }

        // Return json response
        // -----------------------------------------------------------------------------------------
        Ok(HttpResponse::Ok()
            .content_type("application/json")
            .json(json!({
                "is_authenticated": is_authenticated,
                "filters": filters,
                "msg_err": msg_err
            })))
    }

    // Get document list
    // *********************************************************************************************
    #[derive(Deserialize)]
    pub struct QueryGetDocList {
        model_key: String,
        fields_name: Vec<String>,
        page_num: u32,
        search_query: String,
        limit: u32,
        sort: String,
        direct: i32,
        filters: Value,
    }

    pub async fn document_list(
        session: Session,
        query: web::Json<QueryGetDocList>,
    ) -> Result<HttpResponse, Error> {
        //
        let mut is_authenticated = false;
        let mut msg_err = String::new();
        let mut documents: Vec<Value> = Vec::new();
        let mut page_count: u32 = 1;

        // Access request identity
        // -----------------------------------------------------------------------------------------
        if session.get::<String>("user")?.is_some()
            && session.get::<String>("hash")?.is_some()
            && session.get::<bool>("is_admin")?.unwrap()
            && session.get::<bool>("is_staff")?.unwrap()
            && session.get::<bool>("is_active")?.unwrap()
        {
            is_authenticated = true;
        } else {
            msg_err = "Authentication failed.".to_string();
        }

        // Get document list
        // -----------------------------------------------------------------------------------------
        if msg_err.is_empty() {
            // Get read access from cache
            // -------------------------------------------------------------------------------------
            let form_store = FORM_STORE.read().unwrap();
            let form_cache = form_store.get(query.model_key.as_str()).unwrap();
            let meta = &form_cache.meta;
            let map_widget_type = &meta.map_widget_type;
            let search_query: &str = query.search_query.as_str();
            let fields_name = &query.fields_name;

            // Define filter and options for database query
            // -------------------------------------------------------------------------------------
            // Query filter
            let mut filter = None;
            // If the query string looks like an id hash.;
            if ObjectId::with_string(search_query).is_ok() {
                let mut tmp_doc: Vec<Document> = Vec::new();
                let object_id = ObjectId::with_string(search_query).unwrap();
                tmp_doc.push(doc! {"_id": object_id});
                for (field_name, widget_type) in map_widget_type {
                    if fields_name.contains(field_name) {
                        match widget_type.as_str() {
                            "inputText" | "hiddenText" => {
                                tmp_doc.push(doc! {field_name: search_query})
                            }
                            _ => {}
                        }
                    }
                }
                filter = Some(doc! {"$or": tmp_doc});
            } else {
                let categories = query.filters.as_object().unwrap();
                let is_categories = categories.len() > 0;
                let is_search_query = !search_query.is_empty();
                //
                if is_search_query || is_categories {
                    let search_pattern = if is_search_query {
                        Bson::RegularExpression(Regex {
                            pattern: format!(r"^{}$", search_query),
                            options: "i".to_string(),
                        })
                    } else {
                        Bson::Null
                    };
                    let mut tmp_doc_vec: Vec<Document> = Vec::new();
                    let mut tmp_doc_vec_2: Vec<Document> = Vec::new();
                    for (field_name, widget_type) in map_widget_type {
                        // Text search
                        if is_search_query && fields_name.contains(field_name) {
                            match widget_type.as_str() {
                                "inputEmail" | "radioText" | "inputPhone" | "inputText"
                                | "inputUrl" | "inputColor" | "inputIP" | "inputIPv4"
                                | "inputIPv6" | "hiddenText" => {
                                    tmp_doc_vec.push(doc! {field_name: &search_pattern})
                                }
                                _ => {}
                            }
                        }
                        // Search by categories - Fields of Selection type
                        if is_categories {
                            if let Some(category) = categories.get(field_name) {
                                let category = category.as_object().unwrap();
                                let value = category.get("value").unwrap();
                                let negation = category.get("negation").unwrap().as_bool().unwrap();
                                match widget_type.as_str() {
                                    // Text
                                    // -----------------------------------------------------------------
                                    "selectText" | "selectTextDyn" => {
                                        let val = value.as_str().unwrap();
                                        let doc = if !negation {
                                            doc! {field_name: val}
                                        } else {
                                            doc! {field_name: {"$ne": val}}
                                        };
                                        tmp_doc_vec_2.push(doc);
                                    }
                                    "selectTextMult" | "selectTextMultDyn" => {
                                        let arr: Vec<&str> = value
                                            .as_array()
                                            .unwrap()
                                            .iter()
                                            .map(|item| item.as_str().unwrap())
                                            .collect();
                                        let doc = if !negation {
                                            doc! {field_name: {"$all": arr}}
                                        } else {
                                            doc! {field_name: {"$not": {"$in": arr}}}
                                        };
                                        tmp_doc_vec_2.push(doc);
                                    }
                                    // I32
                                    // -----------------------------------------------------------------
                                    "selectI32" | "selectI32Dyn" => {
                                        let val = value.as_str().unwrap().parse::<i32>().unwrap();
                                        let doc = if !negation {
                                            doc! {field_name: val}
                                        } else {
                                            doc! {field_name: {"$ne": val}}
                                        };
                                        tmp_doc_vec_2.push(doc);
                                    }
                                    "selectI32Mult" | "selectI32MultDyn" => {
                                        let arr: Vec<i32> = value
                                            .as_array()
                                            .unwrap()
                                            .iter()
                                            .map(|item| {
                                                item.as_str().unwrap().parse::<i32>().unwrap()
                                            })
                                            .collect();
                                        let doc = if !negation {
                                            doc! {field_name: {"$all": arr}}
                                        } else {
                                            doc! {field_name: {"$not": {"$in": arr}}}
                                        };
                                        tmp_doc_vec_2.push(doc);
                                    }
                                    // U32 and I64
                                    // -----------------------------------------------------------------
                                    "selectU32" | "selectU32Dyn" | "selectI64" | "selectI64Dyn" => {
                                        let val = value.as_str().unwrap().parse::<i64>().unwrap();
                                        let doc = if !negation {
                                            doc! {field_name: val}
                                        } else {
                                            doc! {field_name: {"$ne": val}}
                                        };
                                        tmp_doc_vec_2.push(doc);
                                    }
                                    "selectU32Mult" | "selectU32MultDyn" | "selectI64Mult"
                                    | "selectI64MultDyn" => {
                                        let arr: Vec<i64> = value
                                            .as_array()
                                            .unwrap()
                                            .iter()
                                            .map(|item| {
                                                item.as_str().unwrap().parse::<i64>().unwrap()
                                            })
                                            .collect();
                                        let doc = if !negation {
                                            doc! {field_name: {"$all": arr}}
                                        } else {
                                            doc! {field_name: {"$not": {"$in": arr}}}
                                        };
                                        tmp_doc_vec_2.push(doc);
                                    }
                                    // F64
                                    // -----------------------------------------------------------------
                                    "selectF64" | "selectF64Dyn" => {
                                        let val = value.as_str().unwrap().parse::<f64>().unwrap();
                                        let doc = if !negation {
                                            doc! {field_name: val}
                                        } else {
                                            doc! {field_name: {"$ne": val}}
                                        };
                                        tmp_doc_vec_2.push(doc);
                                    }
                                    "selectF64Mult" | "selectF64MultDyn" => {
                                        let arr: Vec<f64> = value
                                            .as_array()
                                            .unwrap()
                                            .iter()
                                            .map(|item| {
                                                item.as_str().unwrap().parse::<f64>().unwrap()
                                            })
                                            .collect();
                                        let doc = if !negation {
                                            doc! {field_name: {"$all": arr}}
                                        } else {
                                            doc! {field_name: {"$not": {"$in": arr}}}
                                        };
                                        tmp_doc_vec_2.push(doc);
                                    }
                                    _ => {}
                                }
                            }
                        }
                    }
                    if is_search_query && is_categories {
                        filter = Some(doc! {"$or": tmp_doc_vec, "$and": tmp_doc_vec_2});
                    } else if is_search_query {
                        filter = Some(doc! {"$or": tmp_doc_vec});
                    } else {
                        filter = Some(doc! {"$and": tmp_doc_vec_2});
                    }
                }
            }

            // Query options
            let limit = i64::from(query.limit);
            let skip = limit * i64::from(query.page_num - 1_u32);
            let sort = match query.sort.as_str() {
                "alphabetical_links" => {
                    doc! {fields_name[0].as_str(): query.direct}
                }
                "created" => doc! {"created_at": query.direct},
                "updated" => doc! {"updated_at": query.direct},
                _ => {
                    let msg = "Sorting Documents - There is no match for the sort type.";
                    return Err(error::ErrorBadRequest(msg));
                }
            };
            let mut projection = doc! {"created_at": 1, "updated_at": 1};
            for field_name in fields_name {
                projection.insert(field_name, 1);
            }
            let options = Some(
                FindOptions::builder()
                    .skip(skip)
                    .limit(limit)
                    .projection(Some(projection))
                    .sort(Some(sort))
                    .build(),
            );

            // Get MongoDB client
            // -------------------------------------------------------------------------------------
            let client_store = MONGODB_CLIENT_STORE.read().unwrap();
            let client: &mongodb::sync::Client =
                client_store.get(meta.db_client_name.as_str()).unwrap();

            // Accessing the collection
            // -------------------------------------------------------------------------------------
            let coll = client
                .database(meta.database_name.as_str())
                .collection(meta.collection_name.as_str());

            // Get the number of pages
            // -------------------------------------------------------------------------------------
            page_count = (coll.count_documents(filter.clone(), None).unwrap() as f64
                / query.limit as f64)
                .ceil() as u32;
            // Get cursor for selecting documents.
            let mut cursor = coll.find(filter, options).unwrap();

            // Selecting documents
            // -------------------------------------------------------------------------------------
            let re_find_color = regex::RegexBuilder::new(
                r"(?P<color>(?:#|0x)(?:[a-f0-9]{3}|[a-f0-9]{6}|[a-f0-9]{8})\b|(?:rgb|hsl)a?\([^\)]*\))",)
                .case_insensitive(true).build().unwrap();
            //
            while let Some(doc) = cursor.next() {
                let doc = doc.unwrap();
                // Filling in the `documents` array
                let mut tmp_doc = doc! {
                    "hash": Bson::String(doc.get_object_id("_id").unwrap().to_hex()),
                    "created_at":
                        Bson::String(doc.get_datetime("created_at").unwrap().to_rfc3339()[..19].to_string()),
                    "updated_at":
                        Bson::String(doc.get_datetime("updated_at").unwrap().to_rfc3339()[..19].to_string())
                };
                for field_name in fields_name {
                    match map_widget_type.get(field_name).unwrap().as_str() {
                        "inputEmail" | "radioText" | "inputPhone" | "inputText" | "inputUrl"
                        | "inputIP" | "inputIPv4" | "inputIPv6" | "selectText"
                        | "selectTextDyn" | "hiddenText" => {
                            tmp_doc.insert(
                                field_name,
                                doc.get_str(field_name).unwrap_or("").to_string(),
                            );
                        }
                        "inputColor" => {
                            let color = doc.get_str(field_name).unwrap_or("").to_string();
                            let html = format!(
                                r#"<div class="show-color" style="background-color:{};"></div>"#,
                                color
                            );
                            tmp_doc.insert(field_name, html);
                        }
                        "numberI32" | "radioI32" | "rangeI32" | "selectI32" | "selectI32Dyn"
                        | "hiddenI32" => {
                            let num = doc.get_i32(field_name);
                            tmp_doc.insert(
                                field_name,
                                if num.is_ok() {
                                    num.unwrap().to_string()
                                } else {
                                    String::new()
                                },
                            );
                        }
                        "numberU32" | "numberI64" | "radioU32" | "radioI64" | "rangeU32"
                        | "rangeI64" | "selectU32" | "selectI64" | "selectU32Dyn"
                        | "selectI64Dyn" | "hiddenU32" | "hiddenI64" => {
                            let num = doc.get_i64(field_name);
                            tmp_doc.insert(
                                field_name,
                                if num.is_ok() {
                                    num.unwrap().to_string()
                                } else {
                                    String::new()
                                },
                            );
                        }
                        "numberF64" | "radioF64" | "rangeF64" | "selectF64" | "selectF64Dyn"
                        | "hiddenF64" => {
                            let num = doc.get_f64(field_name);
                            tmp_doc.insert(
                                field_name,
                                if num.is_ok() {
                                    num.unwrap().to_string()
                                } else {
                                    String::new()
                                },
                            );
                        }
                        "selectTextMult" | "selectTextMultDyn" | "selectI32Mult"
                        | "selectI32MultDyn" | "selectU32Mult" | "selectU32MultDyn"
                        | "selectI64Mult" | "selectI64MultDyn" | "selectF64Mult"
                        | "selectF64MultDyn" => {
                            let empty_arr: Vec<Bson> = Vec::new();
                            let arr = doc.get_array(field_name).unwrap_or(&empty_arr);
                            let result = serde_json::to_string(arr).unwrap();
                            let result = result[1..result.len() - 1]
                                .to_string()
                                .replace(r#"""#, "")
                                .replace(",", " ; ");
                            let result = re_find_color.replace_all(
                                result.as_str(),
                                r#"<div class="sm-show-color" style="background-color:$color;"></div>"#,
                            );
                            tmp_doc.insert(field_name, result.to_string());
                        }
                        "inputImage" => {
                            let mut img_html = String::new();
                            if let Ok(img_bson) = doc.get_document(field_name) {
                                let urls: [&str; 5] =
                                    ["url_xs", "url_sm", "url_md", "url_lg", "url"];
                                for url in urls.iter() {
                                    if let Ok(thumbnail_url) = img_bson.get_str(url) {
                                        if !thumbnail_url.is_empty() {
                                            img_html = format!(
                                                r#"<img class="rounded-lg mt-1" src="{}" height="40" alt="Image">"#,
                                                thumbnail_url
                                            );
                                            break;
                                        }
                                    }
                                }
                            }
                            tmp_doc.insert(field_name, img_html);
                        }
                        "checkBox" => {
                            let checked = doc.get_bool(field_name).unwrap_or(false);
                            let (icon_name, color_name) = if checked {
                                ("checkbox-marked-outline", "orange")
                            } else {
                                ("checkbox-blank-outline", "lime")
                            };
                            tmp_doc.insert(
                                field_name,
                                format!(r#"<span class="mdi mdi-24px mdi-{} {}--text text--darken-1"></span>"#, icon_name, color_name),
                            );
                        }
                        _ => {
                            let msg = format!(
                                "services/admin/service_list() > Field: `{}` -> Invalid Widget type.",
                                field_name
                            );
                            return Err(error::ErrorBadRequest(msg));
                        }
                    }
                }
                documents.push(serde_json::to_value(tmp_doc).unwrap());
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
        let doc_hash = query.doc_hash.clone();
        let mut document = String::new();

        // Access request identity
        // -----------------------------------------------------------------------------------------
        if session.get::<String>("user")?.is_some()
            && session.get::<String>("hash")?.is_some()
            && session.get::<bool>("is_admin")?.unwrap()
            && session.get::<bool>("is_staff")?.unwrap()
            && session.get::<bool>("is_active")?.unwrap()
        {
            is_authenticated = true;
        } else {
            msg_err = "Authentication failed.".to_string();
        }

        // Define the desired model by `model_key` and
        // get an instance of the model in json format (for the administrator)
        if msg_err.is_empty() {
            document = admin_panel::get_document_reg(model_key.as_str(), doc_hash.as_str()).unwrap()
        }

        // Return json response
        // -----------------------------------------------------------------------------------------
        Ok(HttpResponse::Ok()
            .content_type("application/json")
            .json(json!({
                "document": document,
                "is_authenticated": is_authenticated,
                "msg_err": msg_err,
                "max_size": MAX_UPLOAD_SIZE
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
        let mut document = String::new();

        // Access request identity
        // -----------------------------------------------------------------------------------------
        if session.get::<String>("user")?.is_some()
            && session.get::<String>("hash")?.is_some()
            && session.get::<bool>("is_admin")?.unwrap()
            && session.get::<bool>("is_staff")?.unwrap()
            && session.get::<bool>("is_active")?.unwrap()
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
            if (bytes.len() + chunk.len()) > MAX_UPLOAD_SIZE {
                msg_err = format!(
                    "The total size of the form data exceeds the {} limit.",
                    MAX_UPLOAD_SIZE.file_size(file_size_opts::BINARY).unwrap()
                );
            }
            bytes.extend_from_slice(&chunk);
        }

        // Define the desired model with `model_key` and save/update in the database
        if msg_err.is_empty() {
            document =
                admin_panel::save_document_reg(path.model_key.as_str(), &bytes, app_state).unwrap()
        }

        // Return json response
        // -----------------------------------------------------------------------------------------
        Ok(HttpResponse::Ok()
            .content_type("application/json")
            .json(json!({
                "is_authenticated": is_authenticated,
                "msg_err": msg_err,
                "document": document,
            })))
    }

    // Delete document
    // *********************************************************************************************
    #[derive(Deserialize)]
    pub struct QueryDeleteDoc {
        model_key: String,
        doc_hash: String,
    }

    pub async fn delete_document(
        session: Session,
        query: web::Json<QueryDeleteDoc>,
    ) -> Result<HttpResponse, Error> {
        //
        let mut is_authenticated = false;
        let mut msg_err = String::new();

        // Access request identity
        // -----------------------------------------------------------------------------------------
        if session.get::<String>("user")?.is_some()
            && session.get::<String>("hash")?.is_some()
            && session.get::<bool>("is_admin")?.unwrap()
            && session.get::<bool>("is_staff")?.unwrap()
            && session.get::<bool>("is_active")?.unwrap()
        {
            is_authenticated = true;
        } else {
            msg_err = "Authentication failed.".to_string();
        }

        // Get read access from cache
        // -----------------------------------------------------------------------------------------
        if msg_err.is_empty() {
            let form_store = FORM_STORE.read().unwrap();
            let form_cache = form_store.get(query.model_key.as_str()).unwrap();
            let meta = &form_cache.meta;
            if meta.is_del_docs {
                // Create a filter for a database query
                let object_id = ObjectId::with_string(query.doc_hash.as_str()).unwrap();
                let filter = doc! {"_id": object_id};

                msg_err =
                    admin_panel::delete_document_reg(query.model_key.as_str(), filter).unwrap();
            } else {
                msg_err = "It is forbidden to perform delete.".to_string();
            }
        }

        // Return json response
        // -----------------------------------------------------------------------------------------
        Ok(HttpResponse::Ok()
            .content_type("application/json")
            .json(json!({
                    "is_authenticated": is_authenticated,
                    "msg_err": msg_err
            })))
    }

    // Delete document
    // *********************************************************************************************
    #[derive(Deserialize)]
    pub struct QueryDeleteManyDoc {
        model_key: String,
        doc_hash_list: Vec<String>,
    }

    pub async fn delete_many_doc(
        session: Session,
        query: web::Json<QueryDeleteManyDoc>,
    ) -> Result<HttpResponse, Error> {
        //
        let mut is_authenticated = false;
        let mut msg_err = String::new();

        // Access request identity
        // -----------------------------------------------------------------------------------------
        if session.get::<String>("user")?.is_some()
            && session.get::<String>("hash")?.is_some()
            && session.get::<bool>("is_admin")?.unwrap()
            && session.get::<bool>("is_staff")?.unwrap()
            && session.get::<bool>("is_active")?.unwrap()
        {
            is_authenticated = true;
        } else {
            msg_err = "Authentication failed.".to_string();
        }

        // Get read access from cache
        // -----------------------------------------------------------------------------------------
        if msg_err.is_empty() {
            let form_store = FORM_STORE.read().unwrap();
            let form_cache = form_store.get(query.model_key.as_str()).unwrap();
            let meta = &form_cache.meta;
            //
            let model_key = query.model_key.as_str();
            //
            if meta.is_del_docs {
                for hash in query.doc_hash_list.iter() {
                    // Create a filter for a database query
                    let object_id = ObjectId::with_string(hash.as_str()).unwrap();
                    let filter = doc! {"_id": object_id};

                    msg_err = admin_panel::delete_document_reg(model_key, filter).unwrap();
                    if !msg_err.is_empty() {
                        break;
                    }
                }
            } else {
                msg_err = "It is forbidden to perform delete.".to_string();
            }
        }

        // Return json response
        // -----------------------------------------------------------------------------------------
        Ok(HttpResponse::Ok()
            .content_type("application/json")
            .json(json!({
                    "is_authenticated": is_authenticated,
                    "msg_err": msg_err
            })))
    }

    // Refresh data for dynamic widgets
    // *********************************************************************************************
    #[derive(Deserialize)]
    pub struct QueryUpdateDynData {
        model_key: String,
        json_options: String,
    }

    pub async fn update_dyn_data(
        session: Session,
        query: web::Json<QueryUpdateDynData>,
    ) -> Result<HttpResponse, Error> {
        //
        let mut is_authenticated = false;
        let mut msg_err = String::new();

        // Access request identity
        // -----------------------------------------------------------------------------------------
        if session.get::<String>("user")?.is_some()
            && session.get::<String>("hash")?.is_some()
            && session.get::<bool>("is_admin")?.unwrap()
            && session.get::<bool>("is_staff")?.unwrap()
            && session.get::<bool>("is_active")?.unwrap()
        {
            is_authenticated = true;
        } else {
            msg_err = "Authentication failed.".to_string();
        }

        // Define the desired model by `model_key` and update dynamic data
        // -----------------------------------------------------------------------------------------
        if msg_err.is_empty() {
            admin_panel::update_dyn_data_reg(query.model_key.as_str(), query.json_options.as_str())
                .unwrap();
        }

        // Return json response
        // -----------------------------------------------------------------------------------------
        Ok(HttpResponse::Ok()
            .content_type("application/json")
            .json(json!({
                "is_authenticated": is_authenticated,
                "msg_err": msg_err
            })))
    }

    // Update password
    // *********************************************************************************************
    #[derive(Deserialize)]
    pub struct QueryUpdatePassword {
        old_pass: String,
        new_pass: String,
        model_key: String,
        doc_hash: String,
    }

    pub async fn update_password(
        session: Session,
        query: web::Json<QueryUpdatePassword>,
    ) -> Result<HttpResponse, Error> {
        //
        let mut is_authenticated = false;
        let mut msg_err = String::new();

        // Access request identity
        // -----------------------------------------------------------------------------------------
        if session.get::<String>("user")?.is_some()
            && session.get::<String>("hash")?.is_some()
            && session.get::<bool>("is_admin")?.unwrap()
            && session.get::<bool>("is_staff")?.unwrap()
            && session.get::<bool>("is_active")?.unwrap()
        {
            is_authenticated = true;
        } else {
            msg_err = "Authentication failed.".to_string();
        }

        // Update password
        if query.model_key == users::User::key().unwrap() {
            if !query.doc_hash.is_empty() {
                let object_id = users::User::hash_to_id(query.doc_hash.as_str()).unwrap();
                let filter = doc! {"_id": object_id};
                let user =
                    users::User::find_one_to_model_instance::<users::User>(filter, None).unwrap();
                if user.is_some() {
                    let user = user.unwrap();
                    if !user
                        .update_password(
                            query.old_pass.as_str(),
                            query.new_pass.as_str(),
                            None,
                            None,
                        )
                        .unwrap()
                    {
                        msg_err =
                            "Sorry, your password has not been updated. Try again.".to_string();
                    }
                } else {
                    return Err(error::ErrorBadRequest("User is not found."));
                }
            } else {
                return Err(error::ErrorBadRequest("Missing document hash."));
            }
        } else {
            return Err(error::ErrorBadRequest("The model key does not match."));
        }

        // Return json response
        // -----------------------------------------------------------------------------------------
        Ok(HttpResponse::Ok()
            .content_type("application/json")
            .json(json!({
                "is_authenticated": is_authenticated,
                "msg_err": msg_err
            })))
    }
}
