# Html Page to Image
Renders a htmlpage and takes a screenshot. Then the image is served by a webserver


## Config
```` json
{
    "port":80,
    "webroot":"/htmltoimage",
    "pages":[
        {
            "url":"https://www.atomuhr.de/",
            "name":"page1",
            "resize":{
                "height":200,
                "width":200,
                "fit":"cover",
                "position":"top"
            },
            "extract":{
                "top":0,
                "left":0,
                "width":0,
                "height":0
            }
            "transparent":false
        }
    ],
    "refreshrate":100000
}
````
port: port of the Webserver
pages: array of pages to screenshot
url: url to webpage
name: name of the resulting file
resize: options of sharp resize (https://sharp.pixelplumbing.com/api-resize#resize)
extract: options of sharp extract (https://sharp.pixelplumbing.com/api-resize#extract)
transparent: enables the transperancy of the image
refreshrate: the interval of screenshots taken