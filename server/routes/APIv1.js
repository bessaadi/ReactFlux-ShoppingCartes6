/**
 * Created by naimi on 2/8/17.
 */
var express = require("express");
var fs = require("fs");
var path = require("path");


var APIv1 = express.Router();
const dataPathFile = path.join(__dirname, "../data/products.json");
var stream = "";


//Promise on reading file asynchronously
var readFilePromise = new Promise(function (resolve, reject) {
    fs.readFile(dataPathFile, 'utf8', function (err, data) {
        if (err)
            reject(err);
        else {
            resolve(data);
        }
    });
});

//Allow cross-origin for any request
APIv1.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

APIv1.get("/produits", function (req, res) {
  //read data asynchronously with a promise
  readFilePromise.then((data) => {
    const dataJson = JSON.parse(data);
    res.status('200');
    res.json(dataJson);
  });

});

APIv1.post("/addProduct", function (req, res) {
    // add the product in db
});

APIv1.put("/modifyProduct", function (req, res) {
    // modify the product
});

APIv1.delete("/deleteProduct", function (req, res) {
    // delete the product
});

APIv1.get("/catalog", function (req, res) {
    //read data asynchronously with a promise
    readFilePromise.then((data) => {
      const dataJson = JSON.parse(data);
      res.status('200');
      res.json(dataJson);
    });
  
  });
module.exports = APIv1;
