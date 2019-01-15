import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Fingerprint from 'fingerprintjs2';
import SmartError from '@flasd/smart-error';

const LOCAL_STORAGE_USER_KEY = 'pcVrvK62';
const LOCAL_STORAGE_FINGERPRINT_KEY = 'aJESJs7V';

export function assertUserType(any) {
  if (typeof any !== 'object' || !any.uid || !any.name || !any.role) {
    throw new SmartError(
      'Invalid user object. It must have the properties "uid", "name", "role"',
    );
  }
}

export const AuthContext = React.createContext({});

export const AuthConsumer = AuthContext.Consumer;

export default class AuthProvider extends Component {
  constructor(props) {
    super(props);
    const user = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
    const fingerprint = localStorage.getItem(LOCAL_STORAGE_FINGERPRINT_KEY);

    this.state = {
      fingerprint,
      user,
      hasAuth: !!user,
    };

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    this.calculateFingerprint();
  }

  componentWillUnmount() {
    this.setState = () => {};
  }

  async calculateFingerprint() {
    try {
      const fingerprint = await new Promise(resolve => new Fingerprint()
        .get(result => resolve(result)));

      localStorage.setItem(
        LOCAL_STORAGE_FINGERPRINT_KEY,
        JSON.stringify(fingerprint),
      );

      this.setState({
        fingerprint,
      });
    } catch (error) {
      /* swallow it baby */
    }
  }

  async login(authResult) {
    if (!authResult) {
      throw new SmartError(
        'No authResult. Please call this function with either a JWT token that'
          + ' decodes to a User objec or a User object itself.',
      );
    }

    if (typeof authResult === 'string') {
      const errorMessage = 'Called with invalid JWT token.';

      if (authResult.indexOf('.') === -1) {
        throw new SmartError(errorMessage);
      }

      const [, payload] = authResult.split('.');

      if (!payload) {
        throw new SmartError(errorMessage);
      }

      const user = JSON.parse(window.atob(payload));

      assertUserType(user);

      this.setState({
        user,
        hasAuth: !!user,
      });
    }

    if (typeof authResult === 'object') {
      assertUserType(authResult);

      this.setState({
        user: authResult,
        hasAuth: !!authResult,
      });
      return;
    }

    throw new SmartError('Called with invalid payload.');
  }

  logout() {
    this.setState({
      user: null,
      hasAuth: false,
    });
  }

  render() {
    const { children } = this.props;
    const safeValue = Object.freeze(Object.assign({}, this.state, {}));

    return (
      <AuthContext.Provider value={safeValue}>{children}</AuthContext.Provider>
    );
  }
}


AuthProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
};
