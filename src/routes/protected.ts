import { Elysia } from 'elysia';

import authController from '@/controllers/auth';
import userRoutes from '@/routes/user';
import authRoutes from '@/routes/auth';

export default (app: Elysia) =>
  app
    .group('/api', (app) => 
        app
        .use(authRoutes)
        .use(userRoutes)
    )
    .post('/logout', authController.logout);
