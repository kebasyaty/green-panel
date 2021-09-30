//! # Registering models for migration.
//!

use crate::models::{
    services::admin::{admins, customers, sellers},
    services::products::electric_cars,
    settings,
};
use mango_orm::{CachingModel, Monitor, ToModel, MONGODB_CLIENT_STORE};

// Migration Service `Mango`.
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
            admins::AdminProfile::meta()?,
            sellers::SellerProfile::meta()?,
            customers::CustomerProfile::meta()?,
            electric_cars::ElectricCar::meta()?,
        ],
    };
    monitor.migrat()?;

    // Add metadata and widgects map to cache.
    // ---------------------------------------------------------------------------------------------
    admins::AdminProfile::to_cache()?;
    sellers::SellerProfile::to_cache()?;
    customers::CustomerProfile::to_cache()?;
    electric_cars::ElectricCar::to_cache()?;
    //
    Ok(())
}
