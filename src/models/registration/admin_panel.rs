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

// CKEditor configuration
// *************************************************************************************************
pub fn config_ckeditor(config_name: &str) -> Value {
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
                        "-",
                        "outdent", "indent", "|",
                        "blockQuote", "highlight", "|",
                        "pageBreak", "removeFormat", "selectAll", "|",
                        "link", "specialCharacters", "uploadImage", "insertTable",
                        "mediaEmbed", "horizontalLine", "code", "codeBlock", "|",
                        "undo",
                        "redo"
                    ],
                    "table": {
                        "contentToolbar": [
                            "tableColumn", "tableRow", "mergeTableCells",
                            "tableProperties", "tableCellProperties"
                        ]
                    },
                    "shouldNotGroupWhenFull": true
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
