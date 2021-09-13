import { formatDate, formatISO } from 'utils/dateUtils';

import { IContract, IFormatedContract } from './types';

export function formatContractFromApi(
  contract: IContract
): IFormatedContract | undefined {
  if (!contract) {
    return;
  }

  return {
    ...contract,
    periodStart: formatDate(contract.periodStart),
    periodEnd: formatDate(contract.periodEnd),
    scheduledForRenewal: contract.scheduledForRenewal ? 'Yes' : 'No',
    negotiationRenewalDate: formatDate(contract.negotiationRenewalDate),
  };
}

export function formatContractToApi(contract: IFormatedContract): IContract {
  return {
    ...contract,
    periodStart: formatISO(contract.periodStart),
    periodEnd: formatISO(contract.periodEnd),
    scheduledForRenewal: contract.scheduledForRenewal === 'Yes' ? true : false,
    negotiationRenewalDate: formatISO(contract.negotiationRenewalDate),
  };
}
