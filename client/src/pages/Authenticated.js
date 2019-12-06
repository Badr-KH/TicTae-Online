import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Navbar from "../components/Navbar";
import auth from "../utils/isAuthenticated";
import Footer from "../components/Footer";
import Authentication from "../pages/Authentication";
import Privacy from "../pages/Privacy";
import nf404 from "../pages/404";
class Authenticated extends Component {
  render() {
    const { component: Component, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={props => {
          if (auth.isAuthenticated)
            return (
              <>
                <Navbar {...props} />
                <Component {...props} user={auth.user} socket={auth.socket} />
                <Footer />
              </>
            );
          return (
            <Switch>
              <Route exact path="/privacy" component={Privacy} />
              <Route exact path="/" component={Authentication} />
              <Route exact path="*" component={nf404} />
            </Switch>
          );
        }}
      />
    );
  }
}

export default Authenticated;
