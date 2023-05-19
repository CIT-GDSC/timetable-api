const express = require('express');
require('dotenv').config();
const app = express();
const cors = require('cors');
const colors = require('colors');


const { notFound, errorHandler } = require('./middleware/errorMiddleware');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(notFound);
app.use(errorHandler);







app.listen(process.env.SERVER_PORT, () => { console.log(`Server is running on port ${process.env.SERVER_PORT}`.yellow.bold)});
