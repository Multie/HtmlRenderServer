#!/bin/bash

cd /home/multi/

git clone https://github.com/Multie/documentsStorage

cd documentsStorage
sudo cp ./documentstorage.service /usr/lib/systemd/system/documentsStorage.service

sudo systemctl daemon-reload
#sudo service documentstorage start