import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getAuthToken } from '../../helpers/AuthToken';


const AuthRoute = ({component: Component, ...rest}) => {
    console.log('AUTHROUTE is there a token??? : ', getAuthToken())

  return (
    <Route {...rest} render={(props) => getAuthToken() ?
       <Component {...rest} {...props}/> : <Redirect to={{pathname: '/login'}} />  } />
  )
}

export default AuthRoute;