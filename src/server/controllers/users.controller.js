import { API_RESPONSES } from "../utils/constants";
const axios = require('axios');
import UserService from "../services/user.service";

class UserController {

  // create a private data member service named userService

  constructor(userService) {
    this.userService = userService;
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
      const user = await this.userService.create(req.body);
      return res.status(201).json(user);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  /**
 * 
 * @param {*} req Request
 * @param {*} res Response
 * @description Submit user ID and desired start date, get user data, and send a POST request to a third-party URL
 * @returns Response from third-party API
 */
  async submit(req, res) {
    const url = "https://laas-dev.spvie.com/api/Projects";
    const requestHeader = {
      'Authorization-Broker-Code': '60169',
      'Authorization-Broker-Token': '30d2a5a5-a33b-4ad0-8ce0-009b669a56d7'
    };

    try {
      const { user_id, desired_start_date } = req.body;
      const user = await this.userService.findUserById(user_id);

      if (!user) {
        return res.status(404).json({ error: API_RESPONSES.USER_NOT_FOUND });
      }

      const response = await axios.post(url, {
        EffectDate: desired_start_date,
        Client: {
          Email: user.email,
          Phone: user.phone,
          FirstName: user.first_name,
          LastName: user.last_name,
        },
      }, {
        headers: requestHeader
      });

      return res.status(200).json(response.data);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}

export default UserController;
