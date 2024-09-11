import type { Elysia } from 'elysia';

const test = (app: Elysia) => app.group('test', (app) => app.get('/', () => 'hello test'));

export default test;
