//! Registering models for migration.

use mango_orm::{Caching, Main, Monitor, MONGODB_CLIENT_STORE};

use crate::models::{
    services::accounts::{customers, sellers, users},
    services::products::cars,
    settings,
};

/// Migration Service `Mango`.
// *************************************************************************************************
pub fn mango_migration() -> Result<(), Box<dyn std::error::Error>> {
    // Caching MongoDB clients.
    {
        let mut client_store = MONGODB_CLIENT_STORE.write()?;
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
        models: vec![
            users::User::meta()?,
            sellers::SellerProfile::meta()?,
            customers::CustomerProfile::meta()?,
            cars::Car::meta()?,
        ],
    };
    monitor.migrat()?;

    // Add metadata and widgects map to cache.
    // ---------------------------------------------------------------------------------------------
    users::User::to_cache()?;
    sellers::SellerProfile::to_cache()?;
    customers::CustomerProfile::to_cache()?;
    cars::Car::to_cache()?;
    //
    Ok(())
}
