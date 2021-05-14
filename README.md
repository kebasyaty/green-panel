[![Logo](https://github.com/kebasyaty/mango-panel/raw/main/images/logo.svg "Logo")](https://github.com/kebasyaty/mango-panel "Logo")

# mango-panel

### Admin panel for easy use of [mango-orm](https://github.com/kebasyaty/mango-orm "mango-orm").  This example uses [actix-web](https://github.com/actix/actix-web "actix-web") . Other frameworks can be used by this analogy.

## Quick start
#### 1.  Install mongodb (if not installed)
    ### Ubuntu, Mint:
    $ sudo apt install mongodb
    ## OR
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
    $ sudo systemctl stop mongodb
    $ sudo systemctl disable mongodb
    $ sudo apt purge mongodb    # OR (for 4.4) - $ sudo apt-get purge mongodb-org*
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

## Document form
![ Document form](https://github.com/kebasyaty/mango-panel/raw/main/images/4.png " Document form")
