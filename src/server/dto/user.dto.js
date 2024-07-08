const { checkSchema } = require('express-validator');

/**
 * Schema for validating the creation of a new user.
 * Validates and sanitizes input fields from the request body.
 */
const createUserSchema = checkSchema({
    first_name: {
        in: ['body'], // Specifies the location of the field in the request.
        isString: true, // Validates that the field is a string.
        notEmpty: true, // Ensures the field is not empty.
        isLength: {
            options: { max: 30 }, // Limits the field length to a maximum of 30 characters.
        },
        errorMessage: 'First name is required and should be a string with a maximum length of 30 characters.', // Custom error message.
    },
    last_name: {
        in: ['body'],
        isString: true,
        notEmpty: true,
        isLength: {
            options: { max: 30 },
        },
        errorMessage: 'Last name is required and should be a string with a maximum length of 30 characters.',
    },
    email: {
        in: ['body'],
        isEmail: true, // Validates that the field is a valid email address.
        notEmpty: true,
        errorMessage: 'Valid email is required. e.g. john.doe@example.com',
    },
    phone: {
        in: ['body'],
        isInt: true, // Validates that the field is an integer.
        notEmpty: true,
        errorMessage: 'Phone number is required and should be an integer.',
    },
});

/**
 * Schema for validating the start date for a user.
 * Custom validation is used to ensure the date format is correct.
 */
const checkStartDateSchema = checkSchema({
    user_id: {
        in: ['body'],
        isInt: true,
        notEmpty: true,
        errorMessage: 'User ID is required and should be an integer.',
    },
    desired_start_date: {
        in: ['body'],
        custom: {
            options: (value, { req }) => {
                return /^(\d{4})-(\d{2})-(\d{2})$/.test(value); // Custom validator to check for YYYY-MM-DD format.
            }
        },
        notEmpty: true,
        errorMessage: 'Desired start date is required and should be a valid date. e.g. 2024-07-10',
    },
});

module.exports = {
    createUserSchema,
    checkStartDateSchema
};
