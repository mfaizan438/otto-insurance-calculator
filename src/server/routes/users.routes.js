import { Router } from 'express';
import UserService from '../services/user.service';
const validate = require('../middlewares/validationMiddleware');
const { createUserSchema, checkStartDateSchema } = require('../dto/user.dto');
import UserController from '../controllers/users.controller'
import db from "../../core/models/index"
class UserRoutes {
  constructor() {
    this.router = Router();
    const userService = new UserService(db.users);
    this.userController = new UserController(userService);
  }
  route() {
    return [
      // this.router.post('/users', validate(createUserSchema), this.userController.create),
      this.router.post('/users', validate(createUserSchema), this.userController.create.bind(this.userController)),
      this.router.post('/submit', validate(checkStartDateSchema), this.userController.submit.bind(this.userController)),
    ];
  }
}

export default UserRoutes;
