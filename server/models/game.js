const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const game = new Schema({
  players: [{ type: Schema.Types.ObjectId, ref: "Profile", required: true }],
  winner: { type: Schema.Types.ObjectId, ref: "Profile", default: null },
  datePlayed: { type: Date, default: Date.now },
  gameDuration: { type: Number, default: 0 }
});

module.exports = game;
