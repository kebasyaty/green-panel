//! # GENERAL SETTINGS
//!

// Development status
pub static DEBUG: bool = true;
// Project
pub static PROJECT_NAME: &str = "Project Name";
// Http Server
pub static LOCAL_DOMAIN: &str = "127.0.0.1";
pub static PORT: u16 = 8088;
// Site
pub static SITE_DOMAIN: &str = "www.site-name.net";
// Max size of loaded content for Form and Json - 2.016 mb
pub static MAX_UPLOAD_SIZE: usize = (2.016 * 1024.0 * 1024.0) as usize;
// Security
// http://www.miniwebtool.com/django-secret-key-generator/
pub static SECRET_KEY: &str = "hf@$%#-ftw(ia4jualowaqlejtm17h*98pzqk18bd65um5_xnx";
// Session
pub static SESSION_KEY: &[u8] = SECRET_KEY.as_bytes();
// Files
pub static MEDIA_URL: &str = "/media/";
pub static MEDIA_ROOT: &str = "./media/";
pub static STATIC_URL: &str = "/static/";
pub static STATIC_ROOT: &str = "./static/";
pub static TEMPLATES: &str = "./templates/";
