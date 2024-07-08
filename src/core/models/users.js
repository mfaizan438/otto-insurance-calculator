const { Model } = require('sequelize');

/**
 * Defines the User model with fields and validations.
 *
 * @param {object} sequelize - The Sequelize instance.
 * @param {object} DataTypes - The data types for model properties.
 * @returns {class} The User model class.
 */
module.exports = (sequelize, DataTypes) => {

  /**
   * User model class extending Sequelize Model.
   */
  class User extends Model { }

  // Initialize model with schema definition.
  User.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true, // Validates the email format.
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'users',
    timestamps: true, // Enables automatic creation of createdAt and updatedAt fields.
  });
  return User;
};
