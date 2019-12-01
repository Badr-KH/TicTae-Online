const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stats = new Schema({
  gamesPlayed: { type: Number, default: 0 },
  gamesWon: { type: Number, default: 0 },
  gamesLost: { type: Number, default: 0 },
  averageGameDuration: { type: Number, default: 0 }
});

module.exports = mongoose.model("Stats", stats);
