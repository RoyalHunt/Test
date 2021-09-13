export interface IContract {
  company: string;
  contractId: string;
  periodStart: string;
  periodEnd: string;
  scheduledForRenewal: boolean;
  negotiationRenewalDate: string;
}

export type IContracts = IContract[];

export type IFormatedContract = Omit<IContract, 'scheduledForRenewal'> & {
  scheduledForRenewal: string;
};
