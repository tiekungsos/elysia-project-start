import UnauthorizedError from '@/domain/exceptions/UnauthorizedError';
import { User } from '@/models/User';

class AuthService {
  /**
   * Signs in a user.
   *
   * @param {{ email: string; password: string }} payload - The user data to be signed in.
   * @param {string} payload.email - The email of the user.
   * @param {string} payload.password - The password of the user.
   * @returns {Promise<User>} A promise that resolves to the user that signed in.
   * @throws {UnauthorizedError} If the user is not found or if credentials are invalid.
   */
  async signIn(payload: { email: string; password: string }): Promise<User> {
    const user = await User.findOne({ email: payload.email });

    if (!user) {
      throw new UnauthorizedError('User not found!');
    }

    const isMatch = user.comparePassword(payload.password);

    if (!isMatch) {
      throw new UnauthorizedError('Invalid credentials!');
    }

    return user;
  }
}

export default new AuthService();
