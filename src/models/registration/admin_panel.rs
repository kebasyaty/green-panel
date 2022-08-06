//! Registering models for the admin panel.

use mango_orm::{Administrator, Main, OutputDataAdmin};
use mongodb::bson::document::Document;
use serde_json::{json, Value};
use std::error::Error;

use crate::{
    models::services::{
        accounts::{customers, sellers, users},
        products::cars,
    },
    settings,
};

// ADD MODELS
// #################################################################################################
// Step 1
// *************************************************************************************************
// Specify what data should be displayed in the list of documents in the admin panel.
//
// Hint: Get icon name (for service) - https://materialdesignicons.com/
//
/*
Fields with the following types of widgets are supported:
1.text
inputEmail, radioText, inputPhone, inputTex, inputUrl,
inputIP, inputIPv4, inputIPv6, selectText, selectTextDyn, hiddenText
2.color
inputColor
3.i32
numberI32, radioI32, rangeI32, selectI32, selectI32Dyn, hiddenI32
4.u32
numberU32, radioU32, rangeU32, selectU32, selectU32Dyn, hiddenU32
5.i64
numberI64, radioI64, rangeI64, selectI64, selectI64Dyn, hiddenI64
6.f64
numberF64, radioF64, rangeF64, selectF64, selectF64Dyn, hiddenF64
7.file
inputImage
8.boolean
checkBox
9.multiple select
selectTextMult, selectTextMultDyn, selectI32Mult, selectI32MultDyn,
selectU32Mult, selectU32MultDyn, selectI64Mult, selectI64MultDyn,
selectF64Mult, selectF64MultDyn
*/
pub fn get_service_list_for_admin() -> Result<Value, Box<dyn Error>> {
    Ok(json!([
        // Accounts
        // -----------------------------------------------------------------------------------------
        {
            "service": { "title": "Accounts", "icon": "account-multiple" },
            "collections": [
                // Users
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
        // -----------------------------------------------------------------------------------------
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
        // -----------------------------------------------------------------------------------------
        {
            "service": { "title": "Products", "icon": "cart" },
            "collections": [
                // Cars
                {
                    "title": "Cars",
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
// *************************************************************************************************
// Connect registered model.
pub fn get_result_for_admin(
    model_key: &str,
    doc_hash: Option<&str>,
    bytes: Option<&actix_web::web::BytesMut>,
    app_state: Option<actix_web::web::Data<settings::state::AppState>>,
    filter: Option<&Document>,
    dyn_data: Option<Value>,
) -> Result<String, Box<dyn Error>> {
    // User
    // ---------------------------------------------------------------------------------------------
    if model_key == users::User::key()? {
        match users::User::actix_instance_for_admin(doc_hash, bytes, filter, dyn_data)? {
            OutputDataAdmin::EarlyResult(data) => return Ok(data),
            OutputDataAdmin::Instance(data) => {
                if let Some(mut instance) = data {
                    if let Some(app_state) = app_state {
                        // Optional handling of inputFile and inputImage fields.
                        instance.photo = app_state.base64_to_file(instance.photo, "users/avatars");
                    }
                    return instance.actix_result_for_admin(doc_hash, bytes, filter);
                }
            }
        }
    // Seller Profile
    // ---------------------------------------------------------------------------------------------
    } else if model_key == sellers::SellerProfile::key()? {
        match sellers::SellerProfile::actix_instance_for_admin(doc_hash, bytes, filter, dyn_data)? {
            OutputDataAdmin::EarlyResult(data) => return Ok(data),
            OutputDataAdmin::Instance(data) => {
                if let Some(mut instance) = data {
                    if let Some(app_state) = app_state {
                        // Optional handling of inputFile and inputImage fields.
                        instance.resume =
                            app_state.base64_to_file(instance.resume, "users/sellers/resume");
                    }
                    return instance.actix_result_for_admin(doc_hash, bytes, filter);
                }
            }
        }
    // Customer Profile
    // ---------------------------------------------------------------------------------------------
    } else if model_key == customers::CustomerProfile::key()? {
        match customers::CustomerProfile::actix_instance_for_admin(
            doc_hash, bytes, filter, dyn_data,
        )? {
            OutputDataAdmin::EarlyResult(data) => return Ok(data),
            OutputDataAdmin::Instance(data) => {
                if let Some(mut instance) = data {
                    if let Some(_app_state) = app_state {
                        // Optional handling of inputFile and inputImage fields.
                    }
                    return instance.actix_result_for_admin(doc_hash, bytes, filter);
                }
            }
        }

    // Car
    // ---------------------------------------------------------------------------------------------
    } else if model_key == cars::Car::key()? {
        match cars::Car::actix_instance_for_admin(doc_hash, bytes, filter, dyn_data)? {
            OutputDataAdmin::EarlyResult(data) => return Ok(data),
            OutputDataAdmin::Instance(data) => {
                if let Some(mut instance) = data {
                    if let Some(app_state) = app_state {
                        // Optional handling of inputFile and inputImage fields.
                        instance.image =
                            app_state.base64_to_file(instance.image, "products/cars/posters");
                    }
                    return instance.actix_result_for_admin(doc_hash, bytes, filter);
                }
            }
        }
    // Error
    // ---------------------------------------------------------------------------------------------
    } else {
        Err("Module: `src/models/registration/admin_panel` > \
             Method: `get_result_for_admin` : No match for `model_key`.")?
    }
    //
    Err("Document missing")?
}
