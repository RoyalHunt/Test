import { formatContractFromApi, formatContractToApi } from './utils';

describe('Contract utils', () => {
  const contract = {
    company: 'Marius Bodvin A/S',
    contractId: '1234558',
    periodStart: '2019-06-01T01:01:00.000Z',
    periodEnd: '2020-06-01T01:01:00.000Z',
    scheduledForRenewal: true,
    negotiationRenewalDate: '2020-05-01T01:01:00.000Z',
  };

  const formatedContract = {
    company: 'Marius Bodvin A/S',
    contractId: '1234558',
    periodStart: 'Jun 01 2019, 04:01',
    periodEnd: 'Jun 01 2020, 04:01',
    scheduledForRenewal: 'Yes',
    negotiationRenewalDate: 'May 01 2020, 04:01',
  };

  it('formatContractFromApi return correct data', async () => {
    expect(formatContractFromApi(contract)).toEqual(formatedContract);
  });

  it('formatContractToApi return correct data', async () => {
    expect(formatContractToApi(formatedContract)).toEqual(contract);
  });
});
