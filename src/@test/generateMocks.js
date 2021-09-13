import faker from 'faker';

export function buildContract(overrides) {
  const periodStart = faker.date.past();
  const periodEnd = faker.date.future();
  const negotiationRenewalDate = faker.date.between(periodStart, periodEnd);
  const scheduledForRenewal = faker.datatype.boolean();

  return {
    company: faker.company.companyName(),
    contractId: faker.datatype.uuid(),
    periodStart,
    periodEnd,
    scheduledForRenewal,
    negotiationRenewalDate,
    ...overrides,
  };
}
