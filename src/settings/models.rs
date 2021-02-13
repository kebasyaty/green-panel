//! # Mango-ORM model settings
//!
//! `admin` - Service/Sub-Application for user profile management.
//!

/*
Unique project key: yQN_1sxRawj2v3Ea
*/

// KEYWORD it is recommended not to change.
// Valid characters: _ a-z A-Z 0-9
// Size: 6-52
// Example: "PROJECT_NAME_7rzg_cfqQB3B7q7T"
pub const KEYWORD: &str = "ADMIN_yQN_1sxRawj2v3Ea";

// Service/Sub-Application for user profile management.
pub mod admin {
    pub const SERVICE_NAME: &str = "admin";
    pub const DATABASE_NAME: &str = "user_yQN_1sxRawj2v3Ea";
    pub const DB_CLIENT_NAME: &str = "default";
    pub const DB_QUERY_DOCS_LIMIT: u32 = 1000;
}
