import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

export default class PublicRoute extends Component {
  renderComponent({ match, history, location }) {
    const { component: UserComponent, fallbackPath } = this.props;

    if (location.indexOf('login') === -1) {
      return <UserComponent match={match} history={history} />;
    }

    return <Redirect to={fallbackPath} />;
  }

  render() {
    return <Route render={this.renderComponent} />;
  }
}

PublicRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
  fallbackPath: PropTypes.string.isRequired,
};
