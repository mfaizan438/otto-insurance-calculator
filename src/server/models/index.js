import database from '../../core/models';

/**
 * Represents the model layer of the application, providing methods to interact with the database.
 */
class Model {
  /**
   * Retrieves Sequelize options from the database configuration.
   * @returns {object} The Sequelize configuration options.
   */
  sequelizeOptions() {
    return database.Sequelize;
  }

  /**
   * Accesses the users table in the database.
   * @returns {Model} The Sequelize model for the users table.
   */
  users() {
    return database.users;
  }

  /**
   * Retrieves the Sequelize instance to perform raw queries.
   * @returns {object} The Sequelize instance.
   */
  sequelizeQuery() {
    return database.sequelize;
  }
}

export default Model;
