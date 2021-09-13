import React from 'react';
import { styled } from '@linaria/react';
import { useGetContracts } from '@modules/contracts/queries';
import { formatContractFromApi } from '@modules/contracts/utils';
import { IContract } from '@modules/contracts/types';
import Table from '@shared/Table/Table';
import { Link } from 'react-router-dom';
import type { Cell } from 'react-table';

const Contracts: React.FC = () => {
  const { isLoading, error, data } = useGetContracts();

  const columns = React.useMemo(
    () => [
      {
        Header: 'Actions',
        Cell: (cell: Cell<IContract>) => (
          <LinkTo
            to={`/contract/${cell.row.original.contractId}`}
            data-testid={`viewContractButton-${cell.row.index}`}
          >
            <svg viewBox="-27 0 512 512" xmlns="http://www.w3.org/2000/svg">
              <path d="M188 492a20 20 0 0 1-20 20H80c-44.11 0-80-35.89-80-80V80C0 35.89 35.89 0 80 0h245.9c44.1 0 80 35.89 80 80v191a20 20 0 0 1-40 0V80c0-22.05-17.95-40-40-40H80c-22.05 0-40 17.95-40 40v352c0 22.05 17.95 40 40 40h88a20 20 0 0 1 20 20zm117.9-372h-206a20 20 0 1 0 0 40h206a20 20 0 0 0 0-40zm20 100a20 20 0 0 0-20-20h-206a20 20 0 1 0 0 40h206a20 20 0 0 0 20-20zm-226 60a20 20 0 1 0 0 40H205a20 20 0 1 0 0-40zm355.46 146.5c-.7 1-3.11 4.41-4.6 6.3-6.7 8.42-22.39 28.15-44.2 45.56C378.59 500.68 349.8 512 321 512s-57.59-11.32-85.56-33.64c-21.81-17.41-37.5-37.14-44.19-45.56-1.5-1.89-3.91-5.3-4.61-6.3a20 20 0 0 1 0-23c.7-1 3.11-4.41 4.61-6.3 6.7-8.42 22.38-28.15 44.2-45.56C263.4 329.32 292.2 318 321 318s57.59 11.32 85.56 33.64c21.81 17.41 37.5 37.14 44.19 45.56 1.5 1.89 3.91 5.3 4.61 6.3a20 20 0 0 1 0 23zM413.64 415c-31.8-37.83-62.93-57-92.64-57-29.7 0-60.84 19.16-92.64 57 31.8 37.83 62.93 57 92.64 57s60.84-19.16 92.64-57zM322 377a38 38 0 1 0 0 76 38 38 0 0 0 0-76zm0 0" />
            </svg>
          </LinkTo>
        ),
      },
      {
        Header: 'Company Name',
        accessor: 'company',
      },
      {
        Header: 'Signed On',
        accessor: 'periodStart',
      },
      {
        Header: 'Valid Until',
        accessor: 'periodEnd',
      },
      {
        Header: 'Scheduled For Renewal',
        accessor: 'scheduledForRenewal',
      },
      {
        Header: 'Negotiation Renewal Date',
        accessor: 'negotiationRenewalDate',
      },
    ],
    []
  );

  const tableData = React.useMemo(() => {
    if (!data) {
      return [];
    }

    return data.map(formatContractFromApi);
  }, [data]);

  if (isLoading) {
    return <p>Loading..</p>;
  }

  return (
    <Wrapper>
      <Container>
        {error && <p>Error occurred!</p>}
        <Title>Contracts</Title>
        <Table columns={columns} data={tableData} />
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled('div')`
  padding: 32px 0;
  background-color: var(--pale);

  @media only screen and (min-width: 1200px) {
    padding: 48px 0;
  }
`;

const Container = styled('div')`
  margin: 0 24px;

  @media only screen and (min-width: 1200px) {
    max-width: 1280px;
    margin: 0 auto;
  }
`;

const Title = styled('h1')`
  font-size: 2rem;

  @media only screen and (min-width: 1200px) {
    font-size: 3rem;
    margin-bottom: 40px;
  }
`;

const LinkTo = styled(Link)`
  display: block;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  padding: 8px;
  color: var(--black);

  &:hover {
    background-color: var(--liteGray);
  }
`;

export default Contracts;
