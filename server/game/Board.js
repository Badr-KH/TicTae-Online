const Game = require("../models/game");
const Stats = require("../models/stats");
class Board {
  constructor() {
    this.board = Array(9).fill(null);
    this.isXNext = true;
    this.start = Date.now();
    this.turnNumber = 0;
  }
  fillPosition(index) {
    this.board[index] = this.isXNext ? "X" : "O";
    this.isXNext = !this.isXNext;
  }
  checkWinner() {
    const winCombination = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let combination of winCombination) {
      const [num1, num2, num3] = combination;
      if (
        this.board[num1] &&
        this.board[num1] === this.board[num2] &&
        this.board[num1] === this.board[num3]
      ) {
        return this.board[num1];
      }
    }
    return null;
  }
  /**
   *
   * @param {SocketIO.Socket} winner
   * @param {SocketIO.Socket} loser
   */
  delegateWinner(winner, loser) {
    this.end = Date.now();
    Stats.findOneAndUpdate(
      { _id: winner.identity.stats },
      { $inc: { gamesPlayed: 1, gamesWon: 1 } }
    ).exec();
    Stats.findOneAndUpdate(
      { _id: loser.identity.stats },
      { $inc: { gamesPlayed: 1, gamesLost: 1 } }
    ).exec();
    Game.create({
      players: [winner.identity._id, loser.identity._id],
      winner: winner.identity._id,
      gameDuration: this.end - this.start
    });
    winner.emit("end", {
      message: "Congratulations, you won !",
      color: "green"
    });
    loser.emit("end", {
      message: "You lost, you can try again next time !",
      color: "red"
    });
  }
  drawSave(player1, player2) {
    this.end = Date.now();
    Stats.updateMany(
      {
        $or: [{ _id: player1.identity.stats }, { _id: player2.identity.stats }]
      },
      { $inc: { gamesPlayed: 1, draws: 1 } }
    ).exec();
    Game.create({
      players: [player1.identity._id, player2.identity._id],
      winner: null,
      gameDuration: this.end - this.start
    });
  }
}

module.exports = Board;
