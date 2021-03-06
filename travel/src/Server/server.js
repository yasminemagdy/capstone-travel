var path = require('path')

// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');

// Dependencies //
const bodyParser = require('body-parser');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('dist'));

//GET Route
app.get('/', function(req,res) {
    res.sendFile('dist/index.html')
})

//POST Route 
app.post('/add' ,information);

function information(req , res){
    
    projectData.date = req.body.date;
    projectData.temp= req.body.temp;
    projectData.content = req.body.content;
    res.send(projectData);
    console.log(projectData);
}
//calling a function to complete GET '/all
//app.get('/all' ,getInfo);

//function getInfo(req, res) {
  //  res.send(projectData)
//}



// Setup Server
const port = 8080;
app.listen(port , listening);

function listening(){
    console.log(`Server running on localhost : ${port}`)
}