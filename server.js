const { mongoose } = require('mongoose');
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const colors = require('colors');
const cookieParser = require('cookie-parser')

app.use(cookieParser());
app.use(cors(
    credentials = true,
));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

const { errorhandler } = require('./middleware/errorHandler');
const { connectDatabase } = require('./database/mongoose.module');



// Connect to database
promise = connectDatabase();
const router = require('./routes/router');
app.use('/', router());



/**Error handlers below */
app.use(errorhandler);

app.listen(process.env.port, () => {
    console.log(`Server running on port ${process.env.port}`.yellow.bold);
    console.log(`attempting to connect to database...`.yellow.bold);
});

mongoose.connection.once('open', () => {
    console.log(`Successfully pinged connection with Mongodb at ${mongoose.connection.host}:${mongoose.connection.port}`.green.bold);
});

mongoose.connection.on('error', (err) => {
    console.log(`Error connecting to Mongodb: ${err.message}`.red.bold);
});

