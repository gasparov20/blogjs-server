const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const postRoutes = require("./app/routes/post-routes");
const userRoutes = require("./app/routes/user-routes");
const cors = require("cors");
const app = express();
//require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// app.use(
//   "/uploads/images",
//   express.static(path.join("uploads", "images"));
// );

//app.use(express.static(path.join("public")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  next();
});

// any route in post-routes will need this prefix
app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);

app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code, 500);
  res.json({ message: error.message || "An unknown error occured." });
});

const db = require("./app/models");
const connectionOptions = { useNewUrlParser: true, useUnifiedTopology: true };
try {
  db.mongoose.connect(process.env.DB_URL, connectionOptions);
} catch (err) {
  const error = {
    message: "Could not connect to the database.",
    error: err,
  };
  res.status(500).send(error);
}

const server = app.listen(process.env.PORT || 5000, () => {
  console.log("Server running");
});
