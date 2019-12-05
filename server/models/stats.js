const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stats = new Schema({
  gamesPlayed: { type: Number, default: 0 },
  gamesWon: { type: Number, default: 0 },
  gamesLost: { type: Number, default: 0 },
  draws: { type: Number, default: 0 },
  score: { type: Number, default: 0, index: true }
});

module.exports = mongoose.model("Stats", stats);
