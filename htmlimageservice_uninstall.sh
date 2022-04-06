#!/bin/bash

apt install postgresql postgresql-contrib
sudo -u postgres psql -c "SELECT version();"
#sudo su - postgres -c "createuser postgres"


apt install nodejs npm
apt install git
git clone https://github.com/Multie/documentsStorage
cd documentsStorage/server 
npm install
npm install -g nodemon
nodemon server.js


