import React from "react";
import "../styles/auth.css";
import Login from "../components/Login";
import Signup from "../components/Signup";
import Username from "../components/Username";
class Authentication extends React.Component {
  constructor(props) {
    super(props);
    this.state = { page: "login", userLogin: {} };
  }
  render() {
    return (
      <div className="mainDiv">
        <div className="logginDiv">
          <div className="descDiv">
            <h2>Welcome to TicTac Online !</h2>
            <p>
              Challenge your friends or random strangers today, and show them
              who's boss at Tic Tac Toe ! <br />
              Create an account today or sign-in to play !
            </p>
            <img
              src="https://tictaeonline.s3.ca-central-1.amazonaws.com/IMGBIN_tic-tac-toe-drawing-game-circle-png_63X7VMpb.png"
              alt="tictac"
            />
          </div>
          {this.state.page === "login" ? (
            <Login
              page={page => this.setState({ page })}
              login={login => this.setState({ userLogin: login })}
              {...this.props}
            />
          ) : this.state.page === "username" ? (
            <Username userLogin={this.state.userLogin} />
          ) : (
            <Signup page={page => this.setState({ page })} />
          )}
        </div>
      </div>
    );
  }
}
export default Authentication;
