//! # Registering models for the admin panel.
//!

use mango_orm::ToModel;
use serde_json::{json, Value};

use crate::models::services::admin::users;

// Register models.
// *************************************************************************************************
// Hint: get icon name - https://materialdesignicons.com/
// Hint: doc_name - {"field": "field_name", "title": "Table header"}
// ( field_name - only text field )
pub fn service_list() -> Value {
    json!([
            // Admin
            {
                "service": { "title": "Users", "icon": "account-multiple" },
                "collections": [
                    // Users
                    { "title": "Users",
                      "model_key": users::User::key(),
                      "doc_name": { "field": "username", "title": "Nickname" } },
                   // Other collection
                ]
            },
            // Other service
        ]
    )
}

// CKEditor configuration.
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
