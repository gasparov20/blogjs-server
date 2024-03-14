const postsController = require("../controllers/posts-controller.js");
var router = require("express").Router();
const checkAuth = require("../middleware/check-auth");
const checkAdmin = require("../middleware/check-admin");

// Retrieve all posts
router.get("/all", postsController.findAll);

// get all comments for post
router.get("/:id/comments", postsController.findComments);

// Retrieve a single post with id
router.get("/:id", postsController.findOne);

// routes below are only accessible with a valid token
router.use(checkAuth);

// Create a new post
router.post("/create", postsController.create);

// delete comment by ID
router.delete("/:pid/comments/:cid", postsController.deleteComment);

// add comment
router.post("/:id/comments/add", postsController.addComment);

// Update a post with id
router.put("/:id", postsController.update);

// Delete a post with id
router.delete("/:id", postsController.delete);

// routes below are only accessible with admin token
router.use(checkAdmin);

// Retrieve all pending posts
router.get("/pending/all", postsController.findAllPending);

// Find one pending
router.get("/pending/all/:id", postsController.findOne);

// Count pending posts
router.get("/pending/count", postsController.pendingCount);

// Publish post by ID
router.put("/publish/:id", postsController.publishPost);

// Delete pending post by ID
router.delete("/pending/all/:id", postsController.deletePendingPost);

// Delete all posts
router.delete("/", postsController.deleteAll);

module.exports = router;
