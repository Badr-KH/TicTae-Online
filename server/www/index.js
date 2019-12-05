const http = require("http");
const socketio = require("../services/socket");
require("dotenv").config();
const sockets = {};
const readyToPlay = {};
const app = require("../app");
const PORT = process.env.PORT || 3001;

const server = http.createServer(app);
app.set("sockets", sockets);
const io = require("socket.io")(server, { key: "" });
socketio(io, sockets, readyToPlay);
server.listen(PORT, console.log("Listening on port 3001"));
