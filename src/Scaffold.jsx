import React from 'react';
import PropTypes from 'prop-types';
import { Router } from 'react-router-dom';
import ThemeProvider from './Providers/ThemeProvider';
import AuthProvider from './Providers/AuthProvider';
import history from './Services/history';

export default function Scaffold({ children }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router history={history}>{children}</Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

Scaffold.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
};
