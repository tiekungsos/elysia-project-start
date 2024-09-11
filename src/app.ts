import swagger from '@elysiajs/swagger';
import { Elysia } from 'elysia';

import config from './config';
import * as db from './config/db';
import errorPlugin from './plugins/error';
import loggerPlugin from './plugins/logger';
import securityPlugin from './plugins/security';
import protectedRoutes from './routes/protected';
import { serverTiming } from '@elysiajs/server-timing'
import cron from '@/cron/main'

export const app = new Elysia();

db.connect();

app
  .use(loggerPlugin)
  .use(serverTiming())
  .use(
    swagger({
      provider : 'swagger-ui',
      path: '/docs',
      documentation: {
        info: {
          title: 'Bun (🍔) API Starter Docs',
          version: config.app.version
        }
      }
    })
  )
  .use(securityPlugin)
  .use(errorPlugin)
  .use(cron)
  .get('/', () => ({
    name: config.app.name,
    version: config.app.version
  }))
  .use(protectedRoutes)
  .listen(config.app.port, () => {
    console.log(`Environment: ${config.app.env}`);
    console.log(`Bun (🍔) API Starter is running at ${app.server?.hostname}:${app.server?.port}`);
  });
