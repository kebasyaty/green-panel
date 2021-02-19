//! # Registering models for the admin panel.
//!

use mango_orm::ToModel;
use serde_json::{json, Value};

use crate::models::services::admin::users;

// Register models.
pub fn service_list() -> Value {
    json!([
        {
            "service": {"title": "Users", "icon": "laptop"},
            "collections": [
                { "title": "User", "model_key": users::User::key() },
            ]
        },
    ])
}
