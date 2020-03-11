import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLoggedIn } from '../utility/Authorization';

class PublicRouter extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { Component, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={props => {
          if (isLoggedIn()) {
            return <Redirect to={{ pathname: '/dashboard' }} />;
          } else {
            return <Component {...props} />;
          }
        }}
      />
    );
  }
}
export default PublicRouter;
