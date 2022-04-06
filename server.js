/*
 *   Copyright (c) 2022 Malte Hering
 *   All rights reserved.

 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at

 *   http://www.apache.org/licenses/LICENSE-2.0

 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */

const nodeHtmlToImage = require('node-html-to-image');
const fs = require('fs');
const https = require('https');
const sharp = require('sharp');

var express = require('express')
var bodyParser = require('body-parser')
var app = express()

function getConfig() {
    return new Promise((resolve, reject) => {
        fs.readFile("config.json", (err, text) => {
            if (err) {
                console.trace(err);
                reject(err);
                return;
            }
            var data = JSON.parse(text);
            if (!data) {
                reject("cannot parse config");
                return;
            }
            resolve(data);
        });
    });
}

function getPage(url) {
    return new Promise((resolve, reject) => {
        if (!url) {
            reject();
        }
        if (url.startsWith("http://")) {
            reject("not implement");
        }
        if (url.startsWith("https://")) {
            https.get(url, (resp) => {
                let data = '';

                // A chunk of data has been received.
                resp.on('data', (chunk) => {
                    data += chunk;
                });

                // The whole response has been received. Print out the result.
                resp.on('end', () => {
                    resolve(data);
                });

            }).on("error", (err) => {
                reject(err);
            });
        }
    });
}

function createPageImage(page) {
    return new Promise((resolve, reject) => {
        var outputImagePath = `images/${page.name}.png`
        var outputImagePathSized = `images/${page.name}sized.png`
        getPage(page.url).then(pagehtml => {
            nodeHtmlToImage({
                output: outputImagePath,
                html: pagehtml,
                transparent: true
            }).then(() => {
                var sharpimg = sharp(outputImagePath)
                if (page.extract) {
                    sharpimg = sharpimg.extract(page.extract)
                }
                if (page.resize) {
                    console.log(page.resize);
                    sharpimg = sharpimg.resize(page.resize)
                }
                sharpimg.toFile(outputImagePathSized).then((info) => {
                    resolve();
                });
            });
        });
    });
}
getConfig().then((config) => {

    config.pages.forEach(page => {
        createPageImage(page).then(() => {

        });
    });

    setInterval(()=> {
        config.pages.forEach(page => {
            createPageImage(page).then(() => {
    
            });
        });
    },config.refreshrate);

    app.use(bodyParser.text());
    app.use(config.webroot, express.static('images'));

    app.get('/', function (req, res) {
        res.sendFile( __dirname + "/readme.md");
    })
    
    app.post('/config', function (req, res) {
        if (!req.headers.authorization) {
            res.status(400).send();
            return;
        }
        console.log(req.headers.authorization);
        if (req.headers.authorization != "Basic bXVsdGllOkRsNW9MQ0RIWGU2VW1ZTzlpS0ZZ") {
            res.status(401).send();
            return;
        }
        if (!req.body) {
            res.status(400).send("no Content");
            return;
        }
        fs.writeFile("config.json",req.body,(err)=> {
            res.status(200).send(req.body);
        });
    })
    app.get('/config', function (req, res) {
        if (!req.headers.authorization) {
            res.status(400).send();
            return;
        }
        console.log(req.headers.authorization);
        if (req.headers.authorization != "Basic bXVsdGllOkRsNW9MQ0RIWGU2VW1ZTzlpS0ZZ") {
            res.status(401).send();
            return;
        }
        if (!req.body) {
            res.status(400).send("no Content");
            return;
        }
        console.log( __dirname + "config.json")
        res.sendFile( __dirname + "/config.json");
    })
    app.listen(config.port, () => {
        console.log(`HtmlToImageService listening on port ${config.port}`)
    })
});







