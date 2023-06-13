const errorhandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;

    res.status(statusCode);
    re.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });

}


module.exports = { errorhandler}
