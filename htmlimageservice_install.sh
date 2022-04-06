#!/bin/bash

cd /usr/local/

git clone https://github.com/Multie/HtmlRenderServer

cd HtmlRenderServer
sudo cp ./HtmlRenderServer.service /usr/lib/systemd/system/HtmlRenderServer.service

sudo systemctl daemon-reload
sudo service HtmlRenderServer start