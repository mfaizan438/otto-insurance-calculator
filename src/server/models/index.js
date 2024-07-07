import database from '../../core/models';

class Model {
  /**
   * @description Sequelize
   */
  sequelizeOptions() {
    return database.Sequelize;
  }
  users() {
    return database.users;
  }
  sequelizeQuery() {
    return database.sequelize;
  }

}

export default Model;
