const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const configJson = require('../config/config');

// Base name of the current file for filtering purposes
const basename = path.basename(__filename);
// Environment variable to determine the current environment (development, test, production)
const env = process.env.NODE_ENV || 'development';

// Configuration settings for the current environment
const config = configJson[env];

let sequelize;
const db = {};

// Initialize Sequelize based on environment variables or configuration
if (process.env.DATABASE_URL) {
  // Configuration for using a single database URL
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'mysql',
    logging: false,
    pool: {
      max: 20,
      min: 0,
      acquire: 60000,
      idle: 10000,
      evict: 60000
    }
  });
} else {
  // Configuration for using separate database credentials
  sequelize = new Sequelize(config.database, config.username, config.password, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false,
    pool: {
      max: 20,
      min: 0,
      acquire: 60000,
      idle: 10000,
      evict: 60000
    }
  });
}

// Read all model files from the current directory, initialize them, and add to the db object
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

// If models have associations, set them up here
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Assign the sequelize instances and the Sequelize library to the db object
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Synchronize all models with the database
sequelize
  .sync({ alter: false })
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

// Export the db object containing all models
module.exports = db;
