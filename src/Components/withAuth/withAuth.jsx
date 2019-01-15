import React from 'react';
import { AuthConsumer } from '../../Providers/AuthProvider';

export default function withAuth(overides) {
  return function middleware(UserComponent) {
    function authConsumer(props) {
      return (
        <AuthConsumer>
          {value => <UserComponent {...props} {...value} {...overides} />}
        </AuthConsumer>
      );
    }

    authConsumer.displayName = `withAuth(${UserComponent.displayName})`;

    return authConsumer;
  };
}
