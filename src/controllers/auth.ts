import { Context } from 'elysia';

import { ContextWithJWT } from '@/domain/types/extends/ContextWithJWT';
import SuccessResponse from '@/domain/types/generics/SuccessResponse';
import { User } from '@/models/User';
import AuthService from '@/services/auth';
import UserService from '@/services/user';

class AuthController {
  // Handle user signup
  async signup(context: Context): Promise<SuccessResponse<User>> {
    const payload = context.body as User;

    await UserService.create(payload);

    return {
      message: 'Signup successful!'
    };
  }

  // Handle user login
  async login(context: ContextWithJWT): Promise<SuccessResponse<string>> {
    const payload = context.body as { email: string; password: string };

    const user = await AuthService.signIn(payload);
    const token = await context.jwt.sign({ id: user.id });

    return {
      message: 'User logged in successfully!',
      data: token
    };
  }

  // Handle user logout
  async logout(): Promise<SuccessResponse<string>> {
    return {
      message: 'User logged out successfully!'
    };
  }
}

export default new AuthController();
