//! # CKEditor 5 configuration.
//!

use serde_json::{json, Value};

pub fn config_ckeditor(config_name: &str) -> Value {
    match config_name {
        // By default.
        "default" => {
            json!({
                "toolbar": {
                    "items": [
                        "heading", "|",
                        "textPartLanguage", "|",
                        "alignment", "|",
                        "bold", "italic", "underline", "strikethrough", "|",
                        "subscript", "superscript", "|",
                        "fontColor", "fontBackgroundColor", "fontFamily", "fontsize", "|",
                        "bulletedList", "numberedList", "todoList", "|",
                        "outdent", "indent", "|",
                        "blockQuote", "highlight", "|",
                        "pageBreak", "removeFormat", "selectAll", "|",
                        "link", "specialCharacters", "insertTable", "mediaEmbed",
                        "horizontalLine", "code", "codeBlock", "|",
                        "undo",
                        "redo"
                    ],
                    "shouldNotGroupWhenFull": true
                },
                "table": {
                    "contentToolbar": [
                        "tableColumn", "tableRow", "mergeTableCells",
                        "tableProperties", "tableCellProperties"
                    ]
                },
            })
        }
        // Error
        _ => panic!(
            "CKEditor - Configuration name `{}` does not match.",
            config_name
        ),
    }
}
