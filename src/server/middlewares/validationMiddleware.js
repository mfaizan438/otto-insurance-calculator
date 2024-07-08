const { validationResult } = require('express-validator');

/**
 * Middleware factory to validate request bodies against a given schema.
 *
 * This function takes a validation schema and returns an array of middleware.
 * The first middleware in the array applies the schema to validate the request body.
 * The second middleware checks for validation errors and handles them appropriately,
 * either by proceeding to the next middleware in the stack or by sending an error response.
 *
 * @param {object} schema - The validation schema to apply to the request body.
 * @returns {Array<Function>} An array of middleware functions.
 */
const validate = (schema) => {
    return [
        schema,
        (req, res, next) => {
            try {
                // Extract validation errors from the request.
                const errors = validationResult(req);
                // If errors are found, return a 400 status with the errors.
                if (!errors.isEmpty()) {
                    return res.status(400).json({ errors: errors.array() });
                }
                // If no errors, proceed to the next middleware.
                next();
            } catch (err) {
                // Log the error and return a 500 status for internal server errors.
                console.error(err);
                res.status(500).json({ message: 'Internal server error' });
            }
        }
    ];
};

module.exports = validate;
