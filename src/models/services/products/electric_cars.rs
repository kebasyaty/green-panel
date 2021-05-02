//! Electric Cars
//!

use mango_orm::*;
use metamorphose::Model;
use serde::{Deserialize, Serialize};

use crate::models::settings::{
    electric_cars::{DATABASE_NAME, DB_CLIENT_NAME, DB_QUERY_DOCS_LIMIT, SERVICE_NAME},
    PROJECT_NAME, UNIQUE_PROJECT_KEY,
};

#[Model]
#[derive(Serialize, Deserialize, Default, Debug)]
pub struct ElectricCar {
    #[serde(default)]
    #[field_attrs(
        widget = "inputText",
        label = "Vehicle name",
        placeholder = "Enter vehicle name",
        required = true,
        hint = "Car brand and name"
    )]
    pub car_name: Option<String>,
    //
    #[serde(default)]
    #[field_attrs(
        widget = "inputImage",
        label = "Image",
        value = r#"{
                "path":"./media/no_vehicle.png",
                "url":"/media/no_vehicle.png"
            }"#,
        placeholder = "Upload image car",
        accept = "image/jpeg,image/png",
        required = true,
        hint = "Image in JPEG or PNG format"
    )]
    pub image: Option<String>,
    //
    #[serde(default)]
    #[field_attrs(widget = "selectTextDyn")]
    pub select_text_dyn: Option<String>,
}
