var express = require("express");
var app = express();
var bodyParser = require("body-parser");
const vision = require('@google-cloud/vision');
var { createCanvas, loadImage } = require("canvas");
var fs = require("fs")


app.get("/", function (req, res) {
    res.send("hello world");
});

var objectCount = 0;
var i = 0;
var firstCoordinateX = 0;
var secondCoordinateX = 0;
var thirdCoordinateX = 0;
var fourthCoordinateX = 0;
var firstCoordinateY = 0;
var secondCoordinateY = 0;
var thirdCoordinateY = 0;
var fourthCoordinateY = 0;

console.log("server basladi");
const jsonParser = bodyParser.json({ limit: "25mb" });

app.post("/upload", jsonParser, async function (req, res) {
    const base64 = req.body.image;
    const imgBuffer = Buffer.from(base64, "base64");
    console.log("geldi");
    const request = {
        image: {
            content: imgBuffer,
        },
    };
    console.log("istek geldi");
    const client = new vision.ImageAnnotatorClient({
        keyFilename: 'APIKey.json'
    });
    fs.writeFileSync("./upload/img.jpg", imgBuffer);
    const canvas = createCanvas(req.body.width, req.body.height);
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "blue";
    ctx.font = "bold 24px Arial";
    ctx.strokeStyle = "red";
    objectCount = 0;
    client
        .objectLocalization(request)
        .then(results => {
            console.log("google");
            const objects = results[0].localizedObjectAnnotations;
            loadImage('./upload/img.jpg').then((image) => {
                ctx.drawImage(image, 0, 0, req.body.width, req.body.height);
                objects.forEach(object => {
                    console.log(`Name: ${object.name}`);
                    objectCount++;
                    const veritices = object.boundingPoly.normalizedVertices;
                    i = 0;
                    veritices.forEach(
                        v => {
                            console.log(`x: ${v.x}, y:${v.y}`)
                            if (i == 0) {
                                firstCoordinateX = v.x;
                                firstCoordinateY = v.y;
                            }
                            else if (i == 1) {
                                secondCoordinateX = v.x;
                                secondCoordinateY = v.y;
                            }
                            else if (i == 2) {
                                thirdCoordinateX = v.x;
                                thirdCoordinateY = v.y;
                            }
                            else if (i == 3) {
                                fourthCoordinateX = v.x;
                                fourthCoordinateY = v.y;
                                ctx.fillText(object.name, fourthCoordinateX * req.body.width, fourthCoordinateY * req.body.height);
                            }
                            i++;
                        }
                    );
                    ctx.moveTo(firstCoordinateX * req.body.width, firstCoordinateY * req.body.height);//sol üst çarpraz sağ alt çarpraz
                    ctx.lineTo(secondCoordinateX * req.body.width, secondCoordinateY * req.body.height);

                    ctx.moveTo(firstCoordinateX * req.body.width, firstCoordinateY * req.body.height);//sol en üst
                    ctx.lineTo(fourthCoordinateX * req.body.width, fourthCoordinateY * req.body.height);//sol en alt

                    ctx.moveTo(fourthCoordinateX * req.body.width, fourthCoordinateY * req.body.height);//sol en alt
                    ctx.lineTo(thirdCoordinateX * req.body.width, thirdCoordinateY * req.body.height);//sağ en alt

                    ctx.moveTo(secondCoordinateX * req.body.width, secondCoordinateY * req.body.height);//sağ en alt
                    ctx.lineTo(thirdCoordinateX * req.body.width, thirdCoordinateY * req.body.height);//sağ en üst
                    ctx.stroke();
                });
                console.log(objectCount);
                ctx.fillText("Obje Sayısı:" + objectCount, 10, 50);
                const buffer = canvas.toBuffer('image/png')
                fs.writeFileSync('./upload/img.jpg', buffer)
                res.end();
            });
        })
        .catch(err => {
            console.error('ERROR: ', err);
        });

});
app.use("/upload", express.static("upload"));
app.listen(3000);