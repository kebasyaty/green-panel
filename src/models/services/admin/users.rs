//! # User profile
//!
//! `AdminProfile` - Administrator profiles.
//! `SellerProfile` - Seller profiles.
//! `CustomerProfile` - Customer profiles.
//!

use mango_orm::*;
use metamorphose::Model;
use regex::RegexBuilder;
use serde::{Deserialize, Serialize};

use crate::models::settings::{
    admin::{DATABASE_NAME, DB_CLIENT_NAME, DB_QUERY_DOCS_LIMIT, SERVICE_NAME},
    PROJECT_NAME, UNIQUE_PROJECT_KEY,
};

// Administrator profiles
// *************************************************************************************************
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
    #[field_attrs(widget = "hiddenSlug", unique = true, slug_sources = r#"["username"]"#)]
    pub slug: Option<String>,
    //
    #[serde(default)]
    #[field_attrs(
        widget = "inputImage",
        label = "Photo",
        value = r#"{
                "path":"./media/no_avatar.png",
                "url":"/media/no_avatar.png"
            }"#,
        placeholder = "Upload your photo",
        accept = "image/jpeg,image/png",
        hint = "Image in JPEG or PNG format",
        thumbnails = r#"[["xs",150],["sm",300]]"# // all sizes: "xs","sm","md","lg"
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
        maxlength = 320,
        hint = "Your actual E-mail"
    )]
    pub email: Option<String>,
    //
    #[serde(default)]
    #[field_attrs(
        widget = "inputPhone",
        label = "Phone number",
        placeholder = "Please enter your phone number",
        unique = true,
        maxlength = 30,
        hint = "Your actual phone number"
    )]
    pub phone: Option<String>,
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
        required = true,
        minlength = 8,
        hint = "Repeat your password"
    )]
    pub confirm_password: Option<String>,
    //
    #[serde(default)]
    #[field_attrs(
        widget = "checkBox",
        label = "is staff?",
        checked = true,
        hint = "User can access the admin site?"
    )]
    pub is_staff: Option<bool>,
    //
    #[serde(default)]
    #[field_attrs(
        widget = "checkBox",
        label = "is active?",
        checked = true,
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

// Seller profiles
// *************************************************************************************************
#[Model(
    is_del_docs = false,
    is_use_add_valid = true,
    ignore_fields = "confirm_password"
)]
#[derive(Serialize, Deserialize, Default, Debug)]
pub struct SellerProfile {
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
    #[field_attrs(widget = "hiddenSlug", unique = true, slug_sources = r#"["username"]"#)]
    pub slug: Option<String>,
    //
    #[serde(default)]
    #[field_attrs(
        widget = "inputImage",
        label = "Photo",
        value = r#"{
                "path":"./media/no_avatar.png",
                "url":"/media/no_avatar.png"
            }"#,
        placeholder = "Image in (JPEG or PNG) format",
        accept = "image/jpeg,image/png",
        required = true,
        hint = "Upload your photo",
        thumbnails = r#"[["xs",150],["sm",300]]"# // all sizes: "xs","sm","md","lg"
    )]
    pub photo: Option<String>,
    //
    #[serde(default)]
    #[field_attrs(
        widget = "inputText",
        label = "First name",
        placeholder = "Enter your First name",
        required = true,
        maxlength = 150
    )]
    pub first_name: Option<String>,
    //
    #[serde(default)]
    #[field_attrs(
        widget = "inputText",
        label = "Last name",
        placeholder = "Enter your Last name",
        required = true,
        maxlength = 150
    )]
    pub last_name: Option<String>,
    //
    #[serde(default)]
    #[field_attrs(
        widget = "selectText",
        label = "Gender",
        value = "male",
        options = r#"[
                ["female","female"],
                ["male","male"]
            ]"#,
        hint = "Select your gender"
    )]
    pub gender: Option<String>,
    //
    #[serde(default)]
    #[field_attrs(
        widget = "inputDate",
        label = "Birthday",
        placeholder = "Please enter your date of birth",
        required = true,
        hint = "Your date of birth"
    )]
    pub birthday: Option<String>,
    //
    #[serde(default)]
    #[field_attrs(
        widget = "inputColor",
        value = "#ffffff",
        label = "Color",
        hint = "Your favorite color"
    )]
    pub color: Option<String>,
    //
    #[serde(default)]
    #[field_attrs(
        widget = "inputEmail",
        label = "Contact's Mailing Address",
        placeholder = "Please enter your email",
        required = true,
        unique = true,
        maxlength = 320,
        hint = "Your actual E-mail"
    )]
    pub email: Option<String>,
    //
    #[serde(default)]
    #[field_attrs(
        widget = "inputPhone",
        label = "Contact's Phone Number",
        placeholder = "Please enter your phone number",
        required = true,
        unique = true,
        maxlength = 30,
        hint = "Your actual phone number"
    )]
    pub phone: Option<String>,
    //
    #[serde(default)]
    #[field_attrs(
        widget = "inputText",
        label = "City",
        placeholder = "Enter the name of the city",
        required = true,
        hint = "Indicate the city in which you live"
    )]
    pub city: Option<String>,
    //
    #[serde(default)]
    #[field_attrs(
        widget = "selectText",
        label = "Country",
        placeholder = "Please Select",
        required = true,
        options = r#"["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua &amp; Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia &amp; Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Cape Verde", "Cayman Islands", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cruise Ship", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyz Republic", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania", "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Namibia", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre &amp; Miquelon", "Samoa", "San Marino", "Satellite", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "South Africa", "South Korea", "Spain", "Sri Lanka", "St Kitts &amp; Nevis", "St Vincent", "St. Lucia", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L`Este", "Togo", "Tonga", "Trinidad &amp; Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks &amp; Caicos", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"]"#,
        hint = "Select the country you live in"
    )]
    pub country: Option<String>,
    //
    #[serde(default)]
    #[field_attrs(
        widget = "inputFile",
        label = "Resume",
        placeholder = "Document in (MS Word or PDF) format",
        //accept = "application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf",
        required = true,
        hint = "Upload your resume"
    )]
    pub resume: Option<String>,
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
        required = true,
        minlength = 8,
        hint = "Repeat your password"
    )]
    pub confirm_password: Option<String>,
    //
    #[serde(default)]
    #[field_attrs(
        widget = "checkBox",
        label = "is active?",
        hint = "Is this an active account?"
    )]
    pub is_active: Option<bool>,
}

impl AdditionalValidation for SellerProfile {
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

// Customer profiles
// *************************************************************************************************
#[Model(
    is_del_docs = false,
    is_use_add_valid = true,
    ignore_fields = "confirm_password"
)]
#[derive(Serialize, Deserialize, Default, Debug)]
pub struct CustomerProfile {
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
    #[field_attrs(widget = "hiddenSlug", unique = true, slug_sources = r#"["username"]"#)]
    pub slug: Option<String>,
    //
    #[serde(default)]
    #[field_attrs(
        widget = "inputImage",
        label = "Photo",
        value = r#"{
                "path":"./media/no_avatar.png",
                "url":"/media/no_avatar.png"
            }"#,
        placeholder = "Image in (JPEG or PNG) format",
        accept = "image/jpeg,image/png",
        hint = "Upload your photo",
        thumbnails = r#"[["xs",150],["sm",300]]"# // all sizes: "xs","sm","md","lg"
    )]
    pub photo: Option<String>,
    //
    #[serde(default)]
    #[field_attrs(
        widget = "inputText",
        label = "First name",
        placeholder = "Enter your First name",
        required = true,
        maxlength = 150
    )]
    pub first_name: Option<String>,
    //
    #[serde(default)]
    #[field_attrs(
        widget = "inputText",
        label = "Last name",
        placeholder = "Enter your Last name",
        required = true,
        maxlength = 150
    )]
    pub last_name: Option<String>,
    //
    #[serde(default)]
    #[field_attrs(
        widget = "selectText",
        label = "Gender",
        value = "male",
        options = r#"[
                ["female","female"],
                ["male","male"]
            ]"#,
        hint = "Select your gender"
    )]
    pub gender: Option<String>,
    //
    #[serde(default)]
    #[field_attrs(
        widget = "inputDate",
        label = "Birthday",
        placeholder = "Please enter your date of birth",
        required = true,
        hint = "Your date of birth"
    )]
    pub birthday: Option<String>,
    //
    #[serde(default)]
    #[field_attrs(
        widget = "inputColor",
        value = "#ffffff",
        label = "Color",
        hint = "Your favorite color"
    )]
    pub color: Option<String>,
    //
    #[serde(default)]
    #[field_attrs(
        widget = "inputEmail",
        label = "Contact's Mailing Address",
        placeholder = "Please enter your email",
        required = true,
        unique = true,
        maxlength = 320,
        hint = "Your actual E-mail"
    )]
    pub email: Option<String>,
    //
    #[serde(default)]
    #[field_attrs(
        widget = "inputPhone",
        label = "Contact's Phone Number",
        placeholder = "Please enter your phone number",
        maxlength = 30,
        unique = true,
        hint = "Your actual phone number"
    )]
    pub phone: Option<String>,
    //
    #[serde(default)]
    #[field_attrs(
        widget = "inputText",
        label = "City",
        placeholder = "Enter the name of the city",
        hint = "Indicate the city in which you live"
    )]
    pub city: Option<String>,
    //
    #[serde(default)]
    #[field_attrs(
        widget = "selectText",
        label = "Country",
        placeholder = "Please Select",
        required = true,
        options = r#"["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua &amp; Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia &amp; Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Cape Verde", "Cayman Islands", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cruise Ship", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyz Republic", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania", "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Namibia", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre &amp; Miquelon", "Samoa", "San Marino", "Satellite", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "South Africa", "South Korea", "Spain", "Sri Lanka", "St Kitts &amp; Nevis", "St Vincent", "St. Lucia", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L`Este", "Togo", "Tonga", "Trinidad &amp; Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks &amp; Caicos", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"]"#,
        hint = "Select the country you live in"
    )]
    pub country: Option<String>,
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
        required = true,
        minlength = 8,
        hint = "Repeat your password"
    )]
    pub confirm_password: Option<String>,
    //
    #[serde(default)]
    #[field_attrs(
        widget = "checkBox",
        label = "is active?",
        hint = "Is this an active account?"
    )]
    pub is_active: Option<bool>,
}

impl AdditionalValidation for CustomerProfile {
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
