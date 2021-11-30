const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require("../models/index.js");
const HttpError = require("../models/http-error");
const User = db.users;

// Create a new user
exports.create = async (req, res, next) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty." });
    return;
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(req.body.password, 12);
  } catch (err) {
    const error = new HttpError("Could not encode password, please try again later.", 500);
  }

  // Create a new user
  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hashedPassword,
    numPosts: 0,
    userType: req.body.userType
  });

  // Save user in the database
  try {
    await newUser.save();
  } catch (err) {
    const error = new HttpError("An error occurred while creating a new user.", 500);
    return next(error);
  }
  // sign authentication token
    let token;
    try {
    token = jwt.sign({ userId: newUser.id, email: newUser.email, userName: newUser.firstName }, '2jlkjFAoj43jk', {expiresIn: '1hr'});
  } catch (err) {
    const error = new HttpError("An error occured while creating authentication token, please try again later.", 500);
    return next(error);
  }
  res.status(201).json({ userId: newUser.id, email: newUser.email, userName: newUser.firstName });
}; 

// user login
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;

  // check for user existence by email
  try {
    existingUser = await User.findOne({email: email})
  } catch (err) {
    const error = new HttpError(
      "Logging in failed, please try again later.",
      500
    );
    return next(error);
  }

  // user doesn't exist
  if (!existingUser) {
    const error = new HttpError(
      "Login failed, email address not registered.",
      401
    );
    return next(error);
  }
      
  // encode password and compare to stored encoded password
    let isValidPassword = false;
    try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    error = new HttpError("Login failed, could not decode password.", 408);
    return next(error);
  }

  // incorrect password
  if (!isValidPassword) {
    error = new HttpError(
      "Login failed, password is incorrect.",
      401
    );
    return next(error);
  }

  // sign authentication token
    let token;
    try {
    token = jwt.sign({ userId: existingUser.id, email: existingUser.email, userName: existingUser.firstName, userType: existingUser.userType }, '2jlkjFAoj43jk', {expiresIn: '1hr'});
  } catch (err) {
    const error = new HttpError("An error occured while creating authentication token, please try again later.", 500);
    return next(error);
  }

  // send back user info and token
  res
  .status(201)
  .json({
    userId: existingUser.id,
    userName: existingUser.firstName,
    userType: existingUser.userType,
    fullName: existingUser.firstName + " " + existingUser.lastName,
    email: existingUser.email,
    token: token
  });
};

// Retrieve all users
exports.findAll = (req, res, next) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  User.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      const error = new HttpError("An error occurred while retrieving users.", 500);
      return next(error);
    });
};

// Find a user by ID
exports.findOne = (req, res, next) => {
    const id = req.params.id;
    User.findById(id)
      .then(data => {
        if (!data) {
          const error = new HttpError("Could not find user with ID: " + id, 404);
          return next(error);
        }

        else res.send(data);
      })
      .catch(err => {
        const error = new HttpError("Error retrieving user with ID: " + id, 500);
        return next(error);
        // res
        //   .status(500)
        //   .send({ message: "Error retrieving user with ID: " + id });
      });
};

// find a user and only send back name and ID
exports.findOneLite = (req, res, next) => {
  const id = req.params.id;
    User.findById(id)
      .then(data => {
        if (!data) {
          const error = new HttpError("Could not find user with ID: " + id, 404);
          return next(error);
        }        
        else {
          const dataLite = {
          firstName: data.firstName,
          name: `${data.firstName} ${data.lastName}`,
          id: data.id
          };
          res.send(dataLite);
        }
      })
      .catch(err => {
        const error = new HttpError("Error retrieving user with ID: " + id, 500);
        return next(error);
      });
};

// Update a user by the id in the request
exports.update = (req, res, next) => {
    if (!req.body) {
      const error = new HttpError("Cannot update empty data location.", 400);
      return next(error);
      }
    
      const id = req.params.id;
    
      User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            const error = new HttpError("Cannot update user with ID: ${id}. It probably doesn't exist.", 404);
            return next(error);
          } else res.send({ message: "User ${id} updated successfully." });
        })
        .catch(err => {
          const error = new HttpError("An error occured while updating user with ID: " + id, 500);
          return next(error);
        });
};

// Delete a user with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    User.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          const error = new HttpError("Cannot delete user with ID: ${id}. It probably doesn't exist.", 404);
          return next(error);
        } else {
          res.send({
            message: "User deleted successfully."
          });
        }
      })
      .catch(err => {
          const error = new HttpError("An error occured while deleting user with ID: ${id}.", 500);
          return next(error);
      });
};

// Delete all users from the database
exports.deleteAll = (req, res) => {
  User.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} users were deleted successfully!`
      });
    })
    .catch(err => {
        const error = new HttpError("An error occured while deleting all users.", 500);
        return next(error);
    });
};