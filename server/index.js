const express = require('express');
require('dotenv').config();
const app = express();
const cors = require('cors');
const colors = require('colors');
const path = require('path');

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

app.use(express.static(path.join(__dirname, 'public')));
//routes
//private Routes
app.use('/api/admin/courses', require('./routes/private/courseRouter'));
app.use('/api/admin/units', require('./routes/private/unitRouter'));
app.use('/api/admin/timetable', require('./routes/private/timeTableRoute'));

//public Routes
app.use('/api/courses', require('./routes/public/courseRouter'));
app.use('/api/units', require('./routes/public/unitRouter'));


//default routes
app.use('/', require('./routes/root'));
app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ error: '404 Not found' });
    } else {
        req.type('txt').send('404 Not found');
    }
});

app.use(errorHandler);


app.listen(process.env.SERVER_PORT, () => { console.log(`Server is running on port ${process.env.SERVER_PORT}`.yellow.bold) });
