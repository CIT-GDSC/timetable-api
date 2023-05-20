const { eventLogger } = require('./logger');


const notFound = (req, res, next) => {
    const error = new Error(`Not found - ${req.originalUrl}`);
    res.status(404);
    next(error);
}


// Path: server/middleware/errorMiddleware.js
const errorHandler = (err, req, res, next) => {
    eventLogger(`${err.name}: ${err.message}\t${req.method}\t${req.method}\t${req.url}\t${req.headers.origin}`, 'errorLogs.log');
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    console.log(err.stack);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
}


module.exports = { notFound, errorHandler };
