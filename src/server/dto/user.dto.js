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
        errorMessage: 'Valid email is required.',
    },
    phone: {
        in: ['body'],
        isInt: true,
        notEmpty: true,
        errorMessage: 'Phone number is required and should be an integer.',
    },
});

const updateUserSchema = checkSchema({
    first_name: {
        in: ['body'],
        optional: true,
        isString: true,
        isLength: {
            options: { max: 30 },
        },
    },
    last_name: {
        in: ['body'],
        optional: true,
        isString: true,
        isLength: {
            options: { max: 30 },
        },
    },
    email: {
        in: ['body'],
        optional: true,
        isEmail: true,
    },
    phone: {
        in: ['body'],
        optional: true,
        isInt: true,
    },
});

module.exports = {
    createUserSchema,
    updateUserSchema,
};
