//! Settings for mango-orm models.

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
// To generate a key: https://passwordsgenerator.net/
pub const UNIQUE_PROJECT_KEY: &str = "qn9JGrB3bCRMQnF";

// Accounts
// *************************************************************************************************
// Users
pub mod users {
    // Valid characters: _ a-z A-Z 0-9
    // Max size: 31
    // First character: a-z A-Z
    pub const SERVICE_NAME: &str = "accounts";
    // Valid characters: _ a-z A-Z 0-9
    // Max size: 21
    // First character: a-z A-Z
    pub const DATABASE_NAME: &str = "accounts";
    pub const DB_CLIENT_NAME: &str = "default";
    pub const DB_QUERY_DOCS_LIMIT: u32 = 1000;
}

// User Profiles
pub mod user_profiles {
    // Valid characters: _ a-z A-Z 0-9
    // Max size: 31
    // First character: a-z A-Z
    pub const SERVICE_NAME: &str = "accounts";
    // Valid characters: _ a-z A-Z 0-9
    // Max size: 21
    // First character: a-z A-Z
    pub const DATABASE_NAME: &str = "accounts";
    pub const DB_CLIENT_NAME: &str = "default";
    pub const DB_QUERY_DOCS_LIMIT: u32 = 1000;
}

// Products
// *************************************************************************************************
// Cars
pub mod cars {
    // Valid characters: _ a-z A-Z 0-9
    // Max size: 31
    // First character: a-z A-Z
    pub const SERVICE_NAME: &str = "products";
    // Valid characters: _ a-z A-Z 0-9
    // Max size: 21
    // First character: a-z A-Z
    pub const DATABASE_NAME: &str = "products";
    pub const DB_CLIENT_NAME: &str = "default";
    pub const DB_QUERY_DOCS_LIMIT: u32 = 1000;
}
