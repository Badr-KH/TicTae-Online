const express = require("express");
const router = express.Router();
const Stats = require("../models/stats");
router.get("/", (req, res) => {
  Stats.findOne({ _id: req.body.profile.stats }).then(result =>
    res.send(result)
  );
});

module.exports = router;
