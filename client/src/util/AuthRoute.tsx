import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../context/auth';

function AuteRoute({ component: Component, ...rest }: any) {
  const { user } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(props: any) => (user ? <Redirect to="/" /> : <Component {...props} />)}
    />
  );
}

export default AuteRoute;
