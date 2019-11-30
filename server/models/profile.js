const mongoose = require("mongoose");
const stats = require("./stats");
const Schema = mongoose.Schema;

const profile = new Schema({
  username: { type: String, required: true },
  photoUrl: { type: String, default: "" },
  stats: {
    type: Schema.Types.ObjectId,
    ref: "Stats",
    default: () => {
      const Stats = mongoose.model("Stats", stats);
      const statsobject = new Stats().save();
      return statsobject.id;
    }
  },
  dateCreated: { type: Date, default: Date.now }
});

module.exports = profile;
