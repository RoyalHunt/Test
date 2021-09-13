import React from 'react';
import {
  render,
  screen,
  waitForLoadingToFinish,
  cleanup,
  userEvent,
} from '@test';
import { server } from 'mocks/server';
import { rest } from 'msw';
import { buildContract } from '@test/generateMocks';
import faker from 'faker';

import Contracts from './Contracts';

describe('Contracts', () => {
  afterEach(cleanup);

  it('renders required amount of rows', async () => {
    render(<Contracts />);

    await waitForLoadingToFinish();

    const tableRows = screen.getAllByTestId(/table.row-\d$/i);

    expect(tableRows).toHaveLength(2);
  });

  it('renders required amount of rows2', async () => {
    server.use(
      rest.get(`*/contracts`, async (req, res, ctx) => {
        return res(ctx.json(new Array(10).fill(null).map(buildContract)));
      })
    );

    render(<Contracts />);

    await waitForLoadingToFinish();

    const tableRows = screen.getAllByTestId(/table.row-\d$/i);

    expect(tableRows).toHaveLength(10);
  });

  it('redirect to contract/:contractId page on view button click', async () => {
    const contractId = faker.datatype.uuid();

    server.use(
      rest.get(`*/contracts`, async (req, res, ctx) => {
        return res(
          ctx.json([
            buildContract({ contractId }),
            buildContract(),
            buildContract(),
          ])
        );
      })
    );

    const { history } = render(<Contracts />, {
      route: `/contracts`,
    });

    await waitForLoadingToFinish();

    const viewContractButtons = screen.getAllByTestId(
      /viewContractButton-\d$/i
    );

    expect(viewContractButtons).toHaveLength(3);

    await userEvent.click(viewContractButtons[0]);

    expect(history.location.pathname).toEqual(`/contract/${contractId}`);
  });
});
