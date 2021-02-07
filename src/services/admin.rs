//! # Admin
//! Service/Subapplication for administration.
//!

use actix_files::NamedFile;
use actix_web::{web, Result};

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
        cfg.service(web::resource("/sign-in").route(web::get().to(admin_panel)));
    }
}

// REQUEST HANDLERS
// #################################################################################################
pub mod request_handlers {
    use super::*;

    // Admin panel
    // *********************************************************************************************
    pub async fn admin_panel() -> Result<NamedFile> {
        let path = admin_file_path("index.html");
        Ok(NamedFile::open(path)?)
    }
}
