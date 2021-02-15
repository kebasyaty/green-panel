//! # Admin
//! Service/Subapplication for administration.
//!

use actix_files::NamedFile;
use actix_web::{web, Result};

pub use configure_urls::*;
pub use request_handlers::*;

use crate::models::admin;
use mango_orm::{QCommon, QPaladins};

fn admin_file_path(inner_path: &str) -> String {
    format!("./admin/{}", inner_path)
}

// CONFIGURE URLs
// #################################################################################################
pub mod configure_urls {
    use super::*;

    pub fn config(cfg: &mut web::ServiceConfig) {
        cfg.service(web::resource("/").route(web::get().to(admin_panel)));
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
        if admin::User::estimated_document_count(None).unwrap() == 0_i64 {
            let mut first_user = admin::User {
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
}
