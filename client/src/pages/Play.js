import React, { Component } from "react";
import NavBar from "../components/Navbar";
import Game from "../components/Game";
import "../styles/play.css";
class Play extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomId: null,
      isX: null,
      opponent: null,
      message: null,
      countdown: 5
    };
  }
  componentDidMount() {
    this.props.socket.emit("ready");
    this.props.socket.on("foundMatch", data => {
      this.interval = setInterval(() => this.start(data), 1000);
    });
  }
  start(data) {
    if (this.state.countdown > 0)
      return this.setState({
        message: `Opponent found you will start in : ${this.state.countdown}`,
        countdown: this.state.countdown - 1
      });
    clearInterval(this.interval);
    const { roomId, opponent, isX } = data;
    this.setState({
      roomId,
      opponent,
      isX,
      message: "Waiting for your opponent to be ready"
    });
  }
  componentWillUnmount() {
    this.props.socket.emit("unready");
  }
  render() {
    return (
      <div>
        <div>
          <NavBar />
        </div>
        <div className="center">
          <h2>
            {this.state.message
              ? this.state.message
              : `Hang on, ${this.props.user.username} we are looking for an opponent
            for you !`}
          </h2>
          {!this.state.message && (
            <svg className="spinner" viewBox="0 0 50 50">
              <circle
                className="path"
                cx="25"
                cy="25"
                r="20"
                fill="none"
                strokeWidth="5"
              ></circle>
            </svg>
          )}
        </div>
        {this.state.opponent && (
          <Game
            roomId={this.state.roomId}
            isX={this.state.isX}
            opponent={this.state.opponent}
            socket={this.props.socket}
            message={message => this.setState({ message })}
          />
        )}
      </div>
    );
  }
}

export default Play;
