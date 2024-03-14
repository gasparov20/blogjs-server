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
      console.log(err);
      const error = new HttpError("Authentication failed.", 401);
      return next(error);
    }
    const decodedToken = jwt.verify(token, process.env.SECRET);
    req.userData = {
      userId: decodedToken.userId,
      userType: decodedToken.userType,
    };
    next();
  } catch (err) {
    console.log(err);
    const error = new HttpError("Authentication failed.", 401);
    return next(error);
  }
};
