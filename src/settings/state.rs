//! # Application state
//!

use crate::settings::general::{
    DEBUG, MEDIA_ROOT, MEDIA_URL, PROJECT_NAME, STATIC_ROOT, STATIC_URL, TEMPLATES,
};

#[derive(Clone)]
pub struct AppState {
    debug: bool,
    app_name: String,
    media_url: String,
    media_root: String,
    static_url: String,
    static_root: String,
    templates: String,
}

impl AppState {
    pub fn new() -> Self {
        Self {
            debug: DEBUG,
            app_name: PROJECT_NAME.to_string(),
            media_url: MEDIA_URL.to_string(),
            media_root: MEDIA_ROOT.to_string(),
            static_url: STATIC_URL.to_string(),
            static_root: STATIC_ROOT.to_string(),
            templates: TEMPLATES.to_string(),
        }
    }
    // Get status debug
    pub fn get_debug(&self) -> bool {
        self.debug
    }
    // Get App name
    pub fn get_app_name(&self) -> String {
        self.app_name.clone()
    }
    // Get url address of directory for media files
    pub fn get_media_url(&self) -> String {
        self.media_url.clone()
    }
    // Get local address of directory for media files
    pub fn get_media_root(&self) -> String {
        self.media_root.clone()
    }
    // Get url address of directory for static files
    pub fn get_static_url(&self) -> String {
        self.static_url.clone()
    }
    // Get local address of directory for static files
    pub fn get_static_root(&self) -> String {
        self.static_root.clone()
    }
    // Get local address of directory for html files
    pub fn get_template(&self) -> String {
        self.templates.clone()
    }

    // Get media file path
    // Example inner_path: "images/photo.png"
    pub fn format_media_url(&self, inner_path: &str) -> String {
        format!("{}{}", self.media_url, inner_path)
    }
    // Example inner_path: "images/photo.png"
    pub fn format_media_root(&self, inner_path: &str) -> String {
        format!("{}{}", self.media_root, inner_path)
    }
    // Get static file path
    // Example inner_path: "favicons/favicon.ico"
    pub fn format_static_url(&self, inner_path: &str) -> String {
        format!("{}{}", self.static_url, inner_path)
    }
    // Example inner_path: "favicons/favicon.ico"
    pub fn format_static_root(&self, inner_path: &str) -> String {
        format!("{}{}", self.static_root, inner_path)
    }
    // Get template file path
    // Example inner_path: "index.html"
    pub fn format_template(&self, inner_path: &str) -> String {
        format!("{}{}", self.templates, inner_path)
    }
}
