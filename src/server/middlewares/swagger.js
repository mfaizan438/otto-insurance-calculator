const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../../../swagger.json'); // adjust the path as needed

/**
 * Middleware to dynamically set the Swagger document's host and schemes based on the request.
 * This ensures that the Swagger UI reflects the correct host and scheme (http or https) for API calls.
 *
 * @param {Request} req - The request object, used to retrieve the current host and protocol.
 * @param {Response} res - The response object.
 * @param {Function} next - The next middleware function in the stack.
 */
function swaggerMiddleware(req, res, next) {
    swaggerDocument.host = req.get('host'); // Dynamically set the Swagger document's host to the current request's host
    swaggerDocument.schemes = [req.protocol]; // Dynamically set the Swagger document's scheme (http or https)
    swaggerUi.setup(swaggerDocument)(req, res, next); // Setup Swagger UI with the updated document
}

module.exports = {
    serve: swaggerUi.serve, // Middleware to serve the Swagger UI files
    setup: swaggerMiddleware // Middleware to setup Swagger UI with dynamic host and schemes
};
