const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  if (req.cookies.accessToken) {
    jwt.verify(
      req.cookies.accessToken,
      process.env.tokenSecret,
      (error, decoded) => {
        if (error)
          return res
            .status(401)
            .send({ error })
            .end();
        if (decoded) {
          req.body.profile = decoded;
          next();
        }
      }
    );
  } else
    res
      .status(401)
      .send({ error: "Unauthorized" })
      .end();
};
