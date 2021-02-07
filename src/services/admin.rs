//! # Admin
//! Service/Subapplication for administration.
//!

use actix_files::NamedFile;
use actix_web::{web, Result};

pub use configure_urls::*;
pub use request_handlers::*;

// CONFIGURE URLs
// #################################################################################################
pub mod configure_urls {
    use super::*;

    pub fn config(cfg: &mut web::ServiceConfig) {
        cfg.service(web::resource("/panel").route(web::get().to(admin_panel)));
    }
}

// REQUEST HANDLERS
// #################################################################################################
pub mod request_handlers {
    use super::*;

    // Admin panel
    // *********************************************************************************************
    pub async fn admin_panel() -> Result<NamedFile> {
        let path = "./admin/index.html";
        Ok(NamedFile::open(path)?)
    }
}
