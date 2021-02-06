//! # APPLICATION SETTINGS
//!

pub use application_state::*;
pub use corrective_functions::*;
pub use default_settings::*;

pub mod application_state;
pub mod corrective_functions;
pub mod default_settings;

// TESTS
// #################################################################################################
#[cfg(test)]
mod tests {
    use super::*;

    // Corrective functions
    // *********************************************************************************************
    #[test]
    fn test_local_domain() {
        assert_eq!(local_domain(), "127.0.0.1:8088");
    }

    #[test]
    fn test_local_url() {
        assert_eq!(local_url(), "http://127.0.0.1:8088");
    }

    #[test]
    fn test_site_domain() {
        // DEBUG = true
        assert_eq!(site_domain(true), "127.0.0.1:8088");
        assert_ne!(site_domain(true), "www.site-name.net");
        // DEBUG = false
        assert_eq!(site_domain(false), "www.site-name.net");
        assert_ne!(site_domain(false), "127.0.0.1:8088");
    }

    #[test]
    fn test_site_url() {
        // DEBUG = true
        assert_eq!(site_url(true), "http://127.0.0.1:8088");
        assert_ne!(site_url(true), "https://www.site-name.net");
        // DEBUG = false
        assert_eq!(site_url(false), "https://www.site-name.net");
        assert_ne!(site_url(false), "http://127.0.0.1:8088");
    }

    #[test]
    fn test_session_name() {
        assert_eq!(session_name("Project Name"), "project_name_session");
        assert_eq!(session_name("Project Name Two"), "project_name_two_session");
        assert_eq!(session_name(PROJECT_NAME), "project_name_session");
    }

    // App state
    // *********************************************************************************************
    #[test]
    fn test_app_state() {
        let app_state = AppState::new();
        // Testing of methods
        assert_eq!(app_state.get_debug(), DEBUG);
        assert_eq!(app_state.get_app_name(), "Project Name");
        assert_eq!(app_state.get_media_url("img.jpg"), "/media/img.jpg");
        assert_eq!(app_state.get_media_root("img.jpg"), "./media/img.jpg");
        assert_eq!(
            app_state.get_static_url("css/style.css"),
            "/static/css/style.css"
        );
        assert_eq!(
            app_state.get_static_root("css/style.css"),
            "./static/css/style.css"
        );
        assert_eq!(
            app_state.get_template("index.html"),
            "./templates/index.html"
        );
    }
}
