import React, { Component } from "react";
import { Route } from "react-router-dom";
import A from "./Authentication";
import isAuth from "../utils/isAuthenticated";
import io from "socket.io-client";
class Authenticated extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      user: {},
      socket: null
    };
  }
  componentDidMount() {
    isAuth().then(res => {
      if (!res.error) {
        const { username, stats, photoUrl } = res;
        const socket = io("http://localhost:3001/");
        this.setState({
          user: { username, stats, photoUrl },
          loggedIn: true,
          socket: socket
        });
      }
    });
  }
  render() {
    const { component: Component, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={props => {
          if (this.state.loggedIn)
            return (
              <Component
                {...props}
                user={this.state.user}
                socket={this.state.socket}
              />
            );
          return <A {...props} />;
        }}
      />
    );
  }
}

export default Authenticated;
