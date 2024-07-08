// Load environment variables from .env file
require('dotenv').config();

/**
 * Configuration object for the application's development environment.
 * Utilizes environment variables for database connection settings.
 *
 * @type {Object}
 */
module.exports = {
  development: {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false,
  }
};
