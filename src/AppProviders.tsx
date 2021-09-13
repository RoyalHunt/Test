import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter } from 'react-router-dom';

interface HttpErrorResponse {
  error: string;
  message: string;
  statusCode: number;
}

class HttpError extends Error {
  public response: HttpErrorResponse;

  constructor(response: HttpErrorResponse) {
    super(response.message);

    this.response = response;
  }
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      useErrorBoundary: true,
      refetchOnWindowFocus: false,

      retry: (failureCount: number, error: unknown) => {
        if ((error as HttpError).response.statusCode === 404) return false;
        else if (failureCount < 2) return true;
        else return false;
      },
    },
  },
});

type Props = {
  children: React.ReactNode;
};

const AppProviders: React.FC<Props> = ({ children }) => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default AppProviders;
