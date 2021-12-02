const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const path = require('path');

const postRoutes = require('./app/routes/post-routes');
const userRoutes = require('./app/routes/user-routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join('public')));

// any route in post-routes will need this prefix
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);

app.use((req, res, next) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

// error catcher
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  // Sends JSON response
  res.json({ message: error.message || "An unknown error occured." });
});

const db = require("./app/models");
db.mongoose.connect(db.url || db.connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connected to the database!");
}).catch(err => {
  console.log("Cannot connect to the database!", err);
  process.exit();
});
mongoose.Promise = global.Promise;

app.get("/", (req, res) => {
  res.send("welcome to the server");
});

const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
