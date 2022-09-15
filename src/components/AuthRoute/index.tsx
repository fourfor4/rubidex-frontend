import React from 'react';
import { Route, Navigate } from 'react-router';

const AuthRoute: React.FC<{ path: string; component: React.FC }> = ({
  path,
  component: Component,
  canActivate,
  ...rest
}: any) => {
  if (!canActivate && path !== '/login') {
    return <Navigate to="/login" replace />;
  }

  return <Route {...rest} render={(props: any) => <Component {...props} />} />;
};

export default AuthRoute;
