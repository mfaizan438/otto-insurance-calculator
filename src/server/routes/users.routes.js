import { Router } from 'express';
import UserService from '../services/user.service';
const validate = require('../middlewares/validationMiddleware');
const { createUserSchema, checkStartDateSchema } = require('../dto/user.dto');
import UserController from '../controllers/users.controller'
import db from "../../core/models/index"

/**
 * Defines the routes related to user operations.
 * This class encapsulates the routing logic, including the definition of routes,
 * application of middleware for validation, and delegation of request handling to the appropriate controller.
 */
class UserRoutes {
  /**
   * Initializes the UserRoutes instance.
   * Sets up the router and dependencies for user-related operations.
   */
  constructor() {
    this.router = Router();

    // Dependency Injection: UserService instance is created and injected into UserController.
    // This facilitates easier testing and flexibility in swapping service implementations.
    const userService = new UserService(db.users);
    this.userController = new UserController(userService);
  }

  /**
   * Configures and returns user-related routes.
   * Includes routes for creating a user and submitting data, with validation middleware applied.
   *
   * @returns {Array} An array of configured routes.
   */
  route() {
    return [
      // Route for creating a user. Applies validation middleware before handling by UserController.
      this.router.post('/users', validate(createUserSchema), this.userController.create.bind(this.userController)),

      // Route for submitting data. Applies validation middleware before handling by UserController.
      this.router.post('/submit', validate(checkStartDateSchema), this.userController.submit.bind(this.userController)),
    ];
  }
}

export default UserRoutes;
