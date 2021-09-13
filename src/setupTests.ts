import 'regenerator-runtime/runtime';
import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';
import { server } from 'mocks/server';

// speeds up *ByRole queries a bit
// https://github.com/testing-library/dom-testing-library/issues/552
configure({ defaultHidden: true });

// make debug output for TestingLibrary Errors larger
process.env.DEBUG_PRINT_LIMIT = '15000';

// enable API mocking in test runs using the same request handlers
// as for the client-side mocking.
beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' });
});

afterAll(() => server.close());
afterEach(() => {
  server.resetHandlers();
});
