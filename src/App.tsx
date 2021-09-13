import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AppRouter from './router/AppRouter';
import AppProviders from './AppProviders';

type ErrorFallbackArgs = {
  error: {
    message: string;
  };
  resetErrorBoundary: () => void;
};

function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackArgs) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

const App: React.FC = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <AppProviders>
        <AppRouter />
      </AppProviders>
      <ToastContainer />
    </ErrorBoundary>
  );
};

export default App;

export { globals } from 'styles/global';
