import { encrypt, decrypt } from '../utils/crypto';

/**
 * Service class for user-related operations.
 * Provides methods to create a new user and find a user by ID, with encryption and decryption of sensitive data.
 */
class UserService {
  /**
   * Constructs a new instance of the UserService.
   * @param {Model} users - The Sequelize model representing users.
   */
  constructor(users) {
    this.users = users;
  }

  /**
   * Creates a new user after ensuring the email is not already in use.
   * Encrypts the user's phone number before saving.
   *
   * @param {Object} user - The user object to create. Must include an email and may include a phone number.
   * @returns {Promise<Object>} The created user object.
   * @throws {Error} If a user with the given email already exists.
   */
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

  /**
   * Finds a user by their ID and decrypts the phone number if present.
   *
   * @param {number} id - The ID of the user to find.
   * @returns {Promise<Object|null>} The found user object with decrypted phone number, or null if not found.
   */
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
