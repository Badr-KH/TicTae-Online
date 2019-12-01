const http = require("http");
require("dotenv").config();
const app = require("../app");
const server = http.createServer(app);

server.listen(3001, console.log("Listening on port 3001"));
