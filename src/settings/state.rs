//! Application state.

use base64;
use serde_json::{json, Value};
use std::io::Write;
use std::path::Path;
use std::{fs, fs::File};
use uuid::Uuid;

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

    // Preparing data (json-line) for file field
    // Example:
    // from "{"name":"name.jpg","base64":"...","is_delete":false}"
    // to "{"path":"./path/.name.jpg","url":"/path/name.jpg","is_delete":false}"
    pub fn base64_to_file(&self, json_line: Option<String>, target_dir: &str) -> Option<String> {
        if let Some(json_line) = json_line {
            // Extract data from json string.
            let data =
                serde_json::from_str::<serde_json::map::Map<String, Value>>(json_line.as_str())
                    .unwrap();
            let file_name = data.get("name").unwrap().as_str().unwrap();
            let base64 = data.get("base64").unwrap().as_str().unwrap();
            let is_delete = data.get("is_delete").unwrap().as_bool().unwrap();
            // Create file from base64 and save it.
            if !file_name.is_empty() && !base64.is_empty() {
                let extension = Path::new(file_name).extension().unwrap().to_str().unwrap();
                let file_name = format!("{}.{}", Uuid::new_v4(), extension);
                let total_dir = &self.get_media_root()[..];
                fs::create_dir_all(format!("{}/{}", total_dir, target_dir)).unwrap();
                let file_path = Path::new(total_dir)
                    .join(target_dir)
                    .join(file_name.as_str());
                let mut file = File::create(file_path.as_path()).unwrap();
                let base64 = base64::decode(base64).unwrap();
                file.write_all(&base64[..]).unwrap();
                //
                return Some(
                    serde_json::to_string(&json!({
                        "path": file_path.to_str().unwrap(),
                        "url": self.format_media_url(&format!("{}/{}", target_dir, file_name)[..]),
                        "is_delete": is_delete
                    }))
                    .unwrap(),
                );
            } else {
                return Some(
                    serde_json::to_string(&json!({
                        "path": "",
                        "url": "",
                        "is_delete": is_delete
                    }))
                    .unwrap(),
                );
            }
        }
        //
        None
    }
}
