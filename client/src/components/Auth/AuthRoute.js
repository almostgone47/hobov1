import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { getAuthToken } from '../../helpers/AuthToken';

const AuthRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        getAuthToken() ? (
          <Component {...rest} {...props} />
        ) : (
          <Redirect to={{ pathname: '/login' }} />
        )
      }
    />
  );
};

export default AuthRoute;
