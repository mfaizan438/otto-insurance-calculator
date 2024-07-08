const { checkSchema } = require('express-validator');

const createUserSchema = checkSchema({
    first_name: {
        in: ['body'],
        isString: true,
        notEmpty: true,
        isLength: {
            options: { max: 30 },
        },
        errorMessage: 'First name is required and should be a string with a maximum length of 30 characters.',
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
        isEmail: true,
        notEmpty: true,
        errorMessage: 'Valid email is required. e.g. john.doe@example.com',
    },
    phone: {
        in: ['body'],
        isInt: true,
        notEmpty: true,
        errorMessage: 'Phone number is required and should be an integer.',
    },
});

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
                return /^(\d{4})-(\d{2})-(\d{2})$/.test(value);
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
