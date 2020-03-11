import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLoggedIn } from '../utility/Authorization';

class PrivateRouter extends Component {
  render() {
    const { Component, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={props => {
          if (isLoggedIn()) {
            return <Component {...props} />;
          } else {
            return <Redirect to={{ pathname: '/login' }} />;
          }
        }}
      />
    );
  }
}
export default PrivateRouter;
