const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const Board = require("../game/Board");
/**
 *
 * @param {SocketIO.Server} io
 */
function Socket(io, sockets, ready) {
  io.on("connection", socket => {
    const value = cookie.parse(socket.handshake.headers.cookie);
    if (value.accessToken) {
      try {
        const getUser = verifyToken(value.accessToken);
        if (sockets[getUser.username]) return socket.disconnect(true);
        socket.identity = getUser;
        sockets[getUser.username] = socket;

        console.log("Hello");
      } catch {
        socket.disconnect(true);
      }
    } else {
      return socket.disconnect(true);
    }
    socket.on("ready", () => {
      ready[socket.identity.username] = socket;
      const keys = Object.keys(ready);
      console.log(socket.id);
      if (keys.length >= 2) findMatch(ready, keys, io);
    });

    socket.on("unready", () => {
      delete ready[socket.identity.username];
    });
    socket.on("disconnect", () => {
      if (ready[socket.identity.username]) {
        delete ready[socket.identity.username];
      }
      console.log("disconnecting");
      if (socket.roomname) io.to(socket.roomname).emit("premleave");
      delete sockets[socket.identity.username];
    });
  });
}
function verifyToken(token) {
  const verification = jwt.verify(token, process.env.tokenSecret);
  return verification;
}
/**
 *
 * @param {{}} ready
 * @param {[]} keys
 * @param {{}} interval
 * @param {SocketIO.Server} io
 */
function findMatch(ready, keys, io) {
  console.log("Match found");
  const socket1 = ready[keys[0]];
  const socket2 = ready[keys[1]];
  const generateRoomName = socket1.id + socket2.id;
  delete ready[socket1.identity.username];
  delete ready[socket2.identity.username];
  socket1.join(`${generateRoomName}`);
  socket2.join(`${generateRoomName}`);
  socket1.isX = true;
  socket2.isX = false;
  io.to(`${socket1.id}`).emit("foundMatch", {
    roomId: generateRoomName,
    opponent: socket2.identity.username,
    isX: true
  });
  io.to(`${socket2.id}`).emit("foundMatch", {
    roomId: generateRoomName,
    opponent: socket1.identity.username,
    isX: false
  });
  const readytoplay = [false, false];
  socket1.on("readytostart", () => {
    readytoplay[0] = true;
    if (readytoplay[1]) playGame(io, socket1, socket2, generateRoomName);
  });
  socket2.on("readytostart", () => {
    readytoplay[1] = true;
    if (readytoplay[0]) playGame(io, socket1, socket2, generateRoomName);
  });
}
/**
 *
 * @param {SocketIO.Server} io
 * @param {SocketIO.Socket} socket1
 * @param {SocketIO.Socket} socket2
 * @param {String} roomname
 */
function playGame(io, socket1, socket2, roomname) {
  const board = new Board();
  const sockets = [socket1, socket2];
  let timeout = setTimeout(() => unAction(socket1, socket2, board), 30000);
  io.to(roomname).emit("start");
  addPremleave([socket1, socket2], board, socket1, socket2, roomname);
  for (let socket of sockets) {
    socket.on("playturn", data => {
      if (socket.isX !== board.isXNext) return;
      clearTimeout(timeout);
      if (board.board[data.index]) return;
      board.board[data.index] = board.isXNext ? "X" : "O";
      board.isXNext = !board.isXNext;
      board.turnNumber++;
      const othersocket = socket.id === socket1.id ? socket2 : socket1;
      othersocket.emit("turnplayed", {
        board: board.board
      });
      if (board.turnNumber > 2) {
        const winner = board.checkWinner();
        if (winner === "X") {
          board.delegateWinner(socket1, socket2, roomname);
          return;
        }
        if (winner === "O") {
          board.delegateWinner(socket2, socket1, roomname);
          return;
        }
        if (!winner && board.turnNumber === 9) {
          othersocket.emit("turnplayed", {
            board: board.board
          });
          board.drawSave(socket1, socket2);
          io.to(roomname).emit("end", {
            message: "It's a draw !",
            color: ""
          });
          board.leaveRoom(socket1, socket2, roomname);
          return;
        }
      }
      socket.emit("opponentsturn");
      timeout = setTimeout(() => unAction(socket1, socket2, board), 30000);
    });
  }
}
function unAction(socket1, socket2, board) {
  if (socket1.isX === board.isXNext)
    return board.delegateWinner(socket2, socket1);
  return board.delegateWinner(socket1, socket2);
}
/**
 *
 * @param {[]} sockets
 */
function addPremleave(sockets, board, socket1, socket2, roomname) {
  sockets.forEach(socket => {
    socket.roomname = roomname;
    console.log("heelo");
    socket.on("premleave", data => {
      console.log("hello");
      if (socket.id === socket1.id)
        return board.delegateWinner(socket2, socket1, roomname);
      board.delegateWinner(socket1, socket2, roomname);
    });
  });
}
module.exports = Socket;
