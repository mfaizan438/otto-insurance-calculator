import { Router } from 'express';
const validate = require('../middlewares/validationMiddleware');
const { createUserSchema } = require('../dto/user.dto');
import Controller from '../controllers/default.controller';
class UserRoutes extends Controller {
  constructor() {
    super();
    this.router = Router();
  }
  route() {
    return [
      this.router.post('/users', validate(createUserSchema), super.userController().create),

    ];
  }
}

export default UserRoutes;
