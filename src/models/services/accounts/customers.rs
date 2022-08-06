//! Customer profiles.

use green_barrel::*;
use metamorphose::Model;
use mongodb::bson::{doc, oid::ObjectId};
use serde::{Deserialize, Serialize};

use crate::models::{
    services::accounts::users,
    settings::{
        accounts::{DATABASE_NAME, DB_CLIENT_NAME, DB_QUERY_DOCS_LIMIT, SERVICE_NAME},
        PROJECT_NAME, UNIQUE_PROJECT_KEY,
    },
};

// Customer profiles
// *************************************************************************************************
#[Model(is_del_docs = false, is_use_add_valid = true)]
#[derive(Serialize, Deserialize, Default, Debug)]
pub struct CustomerProfile {
    #[serde(default)]
    #[field_attrs(
        widget = "inputText",
        label = "User ID",
        required = true,
        unique = true, // For relationship effect OneToOne.
        placeholder = "Enter your user ID"
    )]
    pub user_id: Option<String>,
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
}

impl AdditionalValidation for CustomerProfile {
    fn add_validation<'a>(
        &self,
    ) -> Result<std::collections::HashMap<&'a str, &'a str>, Box<dyn std::error::Error>> {
        // Hint: error_map.insert("field_name", "Error message.")
        let mut error_map: std::collections::HashMap<&'a str, &'a str> =
            std::collections::HashMap::new();

        // Get clean data
        let user_id = self.user_id.clone().unwrap_or_default();

        // Fields validation
        let object_id = ObjectId::with_string(user_id.as_str());
        if object_id.is_ok() {
            let object_id = object_id?;
            let filter = doc! {"_id": object_id};
            let count = users::User::count_documents(Some(filter), None)?;
            if count == 0 {
                error_map.insert("user_id", "The user's ID does not match.");
            }
        } else {
            error_map.insert("user_id", "Invalid user ID.");
        }

        Ok(error_map)
    }
}
