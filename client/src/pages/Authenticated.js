import React, { Component } from "react";
import { Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import auth from "../utils/isAuthenticated";
import Footer from "../components/Footer";
import Authentication from "../pages/Authentication";
import Privacy from "../pages/Privacy";
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
            <>
              <Route exact path="/privacy" component={Privacy} />
              <Route exact path="/" component={Authentication} />
            </>
          );
        }}
      />
    );
  }
}

export default Authenticated;
