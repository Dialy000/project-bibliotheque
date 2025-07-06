import React from 'react';
import Login from './Login';

function PrivateRoute({ isAuth, onLogin, children }) {
  if (!isAuth) {
    return <Login onLogin={onLogin} />;
  }
  return children;
}

export default PrivateRoute;