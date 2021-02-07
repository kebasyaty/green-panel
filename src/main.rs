use actix_cors::Cors;
use actix_files::Files;
use actix_session::CookieSession;
use actix_web::{http, middleware, web, App, HttpResponse, HttpServer};
use env_logger;
use tera::Tera;

// Application settings
pub mod settings;
// Specific request handlers (favicon, robots, sitemap, page_404)
pub mod specific;
// Services (sub-apps)
pub mod services;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
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
                        if settings::DEBUG {
                            concat!(
                                "default-src 'self'; connect-src http:; font-src http: data:;",
                                " frame-src 'self'; frame-ancestors 'self';",
                                " img-src http: data:; media-src http:; object-src http:;",
                                " script-src 'unsafe-inline' 'unsafe-eval' http:;",
                                " style-src 'unsafe-inline' http:;",
                                " form-action 'self'; base-uri 'self';"
                            )
                        } else {
                            concat!(
                                "default-src 'self'; connect-src https:; font-src https: data:;",
                                " frame-src 'self'; frame-ancestors 'self';",
                                " img-src https: data:; media-src https:; object-src https:;",
                                " script-src 'unsafe-inline' 'unsafe-eval' https:;",
                                " style-src 'unsafe-inline' https:;",
                                " form-action 'self'; base-uri 'self';"
                            )
                        },
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
                    .domain(settings::site_domain(settings::DEBUG).as_str())
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
            .service(Files::new("/static", "./static"))
            // Media files
            .service(Files::new("/media", "./media"))
            // Specific handlers
            .route("/favicon.ico", web::route().to(specific::favicon))
            .route("/robots.txt", web::route().to(specific::robots))
            .route("/sitemap.xml", web::route().to(specific::sitemap))
            // ... <- Other services
            // Admin service
            .route("/admin", web::route().to(services::admin::admin_panel))
            .service(web::scope("/admin").configure(services::admin::config))
            .service(Files::new("/admin-contrib", "./admin"))
            // Primal service (Home page)
            .service(web::scope("/*").configure(services::primal::config))
            // Page 404
            .default_service(web::route().to(specific::page_404))
    })
    // .keep_alive(5)
    .bind(settings::local_domain().as_str())?
    // .shutdown_timeout(30)
    // .workers(4)
    .run()
    .await
}
