import React from 'react';
import PropTypes from 'prop-types';

export const defaults = {
  mainColor: '',
  accentColor: '',
  logoUrl: '',
  fontFamily: '',
  baseFontSize: '16px',
};

export const ThemeContext = React.createContext(defaults);

export default function ThemeProvider({ children, ...overides }) {
  return (
    <ThemeContext.Provider value={{ ...defaults, ...overides }}>
      {children}
    </ThemeContext.Provider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
};


export const ThemeConsumer = ThemeContext.Consumer;
