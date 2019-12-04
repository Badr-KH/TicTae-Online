import React, { Component } from "react";
import { Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import A from "./Authentication";
import isAuth from "../utils/isAuthenticated";
import io from "socket.io-client";
class Authenticated extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      user: {},
      socket: null,
      callBackLogin: false
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
  componentDidUpdate() {
    if (this.state.callBackLogin) {
      isAuth().then(res => {
        if (!res.error) {
          const { username, stats, photoUrl } = res;
          const socket = io("http://localhost:3001/");
          this.setState({
            user: { username, stats, photoUrl },
            loggedIn: true,
            socket: socket,
            callBackLogin: false
          });
          return;
        }
        this.setState({
          user: {},
          loggedIn: false,
          socket: null,
          callBackLogin: false
        });
      });
    }
  }
  render() {
    const { component: Component, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={props => {
          if (this.state.loggedIn)
            return (
              <>
                <Navbar
                  {...props}
                  callBack={data => this.setState({ callBackLogin: data })}
                />
                <Component
                  {...props}
                  user={this.state.user}
                  socket={this.state.socket}
                />
              </>
            );
          return (
            <A
              {...props}
              callBack={data => this.setState({ callBackLogin: data })}
            />
          );
        }}
      />
    );
  }
}

export default Authenticated;
