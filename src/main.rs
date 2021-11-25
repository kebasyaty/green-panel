use actix_cors::Cors;
use actix_files::Files;
use actix_session::CookieSession;
use actix_web::{http, middleware, web, App, HttpResponse, HttpServer};

use env_logger;
use tera::Tera;

// Application settings
pub mod settings;
// Specific request handlers (favicon, robots, sitemap, page_404 ...)
pub mod spices;
// Services (sub-apps)
pub mod services;
// Mango-ORM Models
pub mod models;

fn main() -> std::io::Result<()> {
    // Run migration.
    models::registration::migration::mango_migration().unwrap();
    run_http_server()
}

#[actix_web::main]
async fn run_http_server() -> std::io::Result<()> {
    // Init logger middleware (debug, error, info, trace)
    std::env::set_var("RUST_LOG", "actix_web=info,actix_server=info");
    env_logger::init();
    // Directory for temporary files
    std::fs::create_dir_all("./tmp").unwrap();
    // Application state
    let app_state = web::Data::new(settings::AppState::new());
    // Http-Server
    HttpServer::new(move || {
        // Init Tera (template engine)
        let tera = Tera::new(concat!(env!("CARGO_MANIFEST_DIR"), "/templates/**/*")).unwrap();
        // Init CORS
        let cors = Cors::default()
            .allowed_origin(settings::site_url(settings::DEBUG).as_str())
            .allowed_methods(vec!["GET"])
            .allowed_headers(vec![http::header::AUTHORIZATION, http::header::ACCEPT])
            .allowed_header(http::header::CONTENT_TYPE)
            .max_age(if settings::DEBUG { None } else { Some(3600) });
        // Init App
        App::new()
            // Enable Apps state
            .app_data(app_state.clone())
            // Enable Tera (template engine)
            .data(tera)
            // Enable Compress
            .wrap(middleware::Compress::default())
            // Enable Logger
            .wrap(middleware::Logger::default())
            // Enable DefaultHeaders
            .wrap(
                middleware::DefaultHeaders::new()
                    .header(http::header::X_XSS_PROTECTION, "1; mode=block")
                    .header(http::header::X_FRAME_OPTIONS, "deny")
                    .header(http::header::X_CONTENT_TYPE_OPTIONS, "nosniff")
                    .header(
                        http::header::CONTENT_SECURITY_POLICY,
                        format!(
                            concat!(
                                "default-src 'self';",
                                " connect-src 'self' ws: http{0}:;",
                                " font-src 'self' data: 'unsafe-inline' http{0}:;",
                                " img-src 'self' data: content: blob: http{0}:;",
                                " media-src 'self' http{0}:;",
                                " style-src 'self' 'unsafe-inline' http{0}:;",
                                " script-src 'self' 'unsafe-inline' 'unsafe-eval' http{0}:;",
                                " frame-src 'self' http{0}:;",
                                " frame-ancestors 'self' http{0}:;",
                                " object-src 'none';"
                            ),
                            if settings::DEBUG { "" } else { "s" }
                        ),
                    )
                    .header(
                        http::header::STRICT_TRANSPORT_SECURITY,
                        match settings::DEBUG {
                            true => "max-age=0",
                            false => "max-age=31536000; includeSubDomains; preload",
                        },
                    )
                    .header(
                        http::header::REFERRER_POLICY,
                        "strict-origin-when-cross-origin",
                    ),
            )
            // Enable Sessions
            .wrap(
                CookieSession::signed(settings::SESSION_KEY)
                    .domain(settings::site_domain(settings::DEBUG))
                    .name(settings::session_name(settings::PROJECT_NAME))
                    .path("/")
                    .max_age(86_400) // 86_400 sec = 1 day
                    .secure(!settings::DEBUG),
            )
            // Enable CORS
            .wrap(cors)
            // Block `head` request
            .route("*", web::head().to(|| HttpResponse::MethodNotAllowed()))
            // Static files
            .service(Files::new("/static", settings::STATIC_ROOT.to_owned()))
            // Media files
            .service(Files::new("/media", settings::MEDIA_ROOT.to_owned()))
            // Specific handlers
            .route("/favicon.ico", web::route().to(spices::favicon_ico))
            .route("/favicons/{icon}", web::route().to(spices::favicon))
            .route("/robots.txt", web::route().to(spices::robots))
            .route("/sitemap.xml", web::route().to(spices::sitemap))
            // ... <- Other services
            // Admin service (Admin panel page)
            .service(web::scope("/admin").configure(services::admin::config))
            // Primal service (Home page)
            .service(web::scope("*").configure(services::primal::config))
            // Page 404
            .default_service(web::route().to(spices::page_404))
    })
    // .keep_alive(5)
    .bind(settings::local_domain())?
    // .shutdown_timeout(30)
    // .workers(4)
    .run()
    .await
}
