//! # Admin
//! Service/Subapplication for administration.
//!

use actix_files::NamedFile;
use actix_session::Session;
use actix_web::{web, HttpResponse, Responder, Result};

use serde::{Deserialize, Serialize};

use mongodb::bson::doc;

use crate::models::users;
use mango_orm::{QCommon, QPaladins};

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
        cfg.service(web::resource("/login").route(web::post().to(login)));
        // cfg.service(web::resource("/logout").route(web::post().to(logout)));
    }
}

// REQUEST HANDLERS
// #################################################################################################
pub mod request_handlers {
    use super::*;

    // Admin panel
    // *********************************************************************************************
    pub async fn admin_panel() -> Result<NamedFile> {
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
        // Provide admin page
        let path = admin_file_path("index.html");
        Ok(NamedFile::open(path)?)
    }

    // Login
    // *********************************************************************************************
    #[derive(Deserialize)]
    pub struct LoginForm {
        username: String,
        password: String,
    }

    #[derive(Serialize)]
    pub struct LoginResult {
        message: String,
        is_authenticated: bool,
    }

    pub async fn login(session: Session, login_form: web::Path<LoginForm>) -> impl Responder {
        let mut message = "Access is denied".to_string();
        let mut is_authenticated = false;

        if let Some(access) = session.get::<bool>("is_authenticated").unwrap() {
            message = "Success".to_string();
            is_authenticated = access;
        } else {
            let username = login_form.username.to_string();
            let password = login_form.password.to_string();
            let filter = Some(doc! {"username": username});
            let output_data = users::User::find_one(filter, None).unwrap();

            if output_data.bool() {
                let user = output_data.model::<users::User>().unwrap();
                if user.verify_password(password.as_str(), None).unwrap() {
                    message = "Success".to_string();
                    is_authenticated = true;
                }
            }
        }

        HttpResponse::Ok()
            .content_type("application/json")
            .json(LoginResult {
                message,
                is_authenticated,
            })
    }

    // Logout
    // *********************************************************************************************
    /*
    #[derive(Deserialize)]
    pub struct LogoutForm {
        username: String,
        password: String,
    }

    #[derive(Serialize)]
    pub struct LogoutResult {
        msg: String,
    }

    pub async fn logout(session: Session, logout_form: web::Path<LogoutForm>) -> impl Responder {
        HttpResponse::Ok()
            .content_type("application/json")
            .json(LogoutResult {
                msg: "???".to_string(),
            })
    }
    */
}
