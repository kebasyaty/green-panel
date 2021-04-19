//! # Add models to admin panel.
//!

use mango_orm::{CachingModel, QCommon, QPaladins, ToModel};
use mongodb::bson::doc;
use serde_json::{json, Value};

use crate::{models::services::admin::users, settings};

// Add models
// *************************************************************************************************
// Step 1
// -------------------------------------------------------------------------------------------------
// Hint: get icon name - https://materialdesignicons.com/
// Hint: doc_name - {"field": "field_name", "title": "Table header name"}
// ( field_name - only text field )
pub fn service_list() -> Value {
    json!([
            // Admin
            {
                "service": { "title": "Users", "icon": "account-multiple" },
                "collections": [
                    // AdminProfile
                    { "title": "Admins",
                      "model_key": users::AdminProfile::key(),
                      "doc_name": { "field": "username", "title": "Nickname" } },
                    // SellerProfile
                    { "title": "Sellers",
                      "model_key": users::SellerProfile::key(),
                      "doc_name": { "field": "username", "title": "Nickname" } },
                    // CustomerProfile
                    { "title": "Customers",
                      "model_key": users::CustomerProfile::key(),
                      "doc_name": { "field": "username", "title": "Nickname" } },
                ]
            },
            // Other service
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
        model.photo = app_state.to_file(model.photo, "admin/admins/photos");
        let output_data = model.save(None, None)?;
        json = output_data.json_for_admin()?;

    // SellerProfile
    } else if model_key == users::SellerProfile::key() {
        let mut model = serde_json::from_slice::<users::SellerProfile>(&bytes)?;
        model.photo = app_state.to_file(model.photo, "admin/sellers/photos");
        model.resume = app_state.to_file(model.resume, "admin/sellers/resume");
        let output_data = model.save(None, None)?;
        json = output_data.json_for_admin()?;

    // CustomerProfile
    } else if model_key == users::CustomerProfile::key() {
        let mut model = serde_json::from_slice::<users::CustomerProfile>(&bytes)?;
        model.photo = app_state.to_file(model.photo, "admin/sellers/photos");
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

    // Error
    } else {
        Err("Module: `src/models/registration/admin_panel` > \
             Method: `refresh_dyn_data` : No match for `model_key`.")?
    }
    //
    Ok(())
}

// CKEditor 5 configuration.
// *************************************************************************************************
pub fn config_ckeditor(config_name: &str) -> Value {
    let color_palette = custom_color_palette();
    match config_name {
        // By default.
        "default" => {
            json!({
                "toolbar": {
                    "items": [
                        "heading", "|",
                        "textPartLanguage", "|",
                        "alignment", "|",
                        "bold", "italic", "underline", "strikethrough", "|",
                        "subscript", "superscript", "|",
                        "fontColor", "fontBackgroundColor", "fontFamily", "fontsize", "|",
                        "bulletedList", "numberedList", "todoList", "|",
                        "outdent", "indent", "|",
                        "blockQuote", "highlight", "|",
                        "pageBreak", "removeFormat", "selectAll", "|",
                        "link", "specialCharacters", "insertTable", "mediaEmbed",
                        "horizontalLine", "code", "codeBlock", "|",
                        "undo",
                        "redo"
                    ],
                    "shouldNotGroupWhenFull": true
                },
                "table": {
                    "contentToolbar": [
                        "tableColumn", "tableRow", "mergeTableCells",
                        "tableProperties", "tableCellProperties"
                    ],
                    "tableProperties": {
                        "borderColors": color_palette,
                        "backgroundColors": color_palette
                    },
                    "tableCellProperties": {
                        "borderColors": color_palette,
                        "backgroundColors": color_palette
                    }
                },
                "fontColor": {
                    "colors": color_palette
                },
                "fontBackgroundColor": {
                    "colors": color_palette
                }
            })
        }
        // Error
        _ => panic!(
            "CKEditor - Configuration name `{}` does not match.",
            config_name
        ),
    }
}
// Configuration custom color palette.
// https://vuetifyjs.com/en/styles/colors/#material-colors
fn custom_color_palette() -> Value {
    json!([
        {
            "color": "#F44336",
            "label": "Red"
        },
        {
            "color": "#E91E63",
            "label": "Pink"
        },
        {
            "color": "#9C27B0",
            "label": "Purple"
        },
        {
            "color": "#673AB7",
            "label": "Deep Purple"
        },
        {
            "color": "#3F51B5",
            "label": "Indigo"
        },
        {
            "color": "#2196F3",
            "label": "Blue"
        },
        {
            "color": "#03A9F4",
            "label": "Light Blue"
        },
        {
            "color": "#00BCD4",
            "label": "Cyan"
        },
        {
            "color": "#009688",
            "label": "Teal"
        },
        {
            "color": "#4CAF50",
            "label": "Green"
        },
        {
            "color": "#8BC34A",
            "label": "Light Green"
        },
        {
            "color": "#CDDC39",
            "label": "Lime"
        },
        {
            "color": "#FFEB3B",
            "label": "Yellow"
        },
        {
            "color": "#FFC107",
            "label": "Amber"
        },
        {
            "color": "#FF9800",
            "label": "Orange"
        },
        {
            "color": "#FF5722",
            "label": "Deep Orange"
        },
        {
            "color": "#795548",
            "label": "Brown"
        },
        {
            "color": "#607D8B",
            "label": "Blue Grey"
        },
        {
            "color": "#000000",
            "label": "Black"
        },
        {
            "color": "#424242",
            "label": "Dim Grey"
        },
        {
            "color": "#9E9E9E",
            "label": "Grey"
        },
        {
            "color": "#E0E0E0",
            "label": "Light Grey"
        },
        {
            "color": "#FFFFFF",
            "label": "White"
        }
    ])
}
