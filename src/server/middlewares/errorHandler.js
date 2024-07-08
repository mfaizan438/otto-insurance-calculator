/**
 * Middleware to handle errors across the application.
 * This function standardizes the error response format and can be customized to hide
 * sensitive error stack information in production environments.
 *
 * @param {Error} err - The error object that was thrown.
 * @param {Request} _req - The request object. Not used in this middleware, hence prefixed with an underscore.
 * @param {Response} res - The response object. Used to send the error response to the client.
 * @param {NextFunction} _next - The next middleware function in the stack. Not used in this middleware, hence prefixed with an underscore.
 * @returns {Response} The error response sent to the client with a status code and message.
 */
function errorHandler(err, _req, res, _next) {
    const status = err.status || 500; // Default to 500 if no error status is provided
    const response = {
        message: err.message, // Send the error message in the response
    };

    // Include the error stack in the response if not in production environment for debugging purposes
    if (process.env.NODE_ENV !== 'production') {
        response.stack = err.stack;
    }

    // Send the error response with the appropriate status code
    return res.status(status).json(response);
}

module.exports = errorHandler;
