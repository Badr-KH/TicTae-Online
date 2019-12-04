const express = require("express");
const app = express();
const profile = require("./routes/profile");
const signup = require("./routes/signup");
const morgan = require("morgan");
const login = require("./routes/login");
const mongoose = require("mongoose");
const cookieparser = require("cookie-parser");
const secureMiddleware = require("./middlewares/protectedRoute");
const stats = require("./routes/stats");
const logout = require("./routes/logout");
mongoose
  .connect("mongodb://localhost:27017/tictactoe", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(
    () => {
      console.log("Connected to the Database...");
    },
    err => console.log("Error", err)
  );
app.use(cookieparser());
app.use(express.json());
app.use(morgan("dev"));
app.use("/profile", secureMiddleware, profile);
app.use("/signup", signup);
app.use("/login", login);
app.use("/logout", secureMiddleware, logout);
app.use("/stats", secureMiddleware, stats);
module.exports = app;
