const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const Profile = require("../models/profile");
const router = express.Router();

router.post("/", (req, res) => {
  new Profile({ username: req.body.username }).save((err, document) => {
    if (err)
      return res
        .status(400)
        .send({ error: err })
        .end();
    new User({
      profile: document.id,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10)
    }).save(err => {
      if (err)
        return res
          .status(400)
          .send({ error: err })
          .end();

      const token = jwt.sign(document.toObject(), process.env.tokenSecret);
      res.send({ accessToken: token });
    });
  });
});
router.post("/facebook", (req, res) => {
  new Profile({
    username: req.body.username,
    facebookId: req.body.id,
    photoUrl: req.body.picture.data.url
  }).save((err, document) => {
    if (err)
      return res
        .status(400)
        .send({ error: err })
        .end();
    const token = jwt.sign(document.toObject(), process.env.tokenSecret);
    res.send({ accessToken: token });
  });
});
module.exports = router;
