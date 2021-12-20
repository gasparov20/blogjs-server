const HttpError = require("../models/http-error");
const jwt = require("jsonwebtoken");
const config = require("../../config.json");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      const error = new HttpError("Authentication failed.", 401);
      return next(error);
    }
    const decodedToken = jwt.verify(token, config.secret);
    req.userData = {
      userId: decodedToken.userId,
      userName: decodedToken.userName,
      userType: decodedToken.userType,
    };
    if (decodedToken.userType !== "admin") {
      res.status(401).send("Access denied.");
    } else {
      next();
    }
  } catch (err) {
    const error = new HttpError("Authentication failed.", 401);
    return next(error);
  }
};
