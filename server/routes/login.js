const express = require("express");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const Profile = require("../models/profile");
const bcrypt = require("bcryptjs");
const router = express.Router();

router.post("/", (req, res) => {
  User.findOne({ email: req.body.email })
    .populate("profile")
    .then(document => {
      if (document) {
        if (bcrypt.compareSync(req.body.password, document.password)) {
          const token = jwt.sign(
            document.profile.toObject(),
            process.env.tokenSecret
          );
          return res.send({ accessToken: token });
        }
      }
      res
        .status(401)
        .send({ error: "Sorry, the email/password combination is incorrect" });
    });
});
router.post("/facebook", (req, res) => {
  Profile.findOne({ facebookId: req.body.id }).then(document => {
    if (document) {
      const token = jwt.sign(document.toObject(), process.env.tokenSecret);
      res.send({ accessToken: token });
      return;
    }
    res.status(404).send({ error: "Not found" });
  });
});
module.exports = router;
