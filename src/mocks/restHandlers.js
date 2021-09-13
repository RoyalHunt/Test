import { rest } from 'msw';
import keyBy from 'lodash/keyBy';

const contracts = [
  {
    company: 'Marius Bodvin A/S',
    contractId: '1234558',
    periodStart: '2019-06-01T01:01:00Z',
    periodEnd: '2020-06-01T01:01:00Z',
    scheduledForRenewal: true,
    negotiationRenewalDate: '2020-05-01T01:01:00',
  },
  {
    company: 'Tarjei Romtveit A/S',
    contractId: '12345589',
    periodStart: '2018-06-01T01:01:00Z',
    periodEnd: '2021-07-01T01:01:00Z',
    scheduledForRenewal: true,
    negotiationRenewalDate: '2021-07-01T01:01:00',
  },
];

const contractsObj = keyBy(contracts, 'contractId');

const handlers = [
  rest.get(`*/contracts`, async (_, res, ctx) => {
    return res(ctx.json(Object.values(contractsObj)));
  }),

  rest.get(`*/contract/:contractId`, async (req, res, ctx) => {
    const { contractId } = req.params;

    return res(ctx.json(contractsObj[contractId]));
  }),

  rest.put('*/contract/:contractId', (req, res, ctx) => {
    const { params, body: newContract } = req;
    const { contractId } = params;

    contractsObj[contractId] = newContract;

    return res(ctx.json(newContract));
  }),
];
export default handlers;
