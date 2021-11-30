const postsController = require("../controllers/posts-controller.js");
var router = require("express").Router();
const HttpError = require ('../models/http-error');

// Create a new post
router.post("/create", postsController.create);

// Retrieve all posts
router.get("/all", postsController.findAll);

// get all comments for post
router.get("/:id/comments", postsController.findComments);

// delete comment by ID
router.delete("/:pid/comments/:cid", postsController.deleteComment);

// add comment
router.post("/:id/comments/add", postsController.addComment);

// Retrieve a single post with id
router.get("/:id", postsController.findOne);

// Update a post with id
router.put("/:id", postsController.update);

// Delete a post with id
router.delete("/:id", postsController.delete);

// Create a new post
router.delete("/", postsController.deleteAll);

module.exports = router;