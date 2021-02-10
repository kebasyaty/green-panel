//! # User profile
//!

use mango_orm::*;
use metamorphose::Model;
use serde::{Deserialize, Serialize};

use crate::settings::models::{
    admin::{DATABASE_NAME, DB_CLIENT_NAME, DB_QUERY_DOCS_LIMIT, SERVICE_NAME},
    KEYWORD,
};

#[Model(is_use_add_valid = true, ignore_fields = "confirm_password")]
#[derive(Serialize, Deserialize, Default, Debug)]
pub struct User {
    #[serde(default)]
    #[field_attrs(
        widget = "inputText",
        label = "Username",
        placeholder = "Enter your username",
        unique = true,
        required = true,
        minlength = 3,
        maxlength = 40,
        hint = "Only letters and numbers without spaces"
    )]
    pub username: Option<String>,
    #[serde(default)]
    #[field_attrs(
        widget = "inputEmail",
        label = "Email",
        placeholder = "Please enter your email",
        required = true,
        unique = true,
        maxlength = 74,
        hint = "Your actual email"
    )]
    pub email: Option<String>,
    #[serde(default)]
    #[field_attrs(
        widget = "inputPassword",
        label = "Password",
        placeholder = "Enter your password",
        required = true,
        minlength = 8,
        hint = "a-z A-Z 0-9 @#$%^&+=*!~)("
    )]
    pub password: Option<String>,
    #[serde(default)]
    #[field_attrs(
        widget = "inputPassword",
        label = "Confirm password",
        placeholder = "Repeat your password",
        required = true,
        minlength = 8,
        hint = "a-z A-Z 0-9 @#$%^&+=*!~)("
    )]
    pub confirm_password: Option<String>,
}

impl AdditionalValidation for User {
    fn add_validation<'a>(
        &self,
    ) -> Result<std::collections::HashMap<&'a str, &'a str>, Box<dyn std::error::Error>> {
        // Hint: .insert("field_name", "Error message")
        let mut error_map: std::collections::HashMap<&'a str, &'a str> =
            std::collections::HashMap::new();
        // Get clean data
        let password = self.password.clone().unwrap();
        let confirm_password = self.confirm_password.clone().unwrap();
        // Validation of fields
        if password != confirm_password {
            error_map.insert("confirm_password", "Password confirmation does not match.");
        }
        Ok(error_map)
    }
}
