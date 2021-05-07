//! # Add models to admin panel.
//!

use mango_orm::{CachingModel, QCommon, QPaladins, ToModel};
use mongodb::bson::doc;
use serde_json::{json, Value};

use crate::{models::services::admin::users, models::services::products::electric_cars, settings};

// Add models
// *************************************************************************************************
// Step 1
// -------------------------------------------------------------------------------------------------
// Hint: get icon name (service) - https://materialdesignicons.com/
// Hint: field types (fields): text field, number field
pub fn service_list() -> Value {
    json!([
            // Admin
            // -------------------------------------------------------------------------------------
            {
                "service": { "title": "Users", "icon": "account-multiple" },
                "collections": [
                    // AdminProfile
                    {
                        "title": "Admins",
                        "model_key": users::AdminProfile::key(),
                        "fields": [
                            { "field": "username", "title": "Nickname" },
                            { "field": "photo", "title": "Photo" },
                            { "field": "first_name", "title": "First name" },
                            { "field": "last_name", "title": "Last name" },
                            { "field": "email", "title": "E-mail" },
                            { "field": "phone", "title": "Phone" },
                            { "field": "is_active", "title": "Active" },
                            { "field": "is_staff", "title": "Staff" }
                        ]
                    },
                    // SellerProfile
                    {
                        "title": "Sellers",
                        "model_key": users::SellerProfile::key(),
                        "fields": [
                            { "field": "username", "title": "Nickname" },
                            { "field": "photo", "title": "Photo" },
                            { "field": "first_name", "title": "First name" },
                            { "field": "last_name", "title": "Last name" },
                            { "field": "gender", "title": "Gender" },
                            { "field": "email", "title": "E-mail" },
                            { "field": "phone", "title": "Phone" },
                            { "field": "city", "title": "City" },
                            { "field": "country", "title": "Country" },
                            { "field": "is_active", "title": "Active" }
                        ]
                    },
                    // CustomerProfile
                    {
                        "title": "Customers",
                        "model_key": users::CustomerProfile::key(),
                        "fields": [
                            { "field": "username", "title": "Nickname" },
                            { "field": "photo", "title": "Photo" },
                            { "field": "first_name", "title": "First name" },
                            { "field": "last_name", "title": "Last name" },
                            { "field": "gender", "title": "Gender" },
                            { "field": "email", "title": "E-mail" },
                            { "field": "phone", "title": "Phone" },
                            { "field": "city", "title": "City" },
                            { "field": "country", "title": "Country" },
                            { "field": "is_active", "title": "Active" }
                        ]
                    },
                ]
            },
            // Products
            // -------------------------------------------------------------------------------------
            {
                "service": { "title": "Products", "icon": "cart" },
                "collections": [
                    // ElectricCar
                    {
                        "title": "Electric Cars",
                        "model_key": electric_cars::ElectricCar::key(),
                        "fields": [
                            { "field": "car_name", "title": "Vehicle name" },
                            { "field": "image", "title": "Image" },
                        ]
                    }
                ]
            },
        ]
    )
}

// Step 2
// -------------------------------------------------------------------------------------------------
// Connect models for the `src/services/admin.rs/get_document` method.
pub fn get_document_as_json(
    model_key: String,
    doc_hash: String,
) -> Result<String, Box<dyn std::error::Error>> {
    let mut json = String::new();

    // AdminProfile
    if model_key == users::AdminProfile::key() {
        if !doc_hash.is_empty() {
            let object_id = users::AdminProfile::hash_to_id(doc_hash.as_str())?;
            let filter = doc! {"_id": object_id};
            let output_data = users::AdminProfile::find_one(Some(filter), None).unwrap();
            if output_data.bool() {
                json = output_data
                    .model::<users::AdminProfile>()
                    .unwrap()
                    .json_for_admin()?;
            }
        } else {
            json = users::AdminProfile::form_json_for_admin()?
        }

    // SellerProfile
    } else if model_key == users::SellerProfile::key() {
        if !doc_hash.is_empty() {
            let object_id = users::SellerProfile::hash_to_id(doc_hash.as_str())?;
            let filter = doc! {"_id": object_id};
            let output_data = users::SellerProfile::find_one(Some(filter), None).unwrap();
            if output_data.bool() {
                json = output_data
                    .model::<users::SellerProfile>()
                    .unwrap()
                    .json_for_admin()?;
            }
        } else {
            json = users::SellerProfile::form_json_for_admin()?
        }

    // CustomerProfile
    } else if model_key == users::CustomerProfile::key() {
        if !doc_hash.is_empty() {
            let object_id = users::CustomerProfile::hash_to_id(doc_hash.as_str())?;
            let filter = doc! {"_id": object_id};
            let output_data = users::CustomerProfile::find_one(Some(filter), None).unwrap();
            if output_data.bool() {
                json = output_data
                    .model::<users::CustomerProfile>()
                    .unwrap()
                    .json_for_admin()?;
            }
        } else {
            json = users::CustomerProfile::form_json_for_admin()?
        }

    // ElectricCar
    } else if model_key == electric_cars::ElectricCar::key() {
        if !doc_hash.is_empty() {
            let object_id = electric_cars::ElectricCar::hash_to_id(doc_hash.as_str())?;
            let filter = doc! {"_id": object_id};
            let output_data = electric_cars::ElectricCar::find_one(Some(filter), None).unwrap();
            if output_data.bool() {
                json = output_data
                    .model::<electric_cars::ElectricCar>()
                    .unwrap()
                    .json_for_admin()?;
            }
        } else {
            json = electric_cars::ElectricCar::form_json_for_admin()?
        }

    // Error
    } else {
        Err("Module: `src/models/registration/admin_panel` > \
             Method: `get_document_as_json` : No match for `model_key`.")?
    }
    //
    Ok(json)
}

// Step 3
// -------------------------------------------------------------------------------------------------
// Connect models for the `src/services/admin.rs/save_document` method.
pub fn save_document_and_return_as_json(
    model_key: String,
    bytes: &actix_web::web::BytesMut,
    app_state: actix_web::web::Data<settings::state::AppState>,
) -> Result<String, Box<dyn std::error::Error>> {
    let mut json = String::new();

    // AdminProfile
    if model_key == users::AdminProfile::key() {
        let mut model = serde_json::from_slice::<users::AdminProfile>(&bytes)?;
        model.photo = app_state.base64_to_file(model.photo, "users/admins/photos");
        let output_data = model.save(None, None)?;
        json = output_data.json_for_admin()?;

    // SellerProfile
    } else if model_key == users::SellerProfile::key() {
        let mut model = serde_json::from_slice::<users::SellerProfile>(&bytes)?;
        model.photo = app_state.base64_to_file(model.photo, "users/sellers/photos");
        model.resume = app_state.base64_to_file(model.resume, "users/sellers/resume");
        let output_data = model.save(None, None)?;
        json = output_data.json_for_admin()?;

    // CustomerProfile
    } else if model_key == users::CustomerProfile::key() {
        let mut model = serde_json::from_slice::<users::CustomerProfile>(&bytes)?;
        model.photo = app_state.base64_to_file(model.photo, "users/customers/photos");
        let output_data = model.save(None, None)?;
        json = output_data.json_for_admin()?;

    // ElectricCar
    } else if model_key == electric_cars::ElectricCar::key() {
        let mut model = serde_json::from_slice::<electric_cars::ElectricCar>(&bytes)?;
        model.image = app_state.base64_to_file(model.image, "products/electric_cars/images");
        let output_data = model.save(None, None)?;
        json = output_data.json_for_admin()?;

    // Error
    } else {
        Err("Module: `src/models/registration/admin_panel` > \
             Method: `save_document_and_return_as_json` : No match for `model_key`.")?
    }
    //
    Ok(json)
}

// Step 4
// -------------------------------------------------------------------------------------------------
// Connect models for the `src/services/admin.rs/update_dyn_data` method.
// Hint: Refresh data for dynamic widgets.
pub fn refresh_dyn_data(
    model_key: String,
    json_options: &str,
) -> Result<(), Box<dyn std::error::Error>> {
    // AdminProfile
    if model_key == users::AdminProfile::key() {
        users::AdminProfile::db_update_dyn_widgets(json_options)?;

    // SellerProfile
    } else if model_key == users::SellerProfile::key() {
        users::SellerProfile::db_update_dyn_widgets(json_options)?;

    // CustomerProfile
    } else if model_key == users::CustomerProfile::key() {
        users::CustomerProfile::db_update_dyn_widgets(json_options)?;

    // ElectricCar
    } else if model_key == electric_cars::ElectricCar::key() {
        electric_cars::ElectricCar::db_update_dyn_widgets(json_options)?;

    // Error
    } else {
        Err("Module: `src/models/registration/admin_panel` > \
             Method: `refresh_dyn_data` : No match for `model_key`.")?
    }
    //
    Ok(())
}
