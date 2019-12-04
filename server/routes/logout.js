const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.clearCookie("accessToken");
  res.send({ logout: true });
});
module.exports = router;
