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
    #[field_attrs(widget = "hiddenSlug", unique = true, slug_sources = r#"["model"]"#)]
    pub slug: Option<String>,
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
        thumbnails = r#"[["xs",150],["sm",300]]"#
    )]
    pub image: Option<String>,
    //
    #[serde(default)]
    #[field_attrs(
        widget = "numberU32",
        label = "Year",
        required = true,
        hint = "Year of car manufacture"
    )]
    pub year: Option<u32>,
    //
    #[serde(default)]
    #[field_attrs(
        widget = "selectTextDyn",
        label = "Style",
        required = true,
        hint = "Classification of cars on the basis of body type"
    )]
    pub style: Option<String>,
    //
    #[serde(default)]
    #[field_attrs(
        widget = "numberF64",
        label = "Price",
        required = true,
        hint = "Car cost"
    )]
    pub price: Option<f64>,
    //
    #[serde(default)]
    #[field_attrs(
        widget = "selectTextMultDyn",
        label = "Engine",
        required = true,
        hint = "Engine type"
    )]
    pub engine: Option<Vec<String>>,
    //
    #[serde(default)]
    #[field_attrs(
        widget = "selectTextDyn",
        label = "Trans",
        required = true,
        hint = "Transmission type"
    )]
    pub trans: Option<String>,
    //
    #[serde(default)]
    #[field_attrs(
        widget = "selectTextDyn",
        label = "Drive",
        required = true,
        hint = "Type of drive"
    )]
    pub drive: Option<String>,
    //
    #[serde(default)]
    #[field_attrs(
        widget = "selectTextMultDyn",
        label = "Colors",
        required = true,
        hint = "Available car body colors"
    )]
    pub colors: Option<Vec<String>>,
    //
    #[serde(default)]
    #[field_attrs(
        widget = "selectU32MultDyn",
        label = "Seats",
        required = true,
        hint = "Number of seats"
    )]
    pub seats: Option<Vec<u32>>,
    //
    #[serde(default)]
    #[field_attrs(
        widget = "textArea",
        label = "Text Editor",
        maxlength = 6000,
        css_classes = "ckeditor"
    )]
    pub text_editor: Option<String>,
}
