const express = require('express');
require('dotenv').config();
const app = express();
const cors = require('cors');
const colors = require('colors');


const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./mongoose/index');
connectDB();



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// app.use(notFound);
app.use(errorHandler);

// dummy route
app.get('/api', (req, res) => {
    res.status(200).json('Welcome to the server');
});

//routes
app.use('/api/units', require('./routes/unitRouter'));
app.use('/api/courses', require('./routes/courseRouter'));





app.listen(process.env.SERVER_PORT, () => { console.log(`Server is running on port ${process.env.SERVER_PORT}`.yellow.bold)});
