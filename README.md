[![Logo](https://github.com/kebasyaty/mango-panel/raw/main/images/logo.svg "Logo")](https://github.com/kebasyaty/mango-panel "Logo")

# mango-panel

### Admin panel for easy use of [mango-orm](https://github.com/kebasyaty/mango-orm "mango-orm").  This example uses [actix-web](https://github.com/actix/actix-web "actix-web") . Other frameworks can be used by this analogy.

## Requirements
- **actix-cors -** [https://crates.io/crates/actix-cors](https://crates.io/crates/actix-cors "https://crates.io/crates/actix-cors")
- **actix-files -** [https://crates.io/crates/actix-files](https://crates.io/crates/actix-files "https://crates.io/crates/actix-files")
- **actix-http -** [https://crates.io/crates/actix-http](https://crates.io/crates/actix-http "https://crates.io/crates/actix-http")
- **actix-multipart -** [https://crates.io/crates/actix-multipart](https://crates.io/crates/actix-multipart "https://crates.io/crates/actix-multipart")
- **actix-rt -** [https://crates.io/crates/actix-rt](https://crates.io/crates/actix-rt "https://crates.io/crates/actix-rt")
- **actix-session -** [https://crates.io/crates/actix-session](https://crates.io/crates/actix-session "https://crates.io/crates/actix-session")
- **actix-web -** [https://crates.io/crates/actix-web](https://crates.io/crates/actix-web "https://crates.io/crates/actix-web")
- **base64 -** [https://crates.io/crates/base64](https://crates.io/crates/base64 "https://crates.io/crates/base64")
- **chrono -** [https://crates.io/crates/chrono](https://crates.io/crates/chrono "https://crates.io/crates/chrono")
- **env_logger -** [https://crates.io/crates/env_logger](https://crates.io/crates/env_logger "https://crates.io/crates/env_logger")
- **futures -** [https://crates.io/crates/futures](https://crates.io/crates/futures "https://crates.io/crates/futures")
- **humansize -** [https://crates.io/crates/humansize](https://crates.io/crates/humansize "https://crates.io/crates/humansize")
- **mango-orm -** [https://crates.io/crates/mango-orm](https://crates.io/crates/mango-orm "https://crates.io/crates/mango-orm")
- **metamorphose -** [https://crates.io/crates/metamorphose](https://crates.io/crates/metamorphose "https://crates.io/crates/metamorphose")
- **regex -** [https://crates.io/crates/regex](https://crates.io/crates/regex "https://crates.io/crates/regex")
- **sanitize-filename -** [https://crates.io/crates/sanitize-filename](https://crates.io/crates/sanitize-filename "https://crates.io/crates/sanitize-filename")
- **serde_json -** [https://crates.io/crates/serde_json](https://crates.io/crates/serde_json "https://crates.io/crates/serde_json")
- **str_slug -** [https://crates.io/crates/str_slug](https://crates.io/crates/str_slug "https://crates.io/crates/str_slug")
- **uuid -** [https://crates.io/crates/uuid](https://crates.io/crates/uuid "https://crates.io/crates/uuid")
- **serde -** [https://crates.io/crates/serde](https://crates.io/crates/serde "https://crates.io/crates/serde")
- **tera -** [https://crates.io/crates/tera](https://crates.io/crates/tera "https://crates.io/crates/tera")
- **mongodb -** [https://crates.io/crates/mongodb](https://crates.io/crates/mongodb "https://crates.io/crates/mongodb")
- ...
- **Vue.js -** [https://vuejs.org/](https://vuejs.org/ "https://vuejs.org/")
- **Vuetify.js -** [https://vuetifyjs.com/](https://vuetifyjs.com/ "https://vuetifyjs.com/")

## Hint
#### 1) For examples of Model fields, use [tests](https://github.com/kebasyaty/mango-orm/tree/master/test-drive/tests "tests").
#### 2) Translations for the panel:
    To change the panel language, follow the path: mango-panel/src/services/admin.rs -> LANGUAGE_CODE
#### If there is no translation for your language:
-  Make a "Pull request" on the GitHub so that I can add your translation.
-  OR:
-  1.[Download the file with the English translation.](https://github.com/kebasyaty/mango-panel/raw/main/admin-panel/src/i18n/lang/en.js  "Download the file with the English translation.")
- 2.Translate the file into your language and send to kebasyaty@gmail.com

## Quick start
#### 1.  Install mongodb (if not installed)
    ### Ubuntu, Mint:
    $ sudo apt install mongodb
    ## OR
    ### Ubuntu 20.04, Mint 19.x:
    $ sudo apt update
    $ sudo apt install dirmngr gnupg apt-transport-https ca-certificates
    $ wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
    $ sudo add-apt-repository 'deb [arch=amd64] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse'
    $ sudo apt update
    $ sudo apt install mongodb-org
    $ sudo systemctl enable --now mongod
    $ mongo --eval 'db.runCommand({ connectionStatus: 1 })'    # For check
    $ reboot
    ### Configuration file:
    sudo nano /etc/mongod.conf
    ### Systemd:
    $ sudo service mongod status
    $ sudo service mongod start
    $ sudo service mongod stop
    $ sudo service mongod restart
    $ sudo service mongod enable
    $ sudo service mongod disable
    ### Uninstall:
    $ sudo service mongod stop
    $ sudo service mongod disable
    $ sudo apt purge mongodb-org*
    $ sudo rm -r /var/log/mongodb
    $ sudo rm -r /var/lib/mongodb
    $ sudo rm -f /etc/mongod.conf
    $ sudo rm -f /etc/apt/sources.list.d/mongodb-org-4.4.list    # for 4.4

#### 2. [Download and unzip the project archive](https://github.com/kebasyaty/mango-panel/archive/refs/heads/main.zip "Download and unzip the project archive")
#### 3. Go to the project directory and run the following commands:
    $ cargo build
    $ cargo run
    Open in a web browser http://127.0.0.1:8088/admin

##  Login page
#### On the first visit to the panel, the first user with administrator rights will be created.
- **Default login:** admin
- **Default password:** 12345678
![Login page](https://github.com/kebasyaty/mango-panel/raw/main/images/1.png "Login page")

## Welcome page
![Welcome page](https://github.com/kebasyaty/mango-panel/raw/main/images/2.png "Welcome page")

## List of documents
![List of documents](https://github.com/kebasyaty/mango-panel/raw/main/images/3.png "List of documents")

![List of documents](https://github.com/kebasyaty/mango-panel/raw/main/images/5.png "List of documents")

## Document form
![ Document form](https://github.com/kebasyaty/mango-panel/raw/main/images/4.png " Document form")

## Example of using a dynamic widget
#### Dynamic Widgets - This is a simplified alternative to `ForeignKey` and ` ManyToMan`. Dynamic widgets are used to create document-style categories.
![Example of using a dynamic widget](https://github.com/kebasyaty/mango-panel/raw/main/images/6.png "Example of using a dynamic widget")

## Image upload field
![Image upload field](https://github.com/kebasyaty/mango-panel/raw/main/images/7.png "Image upload field")

## File upload field
![File upload field](https://github.com/kebasyaty/mango-panel/raw/main/images/12.png "File upload field")

## Color selection field
![Color selection field](https://github.com/kebasyaty/mango-panel/raw/main/images/8.png "Color selection field")

## Date and time field
#### In the database, the date and time are stored in UTC format. In the admin panel, the date and time are displayed as local.
![Date and time field](https://github.com/kebasyaty/mango-panel/raw/main/images/9.png "Date and time field")

![Date and time field](https://github.com/kebasyaty/mango-panel/raw/main/images/10.png "Date and time field")

## Field `textarea` type and CKEditor 5
###### *There are two problems - There is no support for images and tables are not working well.*
##### Usag CKEditor 5 with `textArea` widget
    #[serde(default)]
    #[field_attrs(widget = "textArea", label = "Text Editor", css_classes = "ckeditor")]
    pub text_editor: Option<String>,
![Field `textarea` type and pulse CKEditor 5](https://github.com/kebasyaty/mango-panel/raw/main/images/11.png "Field `textarea` type and pulse CKEditor 5")
