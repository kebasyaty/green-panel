//! # Registering models for the admin panel.
//!

use mango_orm::ToModel;
use serde_json::{json, Value};

use crate::models::services::admin::users;

// Register models.
// *************************************************************************************************
// Hint: get icon names - https://materialdesignicons.com/
// Hint: doc_name - {"field": "field_name, "title": "Table header"}
pub fn service_list() -> Value {
    json!({ "service_list": [
            {
                "service": { "title": "Users", "icon": "account-multiple" },
                "collections": [
                    { "title": "User",
                      "model_key": users::User::key(),
                      "doc_name": { "field": "username", "title": "Nickname" } },
                ]
            },
        ]
    })
}
