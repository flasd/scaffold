import React from 'react';
import { ThemeConsumer } from '../../Providers/ThemeProvider';

export default function withTheme(overides) {
  return function middleware(UserComponent) {
    function themeConsumer(props) {
      return (
        <ThemeConsumer>
          {value => <UserComponent {...props} {...value} {...overides} />}
        </ThemeConsumer>
      );
    }

    themeConsumer.displayName = `withTheme(${UserComponent.displayName})`;

    return themeConsumer;
  };
}
