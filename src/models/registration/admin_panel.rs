//! Add models to admin panel.

use crate::{
    models::services::accounts::{customers, sellers, users},
    models::services::products::cars,
    settings,
};

use mango_orm::{CachingModel, QCommons, QPaladins, ToModel};
use mongodb::bson::{doc, document::Document};
use serde_json::{json, Value};
use std::error::Error;

// Add models
// *************************************************************************************************
// Step 1
// -------------------------------------------------------------------------------------------------
// Hint: get icon name (service) - https://materialdesignicons.com/
/*
Fields with the following types of widgets are supported:
1.text
inputEmail, radioText, inputPhone, inputTex, inputUrl,
inputIP, inputIPv4, inputIPv6, selectText, selectTextDyn, hiddenText
2.i32
numberI32, radioI32, rangeI32, selectI32, selectI32Dyn, hiddenI32
3.u32
numberU32, radioU32, rangeU32, selectU32, selectU32Dyn, hiddenU32
4.i64
numberI64, radioI64, rangeI64, selectI64, selectI64Dyn, hiddenI64
5.f64
numberF64, radioF64, rangeF64, selectF64, selectF64Dyn, hiddenF64
6.color
inputColor
7.file
inputImage
8.boolean
checkBox
9.multiple select
selectTextMult, selectTextMultDyn, selectI32Mult, selectI32MultDyn,
selectU32Mult, selectU32MultDyn, selectI64Mult, selectI64MultDyn,
selectF64Mult, selectF64MultDyn
*/
pub fn service_list() -> Result<Value, Box<dyn Error>> {
    Ok(json!([
        // Users
        // -------------------------------------------------------------------------------------
        {
            "service": { "title": "Users", "icon": "account-multiple" },
            "collections": [
                // User
                {
                    "title": "Users",
                    "model_key": users::User::key()?,
                    "fields": [
                        { "field": "username", "title": "Nickname" },
                        { "field": "photo", "title": "Photo" },
                        { "field": "first_name", "title": "First name" },
                        { "field": "last_name", "title": "Last name" },
                        { "field": "email", "title": "E-mail" },
                        { "field": "phone", "title": "Phone" },
                        { "field": "is_admin", "title": "Admin" },
                        { "field": "is_staff", "title": "Staff" },
                        { "field": "is_active", "title": "Active" },
                    ]
                },
            ]
        },
        // User Profiles
        // -------------------------------------------------------------------------------------
        {
            "service": { "title": "User Profiles", "icon": "briefcase-account" },
            "collections": [
                // Sellers
                {
                    "title": "Sellers",
                    "model_key": sellers::SellerProfile::key()?,
                    "fields": [
                        { "field": "user_id", "title": "User ID" },
                        { "field": "gender", "title": "Gender" },
                        { "field": "city", "title": "City" },
                        { "field": "country", "title": "Country" },
                    ]
                },
                // Customers
                {
                    "title": "Customers",
                    "model_key": customers::CustomerProfile::key()?,
                    "fields": [
                        { "field": "user_id", "title": "User ID" },
                        { "field": "gender", "title": "Gender" },
                        { "field": "city", "title": "City" },
                        { "field": "country", "title": "Country" },
                    ]
                },
            ]
        },
        // Products
        // -------------------------------------------------------------------------------------
        {
            "service": { "title": "Products", "icon": "cart" },
            "collections": [
                // Electric Cars
                {
                    "title": "Electric Cars",
                    "model_key": cars::Car::key()?,
                    "fields": [
                        { "field": "model", "title": "Model" },
                        { "field": "image", "title": "Image" },
                        { "field": "year", "title": "Year" },
                        { "field": "style", "title": "Style" },
                        { "field": "price", "title": "Price" },
                        { "field": "engine", "title": "Engine" },
                        { "field": "trans", "title": "Transmission" },
                        { "field": "drive", "title": "Drive" },
                        { "field": "colors", "title": "Colors" },
                        { "field": "seats", "title": "Seats" }
                    ]
                }
            ]
        },
    ]))
}

// Step 2
// -------------------------------------------------------------------------------------------------
// Connect models for the `src/services/admin.rs/get_document` method.
pub fn get_document_reg(model_key: &str, doc_hash: &str) -> Result<String, Box<dyn Error>> {
    let mut json = String::new();

    // User
    if model_key == users::User::key()? {
        if !doc_hash.is_empty() {
            let object_id = users::User::hash_to_id(doc_hash)?;
            let filter = doc! {"_id": object_id};
            let user = users::User::find_one_to_model_instance::<users::User>(filter, None)?;
            if user.is_some() {
                let user = user.unwrap();
                json = user.json_for_admin()?;
            }
        } else {
            json = users::User::to_json_for_admin()?
        }

    // Seller Profile
    } else if model_key == sellers::SellerProfile::key()? {
        if !doc_hash.is_empty() {
            let object_id = sellers::SellerProfile::hash_to_id(doc_hash)?;
            let filter = doc! {"_id": object_id};
            let seller = sellers::SellerProfile::find_one_to_model_instance::<
                sellers::SellerProfile,
            >(filter, None)?;
            if seller.is_some() {
                let seller = seller.unwrap();
                json = seller.json_for_admin()?;
            }
        } else {
            json = sellers::SellerProfile::to_json_for_admin()?
        }

    // Customer Profile
    } else if model_key == customers::CustomerProfile::key()? {
        if !doc_hash.is_empty() {
            let object_id = customers::CustomerProfile::hash_to_id(doc_hash)?;
            let filter = doc! {"_id": object_id};
            let customer = customers::CustomerProfile::find_one_to_model_instance::<
                customers::CustomerProfile,
            >(filter, None)?;
            if customer.is_some() {
                let customer = customer.unwrap();
                json = customer.json_for_admin()?;
            }
        } else {
            json = customers::CustomerProfile::to_json_for_admin()?
        }

    // Electric Car
    } else if model_key == cars::Car::key()? {
        if !doc_hash.is_empty() {
            let object_id = cars::Car::hash_to_id(doc_hash)?;
            let filter = doc! {"_id": object_id};
            let car = cars::Car::find_one_to_model_instance::<cars::Car>(filter, None)?;
            if car.is_some() {
                let car = car.unwrap();
                json = car.json_for_admin()?;
            }
        } else {
            json = cars::Car::to_json_for_admin()?
        }

    // Error
    } else {
        Err("Module: `src/models/registration/admin_panel` > \
             Method: `get_document_reg` : No match for `model_key`.")?
    }
    //
    Ok(json)
}

// Step 3
// -------------------------------------------------------------------------------------------------
// Connect models for the `src/services/admin.rs/save_document` method.
pub fn save_document_reg(
    model_key: &str,
    bytes: &actix_web::web::BytesMut,
    app_state: actix_web::web::Data<settings::state::AppState>,
) -> Result<String, Box<dyn Error>> {
    // User
    if model_key == users::User::key()? {
        let mut model = serde_json::from_slice::<users::User>(&bytes)?;
        model.photo = app_state.base64_to_file(model.photo, "users/accounts/avatars");
        let output_data = model.save(None, None)?;
        output_data.to_json_for_admin()

    // Seller Profile
    } else if model_key == sellers::SellerProfile::key()? {
        let mut model = serde_json::from_slice::<sellers::SellerProfile>(&bytes)?;
        model.resume = app_state.base64_to_file(model.resume, "users/sellers/resume");
        let output_data = model.save(None, None)?;
        output_data.to_json_for_admin()

    // Customer Profile
    } else if model_key == customers::CustomerProfile::key()? {
        let mut model = serde_json::from_slice::<customers::CustomerProfile>(&bytes)?;
        let output_data = model.save(None, None)?;
        output_data.to_json_for_admin()

    // ElectricC ar
    } else if model_key == cars::Car::key()? {
        let mut model = serde_json::from_slice::<cars::Car>(&bytes)?;
        model.image = app_state.base64_to_file(model.image, "products/electric_cars/posters");
        let output_data = model.save(None, None)?;
        output_data.to_json_for_admin()

    // Error
    } else {
        Err("Module: `src/models/registration/admin_panel` > \
             Method: `save_document_reg` : No match for `model_key`.")?
    }
}

// Step 4
// -------------------------------------------------------------------------------------------------
// Connect models for the `src/services/admin.rs/delete_document | delete_many_doc` method.
pub fn delete_document_reg(model_key: &str, filter: Document) -> Result<String, Box<dyn Error>> {
    // User
    if model_key == users::User::key()? {
        let user = users::User::find_one_to_model_instance::<users::User>(filter, None)?;
        if user.is_some() {
            let user = user.unwrap();
            let output_data = user.delete(None)?;
            if !output_data.is_valid() {
                return Ok(output_data.err_msg());
            }
        }

    // Seller Profile
    } else if model_key == sellers::SellerProfile::key()? {
        let seller = sellers::SellerProfile::find_one_to_model_instance::<sellers::SellerProfile>(
            filter, None,
        )?;
        if seller.is_some() {
            let seller = seller.unwrap();
            let output_data = seller.delete(None)?;
            if !output_data.is_valid() {
                return Ok(output_data.err_msg());
            }
        }

    // Customer Profile
    } else if model_key == customers::CustomerProfile::key()? {
        let customer = customers::CustomerProfile::find_one_to_model_instance::<
            customers::CustomerProfile,
        >(filter, None)?;
        if customer.is_some() {
            let customer = customer.unwrap();
            let output_data = customer.delete(None)?;
            if !output_data.is_valid() {
                return Ok(output_data.err_msg());
            }
        }

    // Electric Car
    } else if model_key == cars::Car::key()? {
        let car = cars::Car::find_one_to_model_instance::<cars::Car>(filter, None)?;
        if car.is_some() {
            let car = car.unwrap();
            let output_data = car.delete(None)?;
            if !output_data.is_valid() {
                return Ok(output_data.err_msg());
            }
        }

    // Error
    } else {
        Err("Module: `src/models/registration/admin_panel` > \
             Method: `delete_document_reg | delete_many_doc` : No match for `model_key`.")?
    }
    //
    Ok(String::new())
}

// Step 5
// -------------------------------------------------------------------------------------------------
// Connect models for the `src/services/admin.rs/update_dyn_data` method.
// Hint: Refresh data for dynamic widgets.
pub fn update_dyn_data_reg(model_key: &str, json_options: &str) -> Result<(), Box<dyn Error>> {
    // User
    if model_key == users::User::key()? {
        users::User::db_update_dyn_widgets(json_options)?;

    // Seller Profile
    } else if model_key == sellers::SellerProfile::key()? {
        sellers::SellerProfile::db_update_dyn_widgets(json_options)?;

    // Customer Profile
    } else if model_key == customers::CustomerProfile::key()? {
        customers::CustomerProfile::db_update_dyn_widgets(json_options)?;

    // Electric Car
    } else if model_key == cars::Car::key()? {
        cars::Car::db_update_dyn_widgets(json_options)?;

    // Error
    } else {
        Err("Module: `src/models/registration/admin_panel` > \
             Method: `update_dyn_data_reg` : No match for `model_key`.")?
    }
    //
    Ok(())
}
