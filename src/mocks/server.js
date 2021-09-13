import { setupServer } from 'msw/node';

import restHandlers from './restHandlers';

const server = setupServer(...restHandlers);

export * from 'msw';
export { server };
