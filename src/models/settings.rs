//! # Mango-ORM model settings
//!
//! `default` - Default settings.
//!

// General settings for the project.
// *************************************************************************************************
// Project name.
// Hint: PROJECT_NAM it is recommended not to change.
// Valid characters: _ a-z A-Z 0-9
// Max size: 21
// First character: a-z A-Z
pub const PROJECT_NAME: &str = "store";

// Unique project key.
// Hint: UNIQUE_PROJECT_KEY it is recommended not to change.
// Valid characters: a-z A-Z 0-9
// Size: 8-16
// Example: "7rzgacfqQB3B7q7T"
pub const UNIQUE_PROJECT_KEY: &str = "Gm5EKQZRAWvV6BW";

// Default settings.
// *************************************************************************************************
pub mod admin {
    // Valid characters: _ a-z A-Z 0-9
    // Max size: 31
    // First character: a-z A-Z
    pub const SERVICE_NAME: &str = "admin";
    // Valid characters: _ a-z A-Z 0-9
    // Max size: 21
    // First character: a-z A-Z
    pub const DATABASE_NAME: &str = "users";
    pub const DB_CLIENT_NAME: &str = "default";
    pub const DB_QUERY_DOCS_LIMIT: u32 = 1000;
}

// Electric Cars
// *************************************************************************************************
pub mod electric_cars {
    // Valid characters: _ a-z A-Z 0-9
    // Max size: 31
    // First character: a-z A-Z
    pub const SERVICE_NAME: &str = "electric_cars";
    // Valid characters: _ a-z A-Z 0-9
    // Max size: 21
    // First character: a-z A-Z
    pub const DATABASE_NAME: &str = "cars";
    pub const DB_CLIENT_NAME: &str = "default";
    pub const DB_QUERY_DOCS_LIMIT: u32 = 1000;
}
