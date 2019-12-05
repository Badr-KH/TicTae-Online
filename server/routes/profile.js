const express = require("express");
const router = express.Router();
const Games = require("../models/game");
const Profile = require("../models/profile");
const Stats = require("../models/stats");
router.get("/", (req, res) => {
  if (req.body.profile) return res.send(req.body.profile);
  return res.status(403).send({ error: "Forbidden" });
});
router.get("/history", (req, res) => {
  const lastIndex = req.query.id || null;
  Games.find({
    players: req.body.profile._id,
    _id: lastIndex ? { $lte: lastIndex } : { $type: 7 }
  })
    .sort({ _id: -1 })
    .limit(11)
    .populate({
      path: "players",
      match: { _id: { $ne: req.body.profile._id } },
      select: "username -_id"
    })
    .then(document =>
      res.send({
        result: document.slice(0, document.length > 10 ? 10 : document.length),
        anotherPage: document.length > 10 ? true : false,
        lastId: document.length > 0 ? document[document.length - 1]._id : ""
      })
    );
});
router.get("/leaderboard", (req, res) => {
  const lastScore = req.query.score || null;
  Stats.find({ score: lastScore ? { $lte: lastScore } : { $type: 16 } })
    .sort("-score")
    .limit(11)
    .then(document => {
      const returnArr = [];
      const promises = [];
      for (let stat of document)
        promises.push(Profile.findOne({ stats: stat._id }).exec());
      Promise.all(promises).then(values => {
        for (let i = 0; i < values.length; i++)
          returnArr.push({
            username: values[i].username,
            stats: document[i]
          });
        res.send({
          result: returnArr.slice(
            0,
            returnArr.length > 10 ? 10 : returnArr.length
          ),
          anotherPage: returnArr.length > 10 ? true : false,
          lastId:
            returnArr.length > 0
              ? returnArr[returnArr.length - 1].stats.score
              : ""
        });
      });
    });
});

module.exports = router;
