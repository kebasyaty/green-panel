//! General settings.

// Development status
pub static DEBUG: bool = true;
// Project
pub static PROJECT_NAME: &str = "Project Name";
// Http Server
pub static LOCAL_DOMAIN: &str = "127.0.0.1";
pub static PORT: u16 = 8080;
// Site
pub static SITE_DOMAIN: &str = "www.site-name.net";
// Max size of loaded content for Form and Json - 2.016 mb
pub static MAX_UPLOAD_SIZE: usize = (2.016 * 1024.0 * 1024.0) as usize;
// Security
// To generate a key: https://randompasswordgen.com/
// Hint: Minimum 64 characters.
pub static SECRET_KEY: &str = "-H%QdH?ga$pLA39P2%86@KjArWp-G6$jA@Zk%nF2+jgZeKq8Wxf-sQL!_mh2wmKQ";
// Session
pub static SESSION_KEY: &[u8] = SECRET_KEY.as_bytes();
// Files
pub static MEDIA_URL: &str = "/media/";
pub static MEDIA_ROOT: &str = "./media/";
pub static STATIC_URL: &str = "/static/";
pub static STATIC_ROOT: &str = "./static/";
pub static TEMPLATES: &str = "./templates/";

// Company Attributes
pub const LOGO: &str = "img/logo.svg"; // in static
pub const BRAND: &str = "Сompany Name";
pub const SLOGAN: &str = "Brief description of the company.";

// Language code.
// CKEditor supported languages:
// af | ar | ast | az | bg | ca | cs | da | de | de-ch | el | en-au |
// en-gb | eo | es | et | eu | fa | fi | fr | gl | gu | he | hi |
// hr | hu | id | it | ja | km | kn | ko | ku | lt | lv | ms |
// nb | ne | nl | no | oc | pl | pt | pt-br | ro | ru | si | sk |
// sl | sq | sr | sr-latn | sv | th | tk | tr | tt | ug | uk | vi |
// zh | zh-cn
pub const LANGUAGE_CODE: &str = "en";

// reCAPTCHA v3
// Create (for development use local domain - 127.0.0.1) your keys at: https://www.google.com/recaptcha/about/
pub const RE_CAPTCHA_SITE_KEY: &str = "6LcJZnwcAAAAABh6OdOuT5lHmAUdQSMoqlnt11Np"; // Key for demo only.
pub const RE_CAPTCHA_SECRET_KEY: &str = "6LcJZnwcAAAAABHgE0Bo-Qp96R15RPWbHjWXehbP"; // Key for demo only.
