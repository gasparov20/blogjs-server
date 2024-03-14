const dbConfig = require("../config/db.config.js");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.comments = require("./comments-model.js")(mongoose);
db.posts = require("./posts-model.js")(mongoose);
db.pendingposts = require("./pending-posts-model.js")(mongoose);
db.users = require("./users-model.js")(mongoose);

module.exports = db;
