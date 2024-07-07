function errorHandler(err, _req, res, _next) {
    const status = err.status || 500;
    const response = {
        message: err.message,
    };

    if (process.env.NODE_ENV !== 'production') {
        response.stack = err.stack;
    }

    return res.status(status).json(response);
}

module.exports = errorHandler;