//! # Primal
//! Service/Subapplication by default.
//!

use actix_session::Session;
use actix_web::{web, Error, HttpResponse};

use tera::{Context, Tera};

use crate::settings;

pub use configure_urls::*;
pub use request_handlers::*;

// CONFIGURE URLs
// #################################################################################################
pub mod configure_urls {
    use super::*;

    pub fn config(cfg: &mut web::ServiceConfig) {
        cfg.service(web::resource("/").route(web::get().to(index)));
    }
}

// REQUEST HANDLERS
// #################################################################################################
pub mod request_handlers {
    use super::*;

    // Home page
    // *********************************************************************************************
    pub async fn index(
        session: Session,
        app_state: web::Data<settings::AppState>,
        tmpl: web::Data<Tera>,
    ) -> Result<HttpResponse, Error> {
        // access request identity
        let welcome: String;
        if let Some(id_user) = session.get::<String>("username")? {
            welcome = format!("Welcome! {}", id_user);
        } else {
            welcome = "Welcome Anonymous!".to_string();
        }
        let mut ctx = Context::new();
        ctx.insert("title", app_state.get_app_name().as_str());
        ctx.insert(
            "description",
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        );
        ctx.insert("welcome", welcome.as_str());
        let rendered = tmpl.render("index.html", &ctx).unwrap();
        Ok(HttpResponse::Ok().content_type("text/html").body(rendered))
    }
}

// TESTS
// #################################################################################################
#[cfg(test)]
mod tests {
    use super::*;
    use actix_web::{http, test, web, App};

    // Handlers
    // *********************************************************************************************
    #[actix_rt::test]
    async fn test_index_ok() {
        let app_state = web::Data::new(settings::AppState::new());
        let tera = Tera::new(concat!(env!("CARGO_MANIFEST_DIR"), "/templates/**/*")).unwrap();

        let mut app = test::init_service(
            App::new()
                .app_data(app_state)
                .data(tera)
                .route("/", web::get().to(index)),
        )
        .await;

        let req = test::TestRequest::get().uri("/").to_request();
        let resp = test::call_service(&mut app, req).await;
        assert_eq!(resp.status(), http::StatusCode::OK);
    }
}
