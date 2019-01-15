import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

export default class ProtectedRoute extends Component {
  renderComponent({ match, history, location }) {
    const { component: UserComponent, hasAuth, fallbackPath } = this.props;

    if (hasAuth) {
      return <UserComponent match={match} history={history} />;
    }

    return <Redirect to={`${fallbackPath}?redirect=${location.pathname}`} />;
  }

  render() {
    return <Route render={this.renderComponent} />;
  }
}

ProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
  hasAuth: PropTypes.bool.isRequired,
  fallbackPath: PropTypes.string.isRequired,
};
