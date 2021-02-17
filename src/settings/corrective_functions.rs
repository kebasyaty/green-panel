//! # Corrective functions
//!

use crate::settings::general::{LOCAL_DOMAIN, PORT, SITE_DOMAIN};

pub fn local_domain() -> String {
    format!("{}:{}", LOCAL_DOMAIN, PORT)
}

pub fn local_url() -> String {
    format!("http://{}:{}", LOCAL_DOMAIN, PORT)
}

pub fn site_domain(debug: bool) -> String {
    match debug {
        true => LOCAL_DOMAIN.to_string(),
        false => SITE_DOMAIN.to_string(),
    }
}

pub fn site_url(debug: bool) -> String {
    match debug {
        true => local_url(),
        false => format!("https://{}", SITE_DOMAIN),
    }
}

pub fn session_name(project_name: &str) -> String {
    format!("{}_session", project_name.to_lowercase().replace(" ", "_"))
}
