const { validationResult } = require('express-validator');

const validate = (schema) => {
    return [
        schema,
        (req, res, next) => {
            try {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({ errors: errors.array() });
                }
                next();
            } catch (err) {
                console.error(err);
                res.status(500).json({ message: 'Internal server error' });
            }
        }
    ];
};

module.exports = validate;