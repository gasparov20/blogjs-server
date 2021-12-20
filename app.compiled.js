const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const postRoutes = require("./app/routes/post-routes");
const userRoutes = require("./app/routes/user-routes");
const cors = require("cors");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(
  "/uploads/images",
  express.static(path.join("public", "uploads", "images"))
);

app.use(express.static(path.join("public")));

const db = require("./app/models");
const connectionOptions = { useNewUrlParser: true, useUnifiedTopology: true };
try {
  db.mongoose.connect(db.url, connectionOptions);
} catch (err) {
  const error = {
    message: "Could not connect to the database.",
    error: err,
  };
  res.status(500).send(error);
}

// any route in post-routes will need this prefix
app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);

const port =
  process.env.NODE_ENV === "production" ? process.env.PORT || 80 : 4000;
const server = app.listen(port, () => {
  console.log("Server listening on port " + port);
});
