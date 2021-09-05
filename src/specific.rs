//! # Specific request handlers
//! (favicon, robots, sitemap, page_404).
//!

use actix_files::NamedFile;
use actix_web::{http, web, HttpRequest, HttpResponse, Responder, Result};
use serde::Serialize;
use tera::{Context, Tera};

use crate::settings;
pub use request_handlers::*;

use slug::slugify;

use crate::models::services::products::electric_cars::ElectricCar;
use mango_orm::{ToModel, FORM_STORE, MONGODB_CLIENT_STORE};
use mongodb::{bson::doc, options::FindOptions};

// REQUEST HANDLERS
// #################################################################################################
pub mod request_handlers {
    use super::*;
    // Favicon
    // =============================================================================================
    pub async fn favicon(app_state: web::Data<settings::AppState>) -> Result<NamedFile> {
        let path = app_state.format_static_root("favicons/favicon.png");
        Ok(NamedFile::open(path)?)
    }
    // Robots
    // =============================================================================================
    pub async fn robots(req: HttpRequest, tmpl: web::Data<Tera>) -> impl Responder {
        let mut ctx = Context::new();
        ctx.insert("scheme", &req.connection_info().scheme().to_owned());
        ctx.insert("host", &req.connection_info().host().to_owned());
        let rendered = tmpl.render("robots.txt", &ctx).unwrap();
        HttpResponse::Ok().body(rendered)
    }
    // Page 404
    // =============================================================================================
    pub async fn page_404(app_state: web::Data<settings::AppState>) -> Result<NamedFile> {
        let path = app_state.format_template("404.html");
        Ok(NamedFile::open(path)?.set_status_code(http::StatusCode::NOT_FOUND))
    }
    // Sitemap
    // =============================================================================================
    #[derive(Serialize)]
    struct SiteMap {
        title: String,
        date: String,
    }
    pub async fn sitemap(req: HttpRequest, tmpl: web::Data<Tera>) -> impl Responder {
        let mut ctx = Context::new();
        ctx.insert("scheme", &req.connection_info().scheme().to_owned());
        ctx.insert("host", &req.connection_info().host().to_owned());
        //
        let form_store = FORM_STORE.read().unwrap();
        let client_store = MONGODB_CLIENT_STORE.read().unwrap();
        //
        // Electric Cars
        // -----------------------------------------------------------------------------------------
        let model_key = ElectricCar::key();
        let form_cache = form_store.get(model_key.as_str()).unwrap();
        let meta = &form_cache.meta;
        let filter = None;
        let options = Some(
            FindOptions::builder()
                .limit(100_i64)
                .projection(Some(doc! {"model": 1, "updated_at": 1}))
                .sort(Some(doc! {"updated_at": -1}))
                .build(),
        );
        let client: &mongodb::sync::Client =
            client_store.get(meta.db_client_name.as_str()).unwrap();
        let coll = client
            .database(meta.database_name.as_str())
            .collection(meta.collection_name.as_str());
        if let Ok(mut cursor) = coll.find(filter, options) {
            let mut electric_cars: Vec<SiteMap> = Vec::new();
            while let Some(doc) = cursor.next() {
                if let Ok(doc) = doc {
                    let model = slugify(doc.get_str("model").unwrap());
                    let mut updated_at = doc.get_datetime("updated_at").unwrap().to_rfc3339();
                    updated_at.truncate(10);
                    let sitemap = SiteMap {
                        title: model,
                        date: updated_at,
                    };
                    electric_cars.push(sitemap);
                }
            }
            if !electric_cars.is_empty() {
                ctx.insert("electric_cars", &electric_cars);
            }
        }
        // -----------------------------------------------------------------------------------------
        let rendered = tmpl.render("sitemap.xml", &ctx).unwrap();
        HttpResponse::Ok().body(rendered)
    }
}

// TESTS
// #################################################################################################
#[cfg(test)]
mod tests {
    use super::*;
    use actix_web::{http, test, App};
    use std::collections::HashMap;

    // Handlers - Unit Tests
    // *********************************************************************************************
    #[actix_rt::test]
    async fn test_handlers_ok() {
        let app_state = web::Data::new(settings::AppState::new());
        let tera = Tera::new(concat!(env!("CARGO_MANIFEST_DIR"), "/templates/**/*")).unwrap();

        let mut app = test::init_service(
            App::new()
                .app_data(app_state)
                .data(tera)
                .route("/favicon.png", web::get().to(favicon))
                .route("/robots.txt", web::get().to(robots))
                .route("/sitemap.xml", web::get().to(sitemap))
                .default_service(web::route().to(page_404)),
        )
        .await;

        let mut handlers = HashMap::new();
        handlers.insert("favicon", "/favicon.png");
        handlers.insert("robots", "/robots.txt");
        handlers.insert("sitemap", "/sitemap.xml");
        handlers.insert("page_404", "/test-page-404");

        for (handler, route) in &handlers {
            let req = test::TestRequest::get().uri(route).to_request();
            let resp = test::call_service(&mut app, req).await;
            assert_eq!(
                resp.status(),
                match handler {
                    &"page_404" => http::StatusCode::NOT_FOUND,
                    _ => http::StatusCode::OK,
                },
                "Error - Handler: {0} ; Route: `{1}`",
                handler,
                route
            );
        }
    }
}
