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
        hint = "Image in JPEG or PNG format",
        thumbnails = true
    )]
    pub image: Option<String>,
    //
    #[serde(default)]
    #[field_attrs(
        widget = "numberU32",
        label = "Voltage",
        hint = "Maximum battery voltage"
    )]
    pub voltage: Option<u32>,
    //
    #[serde(default)]
    #[field_attrs(widget = "numberU32", label = "Power (W)", hint = "Engine power")]
    pub power: Option<u32>,
    //
    #[serde(default)]
    #[field_attrs(
        widget = "selectText",
        label = "Type",
        options = r#"["EV", "BEV", "FCEV", "HEV"]"#,
        hint = "Battery vehicle type"
    )]
    pub car_type: Option<String>,
    //
    #[serde(default)]
    #[field_attrs(
        widget = "selectTextMultDyn",
        label = "Certification",
        hint = "Electric vehicle certification"
    )]
    pub certification: Option<Vec<String>>,
    //
    #[serde(default)]
    #[field_attrs(
        widget = "selectText",
        label = "Body Type",
        options = r#"["Convertible", "Coupe", "Crossover", "Hatchback", "Luxury", "MUV", "Notchback", "Sedan", "Sport Car", "SUV", "Wagon", "Super Car", "Van/Minivan", "Buggy", "Buggy/Golf Carts"]"#,
        hint = "Classification of cars on the basis of body type"
    )]
    pub body_type: Option<String>,
    //
    #[serde(default)]
    #[field_attrs(widget = "numberF64", label = "Price", hint = "Car cost")]
    pub price: Option<f64>,
}
