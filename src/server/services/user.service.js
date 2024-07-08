import Model from '../models/index';
import { encrypt, decrypt } from '../utils/crypto';
class UserService extends Model {
  constructor() {
    super();
    this.users = super.users();
  }
  async create(user) {
    const existingUser = await this.users.findOne({ where: { email: user.email } });
    if (existingUser) {
      throw new Error('User with this email already exists');
    }
    // Encrypt the phone_number field
    if (user.phone) {
      user.phone = encrypt(user.phone);
    }

    return await this.users.create(user);
  }

  async findUserById(id) {
    const user = await this.users.findOne({ where: { id } });

    // Decrypt the phone_number field
    if (user && user.phone) {
      user.phone = decrypt(user.phone);
    }

    return user;
  }
}

export default UserService;
