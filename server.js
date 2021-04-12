// Setup empty JS object to act as endpoint for all routes
projectData = [];

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
const port = 8000 // for local host

/* Dependencies */
const bodyParser = require('body-parser')
/* Middleware*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());

/* Initialize the main project folder*/
app.use(express.static('website'));

// Setup Server


app.get('/getWeather', (req, res) => {
    res.send(projectData); 
})

app.post('/postWeather', (req, res) => {
    save = {
        data: req.body.date,
        temp: req.body.temp,
        content: req.body.content,
    }
    projectData.push(save);
    res.send(projectData[projectData.legth-1]); 
})

const server = app.listen(port, listening);
function listening(){
    console.log(`running on localhost: ${port}`);
};