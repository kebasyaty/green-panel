//! # Registering models for migration.
//!

use crate::models::{services::admin::users, settings};
use mango_orm::{CachingModel, Monitor, ToModel, DB_MAP_CLIENT_NAMES};

// Migration Service `Mango`.
// *************************************************************************************************
pub fn mango_migration() -> Result<(), Box<dyn std::error::Error>> {
    // Caching MongoDB clients.
    {
        let mut client_store = DB_MAP_CLIENT_NAMES.write()?;
        client_store.insert(
            "default".to_string(),
            mongodb::sync::Client::with_uri_str("mongodb://localhost:27017")?,
        );
    }
    // Monitor initialization.
    let monitor = Monitor {
        project_name: settings::PROJECT_NAME,
        unique_project_key: settings::UNIQUE_PROJECT_KEY,
        // Register models.
        // -----------------------------------------------------------------------------------------
        models: vec![users::User::meta()?],
    };
    monitor.migrat();

    // Add metadata and widgects map to cache.
    // ---------------------------------------------------------------------------------------------
    users::User::to_cache()?;
    //
    Ok(())
}
