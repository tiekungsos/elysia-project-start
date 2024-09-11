import { Elysia, t } from 'elysia';

import UserController from '@/controllers/user';
import authPlugin from '@/plugins/authenticate';
export default (app: Elysia) => app.group('/user', (app) => app.use(auth).use(no_auth));

const auth = new Elysia()
  .use(authPlugin)
  .get('/me', UserController.me)
  .get('/users/:id', UserController.fetchOne)
  .post('/users', UserController.create, {
    body: t.Object({
      name: t.String({ minLength: 1, maxLength: 256 }),
      email: t.String({ format: 'email', maxLength: 256 }),
      password: t.String({ minLength: 8, maxLength: 256 })
    })
  });

const no_auth = new Elysia().get('/users', UserController.fetchAll);
