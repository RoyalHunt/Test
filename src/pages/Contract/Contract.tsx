import React, { useEffect, useState, SyntheticEvent } from 'react';
import { styled } from '@linaria/react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import { useGetContract, useUpdateContract } from '@modules/contracts/queries';
import {
  formatContractFromApi,
  formatContractToApi,
} from '@modules/contracts/utils';
import { IFormatedContract } from '@modules/contracts/types';
import { Link } from 'react-router-dom';
import R from 'router/routes';

type ContractRouteParams = {
  contractId: string;
};

const Contract: React.FC = () => {
  const { contractId } = useParams<ContractRouteParams>();
  const { isLoading, error, data } = useGetContract(contractId);
  const { mutate: updateContract } = useUpdateContract();

  const { reset, register, handleSubmit } = useForm();

  const [isEditable, setIsEditable] = useState(false);
  const turnOnEditableMode = (e: SyntheticEvent) => {
    e.preventDefault();
    setIsEditable(true);
  };
  const turnOffEditableMode = () => setIsEditable(false);

  const onSubmit = (updatedContract: IFormatedContract) => {
    turnOffEditableMode();
    updateContract(formatContractToApi(updatedContract));
  };

  useEffect(() => {
    if (data) {
      reset(formatContractFromApi(data));
    }
  }, [data, reset]);

  if (isLoading) {
    return <p>Loading..</p>;
  }

  return (
    <Wrapper>
      <Container>
        <Link to={R.HOME}>Go Back</Link>
        {error && <p>Error occurred!</p>}
        <Title>Contract #{contractId}</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="company">Company:</label>
          <input
            required
            disabled={!isEditable}
            type="text"
            placeholder="Coca Cola"
            {...register('company')}
          />

          <label htmlFor="periodStart">Period start:</label>
          <input
            required
            disabled={!isEditable}
            type="datetime"
            {...register('periodStart')}
          />

          <label htmlFor="periodEnd">Period end:</label>
          <input
            required
            disabled={!isEditable}
            type="datetime"
            {...register('periodEnd')}
          />

          <label htmlFor="scheduledForRenewal">Scheduled for renewal:</label>
          <select disabled={!isEditable} {...register('scheduledForRenewal')}>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>

          <label htmlFor="negotiationRenewalDate">
            Negotiation renewal date:
          </label>
          <input
            required
            disabled={!isEditable}
            type="datetime"
            {...register('negotiationRenewalDate')}
          />

          {isEditable ? (
            <Button type="submit">Submit</Button>
          ) : (
            <Button type="button" onClick={turnOnEditableMode}>
              Edit
            </Button>
          )}
        </Form>
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
  text-align: center;

  @media only screen and (min-width: 1200px) {
    font-size: 3rem;
    margin-bottom: 40px;
  }
`;

const Form = styled('form')`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-auto-rows: minmax(32px, min-content);
  row-gap: 20px;

  label {
    align-self: center;
  }

  input,
  select {
    font-size: 16px;
  }

  input:disabled,
  select:disabled {
    border: none;
    appearance: none;
    background-color: transparent;
    color: currentColor;
    opacity: 1;
  }
`;

const Button = styled('button')`
  grid-column: 2;
  justify-self: start;
  background-color: var(--charcoal);
  appearance: none;
  border: 0;
  border-radius: 8px;
  color: var(--white);
  padding: 0.7em 1.2em;
  font-size: 1rem;
  text-decoration: none;
  transition: 0.3s ease-out;

  &:hover {
    background-color: hsl(197, 37%, 40%);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 4px #cbd6ee;
  }
`;

export default Contract;
