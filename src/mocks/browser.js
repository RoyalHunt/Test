import { setupWorker } from 'msw';

import restHandlers from './restHandlers';

export const worker = setupWorker(...restHandlers);
