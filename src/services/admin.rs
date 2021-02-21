//! # Admin
//! Service/Subapplication for administration.
//!

use actix_files::Files;
use actix_files::NamedFile;
use actix_session::Session;
use actix_web::{web, Error, HttpResponse, Result};

use mongodb::bson::doc;
use serde::Deserialize;
use serde_json::json;

use crate::models::{registration::admin_panel, services::admin::users};
use mango_orm::{QCommon, QPaladins, ToModel};

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
        // Access request identity
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
                    session.set("user", user.username.clone())?; // Set id user
                    session.set("hash", user.hash.clone())?; // Set document hash
                    is_authenticated = true;
                }
            }
        }
        // Return json response
        if is_authenticated {
            Ok(HttpResponse::Ok()
                .content_type("application/json")
                .json(json!( {
                    "username": username,
                    "is_authenticated": is_authenticated
                })))
        } else {
            Ok(HttpResponse::BadRequest()
                .content_type("application/json")
                .json(json!( {
                    "error": "Authentication failed."
                })))
        }
    }

    // Logout
    // *********************************************************************************************
    pub async fn logout(session: Session) -> HttpResponse {
        // Clear session
        session.clear();
        // Return json response
        HttpResponse::Ok()
            .content_type("application/json")
            .json(json!( {
                "msg": "Goodbye!"
            }))
    }

    // Service list
    // *********************************************************************************************
    pub async fn service_list(session: Session) -> Result<HttpResponse, Error> {
        // Access request identity
        if session.get::<String>("user")?.is_none() {
            return Ok(HttpResponse::BadRequest()
                .content_type("application/json")
                .json(json!( {
                    "error": "Authentication failed."
                })));
        }
        // Return json response
        Ok(HttpResponse::Ok()
            .content_type("application/json")
            .json(admin_panel::service_list()))
    }

    // Document list
    // *********************************************************************************************
    #[derive(Deserialize)]
    pub struct DocListRequest {
        model_key: String,
        field_name: String,
    }

    pub async fn document_list(
        session: Session,
        json_req: web::Json<DocListRequest>,
    ) -> Result<HttpResponse, Error> {
        // Access request identity
        if session.get::<String>("user")?.is_none() {
            return Ok(HttpResponse::BadRequest()
                .content_type("application/json")
                .json(json!( {
                    "error": "Authentication failed."
                })));
        }
        // Get doc list
        let output_data = if json_req.model_key == users::User::key() {
            //
        } else {
            return Ok(HttpResponse::BadRequest()
                .content_type("application/json")
                .json(json!( {
                    "error": "Undefined model key."
                })));
        };
        // Return json response
        Ok(HttpResponse::Ok()
            .content_type("application/json")
            .json(json!({})))
    }
}
