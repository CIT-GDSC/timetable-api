const { mongoose } = require('mongoose');
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const colors = require('colors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());


const { errorhandler } = require('./middleware/errorHandler.module');
const { connectDatabase } = require('./database/mongoose.module');



// Connect to database
promise = connectDatabase();

app.use('/api/student/', require('./routes/studentRoute.service'));



app.use('/welcome', (req, res) => { res.send('Welcome to the student council API')});


/**Error handlers below */
app.use(errorhandler);

app.listen(process.env.port  , () => {
    console.log(`Server running on port ${process.env.port}`.yellow.bold);
    console.log(`attempting to connect to database...`.yellow.bold);
});

mongoose.connection.once('open', () => {
    console.log(`Successfully pinged connection with Mongodb at ${mongoose.connection.host}:${mongoose.connection.port}`.green.bold);
});

mongoose.connection.on('error', (err) => {
    console.log(`Error connecting to Mongodb: ${err.message}`.red.bold);
});

