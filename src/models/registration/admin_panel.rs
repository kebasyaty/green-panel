//! # Registering models for the admin panel.
//!

use mango_orm::ToModel;
use serde_json::{json, Value};

use crate::models::services::admin::users;

// Register models.
// Hint: get icon names - https://materialdesignicons.com/
pub fn collection_list() -> Value {
    json!({ "collection_list": [
            {
                "service": {"title": "Users", "icon": "account-multiple"},
                "collections": [
                    { "title": "User", "model_key": users::User::key() },
                ]
            },
        ]
    })
}
