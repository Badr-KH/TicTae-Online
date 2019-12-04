import React, { Component } from "react";
import Game from "../components/Game";
import "../styles/play.css";
class Play extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomId: null,
      isX: null,
      opponent: null,
      message: {
        text: `Hang on , ${this.props.user.username} we looking for an opponent for you !`,
        color: null,
        matching: true
      },
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
        message: {
          text: `Opponent found you will start in : ${this.state.countdown}`,
          color: null,
          matching: false
        },
        countdown: this.state.countdown - 1
      });
    clearInterval(this.interval);
    const { roomId, opponent, isX } = data;
    this.setState({
      roomId,
      opponent,
      isX,
      message: {
        text: "Waiting for your opponent to be ready",
        color: null,
        matching: false
      }
    });
  }
  componentWillUnmount() {
    this.props.socket.emit("unready");
  }
  render() {
    return (
      <div>
        <div className="center">
          {this.state.message.text && (
            <h2 style={{ color: this.state.message.color }}>
              {this.state.message.text}
            </h2>
          )}
          {this.state.message.matching && (
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
            history={this.props.history}
          />
        )}
      </div>
    );
  }
}

export default Play;
