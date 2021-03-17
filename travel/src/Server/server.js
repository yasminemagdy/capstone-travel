// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require("express");

// Dependencies //
const bodyParser = require('body-parser');
// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Cors for cross origin allowance
const cors = require("cors");
const { json } = require("body-parser");
app.use(cors());
// Initialize the main project folder
app.use(express.static("dist"));
app.get("/", function(req,res) {
    res.sendFile("dist/index.html")
})
//POST Route 
const data = [];
app.post("/add" ,information);
app.post('/weather', weather)
app.post('/imag' , imag)

function imag (req , res){
    projectData['img'] = req.body.img;
    res.send(projectData);
    console.log(projectData)
}

function weather (req,res){
    projectData['temp'] = req.body.temp;
    projectData['des'] = req.body.des;
    res.send(projectData);
    console.log(projectData)
}

function information(req , res){
    projectData['latitude'] = req.body.latitude;
    projectData['longitude'] = req.body.longitude;
    projectData['countryName'] = req.body.countryName;
    projectData['cityName'] = req.body.cityName;
    projectData['leaving_From'] = req.body.leaving;
    projectData['date'] = req.body.date;
    projectData['daysLeft'] = req.body.daysleft;
    res.send(projectData);
    console.log(projectData);
}
//calling a function to complete GET '/all
app.get("/all" ,getInfo);

function getInfo(req, res) {
    res.send(projectData)
}

// Setup Server
const port = 5000;
app.listen(port , listening);

function listening(){
    console.log(`Server running on localhost : ${port}`)
}

module.exports = {getInfo, information , imag , weather}