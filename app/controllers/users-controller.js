const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../../config.json");
const db = require("../models/index.js");
const HttpError = require("../models/http-error");
const User = db.users;
const Post = db.posts;
const Comment = db.comments;

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
    const error = new HttpError(
      "Could not encode password, please try again later.",
      500
    );
  }

  let emailAvailable = false;

  // check for email availability
  try {
    existingUser = await User.findOne({ email: req.body.email });
  } catch (err) {
    emailAvailable = true;
  }

  if (!existingUser) {
    emailAvailable = true;
  }

  if (!emailAvailable) {
    res.send({ message: "email address already in use" });
    return;
  }

  // Create a new user
  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hashedPassword,
    userType: "user",
    posts: [],
    image: "",
    active: false,
    bio: "",
    location: "",
  });

  // Save user in the database
  try {
    await newUser.save();
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "An error occurred while creating a new user.",
      500
    );
    return next(error);
  }
  // sign authentication token
  let token;
  try {
    token = jwt.sign(
      { userId: newUser.id, email: newUser.email, userName: newUser.firstName },
      config.secret,
      { expiresIn: "1hr" }
    );
  } catch (err) {
    const error = new HttpError(
      "An error occured while creating authentication token, please try again later.",
      500
    );
    return next(error);
  }
  res.status(201).json({
    userId: newUser.id,
    email: newUser.email,
    userName: newUser.firstName,
  });
};

// user login
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;

  // check for user existence by email
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Login failed, please try again later.", 500);
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
    error = new HttpError("Login failed, password is incorrect.", 401);
    return next(error);
  }

  let token = "unverified";
  if (existingUser.active) {
    // sign authentication token
    try {
      token = jwt.sign(
        {
          userId: existingUser.id,
          email: existingUser.email,
          userType: existingUser.userType,
        },
        config.secret,
        { expiresIn: "1hr" }
      );
    } catch (err) {
      const error = new HttpError(
        "An error occured while creating authentication token, please try again later.",
        500
      );
      return next(error);
    }
  }
  // send back user info and token
  res.status(201).json({
    userId: existingUser.id,
    token: token,
    userName: existingUser.firstName,
    userType: existingUser.userType,
  });
};

// Retrieve all users
exports.findAll = async (req, res, next) => {
  const title = req.query.title;
  var condition = title
    ? { title: { $regex: new RegExp(title), $options: "i" } }
    : {};

  await User.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      const error = new HttpError(
        "An error occurred while retrieving users.",
        500
      );
      return next(error);
    });
};

// Find a user by ID
exports.findOne = async (req, res, next) => {
  const id = req.params.id;
  await User.findById(id)
    .populate({
      path: "posts",
      model: Post,
      populate: {
        path: "comments",
        model: Comment,
        populate: {
          path: "creatorID",
          model: User,
        },
      },
    })
    .then((data) => {
      if (!data) {
        const error = new HttpError("Could not find user with ID: " + id, 404);
        return next(error);
      } else {
        res.send({
          firstName: data.firstName,
          lastName: data.lastName,
          posts: [...data.posts],
          _id: data._id,
          id: data._id,
          image: data.image,
          active: data.active,
          joined: data.createdAt,
          bio: data.bio,
          location: data.location,
        });
      }
    })
    .catch((err) => {
      const error = new HttpError("Error retrieving user with ID: " + id, 500);
      return next(error);
    });
};

// find a user and only send back name and ID
exports.findOneLite = async (req, res, next) => {
  const id = req.params.id;
  await User.findById(id)
    .then((data) => {
      if (!data) {
        const error = new HttpError("Could not find user with ID: " + id, 404);
        return next(error);
      } else {
        const dataLite = {
          firstName: data.firstName,
          name: `${data.firstName} ${data.lastName}`,
          image: data.image,
          userType: data.userType,
          id: data.id,
          joined: data.createdAt,
        };
        res.send(dataLite);
      }
    })
    .catch((err) => {
      const error = new HttpError("Error retrieving user with ID: " + id, 500);
      return next(error);
    });
};

// Update a user by the id in the request
exports.update = async (req, res, next) => {
  if (!req.body) {
    const error = new HttpError("Cannot update empty data location.", 400);
    return next(error);
  }
  const id = req.params.id;

  const { firstName, lastName, location, bio } = req.body;

  if (req.userData.userId !== id && req.userData.userType !== "admin") {
    const error = new HttpError(
      "You aren't allowed to update someone else's profile.",
      401
    );
    return next(error);
  }

  let existingUser;

  // check for user existence by email
  try {
    existingUser = await User.findById(id);
  } catch (err) {
    const error = new HttpError(
      "Could not find user, please try again later.",
      500
    );
    return next(error);
  }

  // user doesn't exist
  if (!existingUser) {
    const error = new HttpError("User does not exist.", 401);
    return next(error);
  }

  if (
    (req.file && existingUser.image !== "") ||
    req.body.removeImage === "true"
  ) {
    fs.unlink(path.join("public", existingUser.image), (err) => {
      if (!err) {
        console.log("Image deleted for user " + id);
      } else {
        console.log("Image deletion error: " + err);
      }
    });
  }

  let newImage = "";

  if (req.body.removeImage === "true") {
    newImage = "";
  } else {
    if (req.file && req.file.path) {
      newImage = req.file.path.substring(6);
    } else if (existingUser.image) {
      newImage = existingUser.image;
    }
  }

  User.findByIdAndUpdate(
    id,
    {
      firstName,
      lastName,
      location,
      bio,
      image: newImage,
    },
    { useFindAndModify: false, omitUndefined: true }
  )
    .then((data) => {
      if (!data) {
        const error = new HttpError(
          `Cannot update user with ID: ${id}. It probably doesn't exist.`,
          404
        );
        return next(error);
      } else res.send({ message: `User ${id} updated successfully.` });
    })
    .catch((err) => {
      const error = new HttpError(
        "An error occured while updating user with ID: " + id,
        500
      );
      return next(error);
    });
};

// Delete a user with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        const error = new HttpError(
          "Cannot delete user with ID: ${id}. It probably doesn't exist.",
          404
        );
        return next(error);
      } else {
        res.send({
          message: "User deleted successfully.",
        });
      }
    })
    .catch((err) => {
      const error = new HttpError(
        "An error occured while deleting user with ID: ${id}.",
        500
      );
      return next(error);
    });
};

// Delete all users from the database
exports.deleteAll = (req, res) => {
  User.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} users were deleted successfully!`,
      });
    })
    .catch((err) => {
      const error = new HttpError(
        "An error occured while deleting all users.",
        500
      );
      return next(error);
    });
};
