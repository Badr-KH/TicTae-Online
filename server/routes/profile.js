const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  if (req.body.profile) return res.send(req.body.profile);
  return res.status(403).send({ error: "Forbidden" });
});
module.exports = router;
