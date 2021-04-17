//! # User profile
//!

use mango_orm::*;
use metamorphose::Model;
use regex::RegexBuilder;
use serde::{Deserialize, Serialize};

use crate::models::settings::{
    admin::{DATABASE_NAME, DB_CLIENT_NAME, DB_QUERY_DOCS_LIMIT, SERVICE_NAME},
    PROJECT_NAME, UNIQUE_PROJECT_KEY,
};

#[Model(
    is_del_docs = false,
    is_use_add_valid = true,
    ignore_fields = "confirm_password"
)]
#[derive(Serialize, Deserialize, Default, Debug)]
pub struct AdminProfile {
    #[serde(default)]
    #[field_attrs(
        widget = "inputText",
        label = "Username",
        placeholder = "Enter your username",
        unique = true,
        required = true,
        maxlength = 150,
        hint = "Valid characters: a-z A-Z 0-9 _ @ + .<br>Max size: 150"
    )]
    pub username: Option<String>,
    //
    #[serde(default)]
    #[field_attrs(
        widget = "inputImage",
        label = "Photo",
        placeholder = "Upload your photo",
        accept = "image/jpeg,image/png",
        hint = "Image in JPEG or PNG format"
    )]
    pub photo: Option<String>,
    //
    #[serde(default)]
    #[field_attrs(
        widget = "inputText",
        label = "First name",
        placeholder = "Enter your First name",
        maxlength = 150
    )]
    pub first_name: Option<String>,
    //
    #[serde(default)]
    #[field_attrs(
        widget = "inputText",
        label = "Last name",
        placeholder = "Enter your Last name",
        maxlength = 150
    )]
    pub last_name: Option<String>,
    //
    #[serde(default)]
    #[field_attrs(
        widget = "inputEmail",
        label = "E-mail",
        placeholder = "Please enter your email",
        required = true,
        unique = true,
        maxlength = 74,
        hint = "Your actual E-mail"
    )]
    pub email: Option<String>,
    //
    #[serde(default)]
    #[field_attrs(
        widget = "inputPassword",
        label = "Password",
        placeholder = "Enter your password",
        required = true,
        minlength = 8,
        hint = "Valid characters: a-z A-Z 0-9 @ # $ % ^ & + = * ! ~ ) (<br>Min size: 8"
    )]
    pub password: Option<String>,
    //
    #[serde(default)]
    #[field_attrs(
        widget = "inputPassword",
        label = "Confirm password",
        placeholder = "Repeat your password",
        hint = "Repeat your password"
    )]
    pub confirm_password: Option<String>,
    //
    #[serde(default)]
    #[field_attrs(
        widget = "checkBox",
        label = "is staff?",
        hint = "User can access the admin site?"
    )]
    pub is_staff: Option<bool>,
    //
    #[serde(default)]
    #[field_attrs(
        widget = "checkBox",
        label = "is active?",
        hint = "Is this an active account?"
    )]
    pub is_active: Option<bool>,
}

impl AdditionalValidation for AdminProfile {
    fn add_validation<'a>(
        &self,
    ) -> Result<std::collections::HashMap<&'a str, &'a str>, Box<dyn std::error::Error>> {
        // Hint: error_map.insert("field_name", "Error message.")
        let mut error_map: std::collections::HashMap<&'a str, &'a str> =
            std::collections::HashMap::new();

        // Get clean data
        let hash = self.hash.clone().unwrap_or_default();
        let password = self.password.clone().unwrap_or_default();
        let confirm_password = self.confirm_password.clone().unwrap_or_default();
        let username = self.username.clone().unwrap_or_default();

        // Fields validation
        if hash.is_empty() && password != confirm_password {
            error_map.insert("confirm_password", "Password confirmation does not match.");
        }
        if !RegexBuilder::new(r"^[a-z\d_@+.]+$")
            .case_insensitive(true)
            .build()
            .unwrap()
            .is_match(username.as_str())
        {
            error_map.insert(
                "username",
                "Invalid characters present.<br>\
                 Valid characters: a-z A-Z 0-9 _ @ + .",
            );
        }

        Ok(error_map)
    }
}
