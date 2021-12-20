const usersController = require("../controllers/users-controller.js");
var router = require("express").Router();
const checkAuth = require("../middleware/check-auth");

// Create a new user
router.post("/register", usersController.create);

router.post("/login", usersController.login);

// Retrieve a single user with id, only return part of it
router.get("/:id", usersController.findOneLite);

// Retrieve a single user with id
router.get("/id/:id", usersController.findOne);

// following routes need to have an auth token attached to requests
router.use(checkAuth);

// Retrieve all users
router.get("/", usersController.findAll);

// Update a user with id
router.put("/:id", usersController.update);

// Delete a user with id
router.delete("/:id", usersController.delete);

module.exports = router;
