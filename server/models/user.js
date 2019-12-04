const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    lowercase: true
  },
  password: { type: String, required: true },
  profile: { type: Schema.Types.ObjectId, ref: "Profile", required: true }
});

module.exports = mongoose.model("User", user);
