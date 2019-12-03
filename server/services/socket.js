const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const Board = require("../game/Board");
/**
 *
 * @param {SocketIO.Server} io
 */
function Socket(io, sockets, ready) {
  let interval = null;
  io.on("connection", socket => {
    const value = cookie.parse(socket.handshake.headers.cookie);
    if (value.accessToken) {
      try {
        const getUser = verifyToken(value.accessToken);
        if (sockets[getUser.username]) return socket.disconnect(true);
        socket.identity = getUser.username;
        sockets[getUser.username] = socket;
        console.log("Hello");
      } catch {
        socket.disconnect(true);
      }
    } else {
      return socket.disconnect(true);
    }
    socket.on("ready", () => {
      ready[socket.identity] = socket;
      const keys = Object.keys(ready);
      console.log(keys.length);
      if (keys.length >= 2)
        interval = setInterval(
          () => findMatch(ready, keys, interval, io),
          2000
        );
    });

    socket.on("unready", () => {
      delete ready[socket.identity];
      const keys = Object.keys(ready);
      if (keys.length < 2) clearInterval();
    });
    socket.on("disconnect", () => {
      if (ready[socket.identity]) {
        delete ready[socket.identity];
        const keys = Object.keys(ready);
        if (keys.length < 2) clearInterval(interval);
      }
      delete sockets[socket.identity];
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
function findMatch(ready, keys, interval, io) {
  const socket1 = ready[keys[0]];
  const socket2 = ready[keys[1]];
  const generateRoomName = socket1.id + socket2.id;
  delete ready[socket1.identity];
  delete ready[socket2.identity];
  keys = keys.slice(2);
  if (keys.length < 2) clearInterval(interval);
  socket1.join(`${generateRoomName}`);
  socket2.join(`${generateRoomName}`);
  socket1.isX = true;
  socket2.isX = false;
  io.to(`${socket1.id}`).emit("foundMatch", {
    roomId: generateRoomName,
    opponent: socket2.identity,
    isX: true
  });
  io.to(`${socket2.id}`).emit("foundMatch", {
    roomId: generateRoomName,
    opponent: socket1.identity,
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
  io.to(roomname).emit("start");
  for (let socket of sockets) {
    socket.on("playturn", data => {
      console.log(data, board, socket.isX);
      if (socket.isX !== board.isXNext) return;
      board.board[data.index] = board.isXNext ? "X" : "O";
      board.isXNext = !board.isXNext;
      const othersocket = socket.id === socket1.id ? socket2 : socket1;
      othersocket.emit("turnplayed", {
        board: board.board
      });
      socket.emit("opponentsturn");
    });
  }
}
module.exports = Socket;
