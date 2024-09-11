import { Context } from 'elysia';

import { ContextWithUser } from '@/domain/types/extends/ContextWithUser';
import SuccessResponse from '@/domain/types/generics/SuccessResponse';
import LoggedInUser from '@/domain/types/LoggedInUser';
import type { User } from '@/models/User';
import UserService from '@/services/user';

class UserController {
  // Handle fetching the logged-in user's details
  async me(context: ContextWithUser): Promise<SuccessResponse<LoggedInUser>> {
    return {
      message: 'User details fetched successfully!',
      data: context.user
    };
  }

  // Handle user creation
  async create(context: Context): Promise<SuccessResponse<User>> {
    const body = context.body as User;

    const data = await UserService.create(body);

    return {
      data,
      message: 'User created successfully.'
    };
  }

  // Fetch all users
  async fetchAll(): Promise<SuccessResponse<User[]>> {
    const users = await UserService.fetchAll();

    return {
      message: 'Users fetched successfully.',
      data: users
    };
  }

  // Fetch a single user by ID
  async fetchOne(context: Context): Promise<SuccessResponse<User>> {
    const { id } = context.params;
    const user = await UserService.fetchById(id);

    return {
      message: 'User fetched successfully.',
      data: user
    };
  }
}

export default new UserController();
