import { httpClient } from 'api/httpClient';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

import { IContract, IContracts } from './types';

async function getContracts(): Promise<IContracts> {
  const { data } = await httpClient.get(`/contracts`);
  return data;
}

async function getContract(contractId: string): Promise<IContract> {
  const { data } = await httpClient.get(`/contract/${contractId}`);
  return data;
}

async function updateContract(updatedContract: IContract): Promise<IContract> {
  const { data } = await httpClient.put(
    `/contract/${updatedContract.contractId}`,
    updatedContract
  );

  return data;
}

export const useGetContracts = () => {
  return useQuery<IContracts, Error>(['contracts'], getContracts);
};

export const useGetContract = (contractId: string) => {
  return useQuery<IContract, Error>(['contract', contractId], () =>
    getContract(contractId)
  );
};

export const useUpdateContract = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(updateContract, {
    onSuccess: data => {
      toast.success('Contract was successfully update!');

      queryClient.invalidateQueries(['contracts']);
      queryClient.setQueryData(['contract', data.contractId], data);
    },
    onError: (e: { message: string }) => {
      toast.error(`Error! ${e.message}`, {
        position: toast.POSITION.TOP_CENTER,
      });
    },
  });

  return mutation;
};
