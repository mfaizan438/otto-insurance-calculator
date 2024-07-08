const cors = require('cors');

// Split the CORS_URL environment variable by comma to support multiple URLs
const corsUrl = process.env.CORS_URL.split(", ");

/**
 * CORS options configuration.
 *
 * Defines the CORS policy for the application, including:
 * - The allowed origins based on the CORS_URL environment variable.
 * - Supported HTTP methods.
 * - Allowed headers in requests.
 * - Status code to return on a successful OPTIONS request.
 */
const corsOptions = {
    /**
     * Determines if the request's origin is allowed.
     *
     * @param {string} origin - The origin of the request.
     * @param {function} callback - A callback function to return the result.
     *                              The first parameter is an error object, if any,
     *                              and the second is a boolean indicating whether the origin is allowed.
     */
    origin: function (origin, callback) {
        if (corsUrl.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            console.log("-- incoming request origin", origin);
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: 'POST,GET,OPTIONS,PATCH, DELETE', // Specifies the methods allowed when accessing the resource.
    allowedHeaders: ['Content-Type', 'Authorization', 'token'], // Specifies the headers allowed in the actual request.
    optionsSuccessStatus: 200 // Status code to send on a successful OPTIONS request.
};

// Export the configured CORS middleware
module.exports = cors(corsOptions);
