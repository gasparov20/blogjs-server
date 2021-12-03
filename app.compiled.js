const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const postRoutes = require('./app/routes/post-routes');
const userRoutes = require('./app/routes/user-routes');
const cors = require('cors');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static(path.join('public')));

// any route in post-routes will need this prefix
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);

// // send the front-end at root
// app.use((req, res, next) => {
//   res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
// })

const db = require("./app/models");
const connectionOptions = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };
try {
  db.mongoose.connect(db.url, connectionOptions);
} catch (err) {
  const error = {
    "message": "Could not connect to the database.",
    "error": err
  };
  res.status(500).send(error);
}

const port = process.env.NODE_ENV === 'production' ? process.env.PORT || 80 : 5000;
const server = app.listen(port, () => {
  console.log('Server listening on port ' + port);
});
