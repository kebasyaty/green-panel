//! # Admin
//! Service/Subapplication for administration.

use actix_web::{web, HttpResponse, Responder};
use tera::{Context, Tera};

use crate::settings;

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
    pub async fn admin_panel(
        app_state: web::Data<settings::AppState>,
        tmpl: web::Data<Tera>,
    ) -> impl Responder {
        let mut ctx = Context::new();
        ctx.insert("title", &app_state.get_app_name());
        ctx.insert(
            "description",
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        );
        let rendered = tmpl.render("index.html", &ctx).unwrap();
        HttpResponse::Ok().content_type("text/html").body(rendered)
    }
}
