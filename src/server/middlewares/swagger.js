const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../../../swagger.json'); // adjust the path as needed

function swaggerMiddleware(req, res, next) {
    swaggerDocument.host = req.get('host');
    swaggerDocument.schemes = [req.protocol];
    swaggerUi.setup(swaggerDocument)(req, res, next);
}

module.exports = {
    serve: swaggerUi.serve,
    setup: swaggerMiddleware
};