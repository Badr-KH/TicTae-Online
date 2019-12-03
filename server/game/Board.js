class Board {
  constructor() {
    this.board = Array(9).fill(null);
    this.isXNext = true;
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
}
module.exports = Board;
