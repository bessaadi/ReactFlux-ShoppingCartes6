/**
 * Created by naimi on 2/8/17.
 */
var express = require("express");
var path = require("path");
var app  = express();
var APIv1 = require("./routes/APIv1");

//use the APIv1 routes
app.use("/api", APIv1);


//On va pas utiliser les views et views engine, notre appli sera restfull
// wild card pour gerer les chemins qui n existent pas dans l'appli react
app.get("/", function (req, res) {
   res.sendFile(path.resolve(__dirname, '../index.html'));
});

app.listen(3000, "localhost",function (err) {
    if(err)
       return console.log("Error running server on 3000 ....");
    console.log("Running server on localhost:3000");
});
