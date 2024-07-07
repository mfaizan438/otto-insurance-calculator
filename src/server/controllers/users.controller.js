import Service from "../services/default.service";
import { API_RESPONSES } from "../utils/constants";

class UserController extends Service {
  constructor() {
    super();
    this.userService = super.userService();

  }

  /**
   * 
   * @param {*} req Request
   * @param {*} res Response
   * @description Create a new user
   * @returns Created user object
   */
  async create(req, res) {
    try {
      const userService = super.userService();
      const user = await userService.create(req.body);
      return res.status(201).json(user);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  /**
   * 
   * @param {*} req Request
   * @param {*} res Response
   * @description Find a user by ID
   * @returns User object if found
   */
  async findOne(req, res) {
    try {
      const { id } = req.params;
      const user = await this.userService.findOne(id);
      if (!user) {
        return res.status(404).json({ message: API_RESPONSES.USER_NOT_FOUND });
      }
      return res.status(200).json(user);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}

export default UserController;
