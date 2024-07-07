const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const configJson = require('../config/config');

const basename = path.basename(__filename);
const env = process.env.NODE_ENV;

const config = configJson[env];

let sequelize;
const db = {};
if (process.env.DATABASE_URL) {
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

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

sequelize
  .sync({ alter: false })
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = db;
