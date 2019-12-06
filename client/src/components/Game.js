import React, { Component } from "react";
import Square from "./Square";
class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: Array(9).fill(null),
      countdown: 30,
      myTurn: false
    };
  }

  componentDidMount() {
    this.props.socket.emit("readytostart");
    const yourFunc = () =>
      this.countDown({
        text: `It's your turn to play : ${this.state.countdown}`,
        color: null,
        matching: false
      });
    const opponentFunc = () =>
      this.countDown({
        text: `It's your opponent's turn to play : ${this.state.countdown}`,
        color: null,
        matching: false
      });
    this.props.socket.on("start", () => {
      if (this.props.isX) {
        this.setState({ myTurn: true });
        this.interval = setInterval(yourFunc, 1000);
        yourFunc();
        return;
      }
      this.interval = setInterval(opponentFunc, 1000);
      opponentFunc();
    });
    this.props.socket.on("turnplayed", data => {
      clearInterval(this.interval);
      this.setState({ board: data.board, myTurn: true, countdown: 30 });
      yourFunc();
      this.interval = setInterval(yourFunc, 1000);
    });
    this.props.socket.on("opponentsturn", () => {
      this.setState({ countdown: 30 });
      clearInterval(this.interval);
      opponentFunc();
      this.interval = setInterval(
        () =>
          this.countDown({
            text: `It's your opponent's turn to play : ${this.state.countdown}`,
            color: null,
            matching: false
          }),
        1000
      );
    });
    this.props.socket.on("end", data => {
      clearInterval(this.interval);
      this.props.message({
        text: data.message,
        color: data.color,
        matching: false
      });
      setTimeout(() => this.props.history.push("/"), 2000);
    });
  }
  countDown(message) {
    if (this.state.countdown > 0) {
      this.props.message(message);
      this.setState({ countdown: this.state.countdown - 1 });
    }
  }
  componentWillUnmount() {
    clearInterval(this.interval);
    this.props.socket.off("start");
    this.props.socket.off("turnplayed");
    this.props.socket.off("opponentsturn");
    this.props.socket.off("end");
    this.props.socket.off("start");
  }
  squareClicked(index) {
    if (this.state.myTurn && !this.state.board[index]) {
      const boardcopy = [...this.state.board];
      if (!boardcopy[index]) boardcopy[index] = this.props.isX ? "X" : "O";
      this.setState({ board: boardcopy, myTurn: false });
      this.props.socket.emit("playturn", {
        index
      });
    }
  }
  renderGameSquares(index) {
    return (
      <Square
        value={this.state.board[index]}
        onClick={() => this.squareClicked(index)}
      />
    );
  }
  render() {
    return (
      <div className="gameHolder">
        <div className="row">
          {this.renderGameSquares(0)}
          {this.renderGameSquares(1)}
          {this.renderGameSquares(2)}
        </div>
        <div className="row">
          {this.renderGameSquares(3)}
          {this.renderGameSquares(4)}
          {this.renderGameSquares(5)}
        </div>
        <div className="row">
          {this.renderGameSquares(6)}
          {this.renderGameSquares(7)}
          {this.renderGameSquares(8)}
        </div>
      </div>
    );
  }
}

export default Game;
