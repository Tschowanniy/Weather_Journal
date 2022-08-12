// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

// as used below, we need to set up the bodyparser
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server -- as also done in: Node & Express Environment → 6. Creating a Local Server I
const port = 8000;
const server = app.listen(port, () => { console.log('server is up and running'), console.log(`running on localhost: ${port}`) });


/*creating  Get and Post routes*/
// post route, using the fancy => declaration ;) 
app.post('/add', (req, res) => {
    projectData['date'] = req.body.date;
    projectData['temp'] = req.body.temp;
    projectData['content'] = req.body.content;
    projectData['city'] = req.body.city;
    
});

//get route
app.get('/all', (req, res) => {
    res.send(projectData)
});
