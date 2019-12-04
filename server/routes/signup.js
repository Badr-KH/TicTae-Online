const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const Profile = require("../models/profile");
const router = express.Router();

router.post("/", (req, res) => {
  console.log(req.body);
  const userProfile = new Profile({ username: req.body.username });
  new User({
    profile: userProfile.id,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10)
  }).save((err, user) => {
    if (err)
      return res
        .status(400)
        .json({
          error:
            "The email entered is invalid or already registered. Please try again !"
        })
        .end();
    userProfile.save((err, document) => {
      if (err) {
        User.findOneAndDelete({ email: user.email }).exec();
        return res
          .status(400)
          .json({
            error:
              "The username that you entered is already registered. Please try again !"
          })
          .end();
      }

      const token = jwt.sign(document.toObject(), process.env.tokenSecret, {
        expiresIn: "1d"
      });
      res.cookie("accessToken", token, { httpOnly: true });
      res.send({ succes: true });
    });
  });
});
router.post("/facebook", (req, res) => {
  console.log(req.body);
  new Profile({
    username: req.body.username,
    facebookId: req.body.id,
    photoUrl: req.body.picture.data.url
  }).save((err, document) => {
    if (err)
      return res
        .status(400)
        .send({
          error:
            "The username you entered is already registered ! Please try again."
        })
        .end();
    const token = jwt.sign(document.toObject(), process.env.tokenSecret, {
      expiresIn: "1d"
    });
    res.cookie("accessToken", token, { httpOnly: true });
    res.send({ success: true });
  });
});
module.exports = router;
