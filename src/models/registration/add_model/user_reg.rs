use mango_orm::{CachingModel, QCommons, QPaladins};
use mongodb::bson::{doc, document::Document, oid::ObjectId};
use std::error::Error;

use crate::{models::services::accounts::users, settings};

const MODUL_NAME: &str = "user_reg";

pub fn result(
    doc_hash: Option<&str>,
    bytes: Option<&actix_web::web::BytesMut>,
    app_state: Option<actix_web::web::Data<settings::state::AppState>>,
    filter: Option<Document>,
    options_json: Option<&str>,
) -> Result<String, Box<dyn Error>> {
    //
    if doc_hash.is_some() {
        // Get document
        // -----------------------------------------------------------------------------------------
        let object_id = ObjectId::with_string(doc_hash.unwrap());
        if object_id.is_ok() {
            let object_id = object_id.unwrap();
            let filter = doc! {"_id": object_id};
            let instance = users::User::find_one_to_model_instance::<users::User>(filter, None)?;
            if instance.is_some() {
                return instance.unwrap().instance_to_json_for_admin();
            } else {
                Err("Document is missing.")?
            }
        } else {
            return users::User::model_to_json_for_admin();
        }
    } else if bytes.is_some() && app_state.is_some() {
        // Save document
        // -----------------------------------------------------------------------------------------
        let app_state = app_state.unwrap();
        let mut instance = serde_json::from_slice::<users::User>(&bytes.unwrap())?;
        //
        instance.photo = app_state.base64_to_file(instance.photo, "users/avatars");
        //
        let output_data = instance.save(None, None)?;
        return output_data.to_json_for_admin();
    } else if filter.is_some() {
        // Delete document
        // -----------------------------------------------------------------------------------------
        let instance =
            users::User::find_one_to_model_instance::<users::User>(filter.unwrap(), None)?;
        if instance.is_some() {
            let output_data = instance.unwrap().delete(None)?;
            if !output_data.is_valid()? {
                return Ok(output_data.err_msg()?);
            }
        } else {
            return Ok(String::from("Document is missing."));
        }
    } else if options_json.is_some() {
        // Update dynamic widget data
        // -----------------------------------------------------------------------------------------
        users::User::db_update_dyn_widgets(options_json.unwrap())?;
    } else {
        // Error
        // -----------------------------------------------------------------------------------------
        Err(format!(
            "Module: `src/models/registration/add_model/{}` > \
             Method: `result` : No match on function arguments.",
            MODUL_NAME
        ))?
    }
    //
    Ok(String::new())
}
