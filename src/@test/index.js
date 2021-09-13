import {
  render as rtlRender,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AppProviders, { queryClient } from 'AppProviders';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

const render = (
  ui,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
    state = {},
    ...renderOptions
  } = {}
) => {
  if (state) {
    history.replace(route, state);
  }

  const returnValue = {
    ...rtlRender(<Router history={history}>{ui}</Router>, {
      wrapper: AppProviders,
      ...renderOptions,
    }),
    history,
  };

  expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument();

  return returnValue;
};

const waitForLoadingToFinish = () =>
  waitForElementToBeRemoved(
    () => [
      ...screen.queryAllByLabelText(/loading/i),
      ...screen.queryAllByText(/loading/i),
    ],
    { timeout: 2000 }
  );

afterEach(() => {
  queryClient.clear();
});

export * from '@testing-library/react';
export { render, userEvent, waitForLoadingToFinish };
