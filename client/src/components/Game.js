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
    this.props.socket.on("start", () => {
      if (this.props.isX) {
        this.setState({ myTurn: true });
        this.interval = setInterval(
          () =>
            this.countDown(`It's your turn to play : ${this.state.countdown}`),
          1000
        );
        return;
      }
      this.interval = setInterval(
        () =>
          this.countDown(
            `It's your opponent's turn to play : ${this.state.countdown}`
          ),
        1000
      );
    });
    this.props.socket.on("turnplayed", data => {
      console.log(data);
      clearInterval(this.interval);
      this.setState({ board: data.board, myTurn: true, countdown: 30 });
      this.interval = setInterval(
        () =>
          this.countDown(`It's your turn to play : ${this.state.countdown}`),
        1000
      );
    });
    this.props.socket.on("opponentsturn", () => {
      this.setState({ countdown: 30 });
      clearInterval(this.interval);
      this.interval = setInterval(
        () =>
          this.countDown(
            `It's your opponent's turn to play : ${this.state.countdown}`
          ),
        1000
      );
    });
  }
  countDown(message) {
    if (this.state.countdown > 0) {
      this.props.message(message);
      this.setState({ countdown: this.state.countdown - 1 });
    }
  }
  squareClicked(index) {
    if (this.state.myTurn) {
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
