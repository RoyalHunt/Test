import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { css } from '@linaria/core';

import R from './routes';

const Page404 = React.lazy(() => import('../pages/Page404/Page404'));
const Contracts = React.lazy(() => import('../pages/Contracts/Contracts'));
const Contract = React.lazy(() => import('../pages/Contract/Contract'));

const routes = [
  {
    path: R.HOME,
    component: () => <Redirect to={R.CONTRACTS} />,
    exact: true,
  },
  {
    path: R.CONTRACTS,
    component: Contracts,
    exact: true,
  },
  {
    path: R.CONTRACT,
    component: Contract,
    exact: true,
  },
  {
    path: R.NOT_FOUND_404,
    component: Page404,
  },
];

const AppRouter: React.FC = () => {
  return (
    <React.Suspense fallback={'Loading...'}>
      <div className={theme}>
        <Switch>
          {routes.map(route => (
            <Route key={route.path} {...route} />
          ))}
          <Route path="*" component={Page404} />
        </Switch>
      </div>
    </React.Suspense>
  );
};

const theme = css`
  --vivid: hsl(48, 100%, 57%);
  --charcoal: hsl(197, 37%, 24%);
  --gray: hsl(0, 0%, 80%);
  --liteGray: hsl(0, 0%, 90%);
  --white: hsl(0, 0%, 100%);
  --black: hsl(0, 0%, 0%);
`;

export default AppRouter;
