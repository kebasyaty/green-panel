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
        label = "Model",
        placeholder = "Model name",
        required = true,
        hint = "Car brand and name"
    )]
    pub model: Option<String>,
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
        hint = "Image in JPEG or PNG format",
        thumbnails = true
    )]
    pub image: Option<String>,
    //
    #[serde(default)]
    #[field_attrs(
        widget = "inputDate",
        label = "Year",
        required = true,
        hint = "Year of car manufacture"
    )]
    pub year: Option<String>,
    //
    #[serde(default)]
    #[field_attrs(
        widget = "selectText",
        label = "Style",
        options = r#"["Convertible", "Coupe", "Crossover", "Hatchback", "Luxury", "MUV", "Notchback", "Sedan", "Sport Car", "SUV", "Wagon", "Super Car", "Van/Minivan", "Buggy", "Buggy/Golf Carts", "Smart"]"#,
        hint = "Classification of cars on the basis of body type"
    )]
    pub style: Option<String>,
    //
    #[serde(default)]
    #[field_attrs(widget = "numberF64", label = "Price", hint = "Car cost")]
    pub price: Option<f64>,
    //
    #[serde(default)]
    #[field_attrs(
        widget = "selectText",
        label = "Engine",
        options = r#"["Electric"]"#,
        hint = "Engine type"
    )]
    pub engine: Option<String>,
    //
    #[serde(default)]
    #[field_attrs(
        widget = "selectText",
        label = "Trans",
        options = r#"["1-speed automatic"]"#,
        hint = "Transmission type"
    )]
    pub trans: Option<String>,
    //
    #[serde(default)]
    #[field_attrs(
        widget = "selectText",
        label = "Drive",
        options = r#"["All-wheel Drive"]"#,
        hint = "Type of drive"
    )]
    pub drive: Option<String>,
    //
    #[serde(default)]
    #[field_attrs(widget = "numberU32", label = "Seats", hint = "Number of seats")]
    pub seats: Option<u32>,
}
