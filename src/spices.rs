//! Specific request handlers (favicon, robots, sitemap, page_404).

use actix_files::NamedFile;
use actix_web::{http, web, HttpRequest, HttpResponse, Responder, Result};
use mango_orm::{ToModel, FORM_STORE, MONGODB_CLIENT_STORE};
use mongodb::{bson::doc, options::FindOptions};
pub use request_handlers::*;
use serde::Serialize;
use tera::{Context, Tera};

use crate::{models::services::products::cars::Car, settings};

// REQUEST HANDLERS
// #################################################################################################
pub mod request_handlers {
    use super::*;
    // Favicon
    // =============================================================================================
    pub async fn favicon_ico(app_state: web::Data<settings::AppState>) -> Result<NamedFile> {
        let icon_path = app_state.format_static_root("favicons/favicon.ico");
        Ok(NamedFile::open(icon_path)?)
    }
    pub async fn favicon(
        app_state: web::Data<settings::AppState>,
        path: web::Path<(String,)>,
    ) -> Result<NamedFile> {
        let path = path.into_inner();
        let icon_path = app_state.format_static_root(format!("favicons/{}", path.0).as_str());
        Ok(NamedFile::open(icon_path)?)
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
    // https://www.sitemaps.org/
    //
    #[derive(Serialize)]
    struct Item {
        loc: String,        // Page url. Example: http://www.example.com/
        lastmod: String,    // Date of last modification in YYYY-MM-DD format.
        changefreq: String, // Probable frequency of change: always | hourly | daily | weekly | monthly | yearly | never
        priority: f32, // The priority of URLs relative to other URLs on your site - from 0.0 to 1.0.
    }
    //
    struct Options {
        base_url: String,
        slug_field: String,
        limit: u32,
        model_key: String,
        changefreq: String, // Probable frequency of change: always | hourly | daily | weekly | monthly | yearly | never
        priority: f32, // The priority of URLs relative to other URLs on your site - from 0.0 to 1.0.
    }
    //
    pub async fn sitemap(req: HttpRequest, tmpl: web::Data<Tera>) -> impl Responder {
        let scheme = req.connection_info().scheme().to_owned();
        let host = req.connection_info().host().to_owned();
        //
        let mut ctx = Context::new();
        //
        let form_store = FORM_STORE.read().unwrap();
        let client_store = MONGODB_CLIENT_STORE.read().unwrap();
        //
        // Generate sitemap
        // -----------------------------------------------------------------------------------------
        // Add models < < < < < < < < < < < < < < < < < < < < < < < < < < < < < < < < < < < < < < <
        let options: Vec<Options> = vec![
            // Cars
            Options {
                base_url: format!("{}://{}/products/cars", scheme, host),
                slug_field: String::from("slug"),
                limit: 60,
                model_key: Car::key().unwrap(),
                changefreq: String::from("weekly"),
                priority: 0.5,
            },
            // Other models ...
        ];
        //
        let mut items = Vec::<Item>::new();
        for elem in options {
            let form_cache = form_store.get(elem.model_key.as_str()).unwrap();
            let meta = &form_cache.meta;
            let filter = None;
            let options = Some(
                FindOptions::builder()
                    .limit(elem.limit as i64)
                    .projection(Some(doc! {elem.slug_field.as_str(): 1, "updated_at": 1}))
                    .sort(Some(doc! {"updated_at": -1}))
                    .build(),
            );
            let client: &mongodb::sync::Client =
                client_store.get(meta.db_client_name.as_str()).unwrap();
            let coll = client
                .database(meta.database_name.as_str())
                .collection(meta.collection_name.as_str());
            if let Ok(mut cursor) = coll.find(filter, options) {
                while let Some(doc) = cursor.next() {
                    if let Ok(doc) = doc {
                        if let Ok(slug) = doc.get_str(elem.slug_field.as_str()) {
                            let mut updated_at =
                                doc.get_datetime("updated_at").unwrap().to_rfc3339();
                            updated_at.truncate(10);
                            let item = Item {
                                loc: format!("{}/{}", elem.base_url, slug),
                                lastmod: updated_at,
                                changefreq: elem.changefreq.clone(),
                                priority: elem.priority,
                            };
                            items.push(item);
                        }
                    }
                }
            }
        }
        ctx.insert("items", &items);
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
    //use crate::models;
    use actix_web::{http, test, App};
    use std::collections::HashMap;

    // Handlers - Unit Tests
    // *********************************************************************************************
    #[actix_rt::test]
    async fn test_handlers_ok() {
        //
        //models::registration::migration::mango_migration().unwrap();
        //
        let app_state = web::Data::new(settings::AppState::new());
        let tera = Tera::new(concat!(env!("CARGO_MANIFEST_DIR"), "/templates/**/*")).unwrap();

        let mut app = test::init_service(
            App::new()
                .app_data(app_state)
                .data(tera)
                .route("/favicon.ico", web::get().to(favicon_ico))
                .route("/favicons/{icon}", web::get().to(favicon))
                .route("/robots.txt", web::get().to(robots))
                .route("/sitemap.xml", web::get().to(sitemap))
                .default_service(web::route().to(page_404)),
        )
        .await;

        let mut handlers = HashMap::new();
        handlers.insert("favicon_ico", "/favicon.ico");
        handlers.insert("favicon", "/favicons/favicon.png");
        handlers.insert("robots", "/robots.txt");
        handlers.insert("page_404", "/test-page-404");
        //handlers.insert("sitemap", "/sitemap.xml");

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
