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
const path = require("path");
mongoose
  .connect(process.env.connectionString, {
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
app.use("/signup", signup);
app.use("/login", login);
app.use("/profile", secureMiddleware, profile);
app.use("/logout", secureMiddleware, logout);
app.use("/stats", secureMiddleware, stats);

if (process.env.NODE_ENV === "production") {
  app.use((req, res, next) => {
    if (req.header("x-forwarded-proto") !== "https")
      res.redirect(`https://${req.header("host")}${req.url}`);
    else next();
  });
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}
module.exports = app;
