//! # Registering models for the admin panel.
//!

use serde_json::{json, Value};

// use crate::models::services::admin::users;

// Register models.
pub fn service_list() -> Value {
    json!([
        {
            "service": {"title": "Название сервиса 1", "icon": "laptop"},
            "collections": [
                { "title": "Название коллекции 1.1", "model_key": "1" },
            ]
        },
    ])
}
