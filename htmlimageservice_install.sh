#!/bin/bash

cd /usr/local/

git clone https://github.com/Multie/HtmlRenderServer

cd HtmlRenderServer
sudo cp ./HtmlRenderServer.service /usr/lib/systemd/system/HtmlRenderServer.service

npm install
sudo systemctl daemon-reload
sudo service HtmlRenderServer start