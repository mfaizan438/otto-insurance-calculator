import { Router } from 'express';
import UserService from '../services/user.service';
const validate = require('../middlewares/validationMiddleware');
const { createUserSchema, checkStartDateSchema } = require('../dto/user.dto');
import UserController from '../controllers/users.controller'
import db from "../../core/models/index"
class UserRoutes {
  constructor() {
    this.router = Router();

    // In the provided code, we have implemented Dependency Injection by passing the UserService instance to the UserController. 
    // This approach allows us to easily mock or swap out the UserService during testing, leading to more effective and isolated unit tests for both services and controllers.
    const userService = new UserService(db.users);
    this.userController = new UserController(userService);
  }
  route() {
    return [
      this.router.post('/users', validate(createUserSchema), this.userController.create.bind(this.userController)),
      this.router.post('/submit', validate(checkStartDateSchema), this.userController.submit.bind(this.userController)),
    ];
  }
}

export default UserRoutes;
