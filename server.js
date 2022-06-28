// Require Express to run server and routes
/* Dependencies */
/*
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
*/
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(morgan('short'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
// Spin up the server
const PORT = 3000;

app.listen(PORT, function () {
    console.log(`Server is listening on port: ${PORT}`)
})


// Callback to debug
// Via the middleware Morgan

// Initialize all route with a callback function
// Callback function to complete GET '/all'
app.get('/all', function (req, res) {
    res.status(200).send(JSON.stringify(projectData));
})

// Post Route
app.post('/data', function (req, res) {
  projectData.date = req.body.date;
  projectData.city = req.body.city;
  projectData.temp = req.body.temp;
  projectData.feel = req.body.content;
});
