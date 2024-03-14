const db = require("../models/index.js");
const HttpError = require("../models/http-error");
const Comment = db.comments;
const Post = db.posts;
const PendingPost = db.pendingposts;
const User = db.users;

// Create a new (pending) post
exports.create = async (req, res, next) => {
  // Validate request
  if (!req.body.title || !req.body.postBody) {
    res.status(400).send({ message: "Content can not be empty." });
    return;
  }

  // Create a new (pending) post
  const post = new Post({
    title: req.body.title,
    postBody: req.body.postBody,
    creatorID: req.body.creatorID,
    published: false,
  });

  // Save post in the database
  await post
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      const error = new HttpError(
        "An error occurred while creating the post.",
        500
      );
      return next(error);
    });
};

// Retrieve all published posts
exports.findAll = async (req, res, next) => {
  // find posts, populate creators and comments, then send
  await Post.find({ published: true })
    .populate({
      path: "creatorID",
      model: User,
    })
    .populate({
      path: "comments",
      model: Comment,
      populate: {
        path: "creatorID",
        model: User,
      },
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      const error = new HttpError(
        "An error occurred while retrieving posts.",
        500
      );
      return next(error);
    });
};

// Retrieve all pending posts
exports.findAllPending = async (req, res, next) => {
  // find posts, populate creators, then send
  await Post.find({ published: false })
    .populate({
      path: "creatorID",
      model: User,
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      const error = new HttpError(
        "An error occurred while retrieving posts.",
        500
      );
      return next(error);
    });
};

// Flip published flag on post
exports.publishPost = async (req, res, next) => {
  const id = req.params.id;
  let post;
  await Post.findByIdAndUpdate({ _id: id }, { published: true })
    .catch((err) => {
      const error = new HttpError(
        "An error occurred while publishing the post.",
        500
      );
    })
    .then((data) => {
      post = data;
    });

  let user = await User.findById(post.creatorID).catch((err) => {
    const error = new HttpError(
      "An error occurred while finding the creator of the post.",
      500
    );
    return next(error);
  });

  if (!user.populated) {
    await user.populate("posts");
  }
  // Add reference to post to user
  user.posts[user.posts.length] = post;

  await user.save().catch((err) => {
    const error = new HttpError(
      "An error occurred while publishing the post.",
      500
    );
    return next(error);
  });

  res.status(201).send({ message: "Post published successfully." });
};

// Delete pending post
exports.deletePendingPost = async (req, res, next) => {
  const id = req.params.id;

  await Post.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        const error = new HttpError(
          `Cannot delete post with ID: ${id}. It probably doesn't exist.`,
          404
        );
        return next(error);
      } else {
        res.send({
          message: "Post deleted successfully.",
        });
      }
    })
    .catch((err) => {
      const error = new HttpError("Cannot delete post with ID: ${id}.", 500);
    });
};

// Get pending post count
exports.pendingCount = async (req, res, next) => {
  await Post.countDocuments({ published: false })
    .then((data) => {
      res.send({ count: data });
    })
    .catch((err) => {
      const error = new HttpError(
        "An error occurred while retrieving posts.",
        500
      );
      return next(error);
    });
};

// Retrieve all comments for a post
exports.findComments = async (req, res, next) => {
  const id = req.params.id;
  let post;

  post = await Post.findOne({ _id: id })
    .populate({
      path: "comments",
      model: Comment,
      populate: {
        path: "creatorID",
        model: User,
      },
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      const error = new HttpError(
        "An error occurred while retrieving posts.",
        500
      );
      return next(error);
    });
};

// delete a comment
exports.deleteComment = async (req, res, next) => {
  const pid = req.params.pid;
  const cid = req.params.cid;

  let comment;
  try {
    comment = await Comment.findById(cid);
  } catch (err) {
    const error = new HttpError("Could not find comment with ID: " + id, 500);
    return next(error);
  }

  if (comment.creatorID.toString() !== req.userData.userId) {
    const error = new HttpError(
      "You aren't allowed to delete someone else's comment.",
      401
    );
    return next(error);
  }

  try {
    await Comment.findByIdAndRemove(cid);
  } catch (err) {
    const error = new HttpError("Could not remove comment with ID: " + id, 500);
    return next(error);
  }

  // pull the reference to the comment from the post document
  try {
    const post = await Post.findOneAndUpdate(
      { _id: pid },
      {
        $pull: {
          comments: cid,
        },
      }
    )
      .populate({
        path: "creatorID",
        model: User,
      })
      .populate({
        path: "comments",
        model: Comment,
        populate: {
          path: "creatorID",
          model: User,
        },
      });

    // send rest of comments for post
    res.send(post.comments);
  } catch (err) {
    const error = new HttpError(
      "Could not remove comment from post with ID: " + id,
      500
    );
    return next(error);
  }
};

// Add a new comment to a post
exports.addComment = async (req, res, next) => {
  const id = req.params.id;

  const newComment = new Comment({
    comment: req.body.comment,
    creatorID: req.body.creatorID,
  });

  // save the new comment
  await newComment.save().catch((err) => {
    const error = new HttpError("Could not save comment for post: " + id, 500);
    return next(error);
  });

  // find the post to attach the comment to
  let post = await Post.findById(id);

  //populate the reference field if not populated
  if (!post.populated("comments")) {
    await post.populate("comments");
  }

  // add reference to new comment
  post.comments[post.comments.length] = newComment;

  // save post and send the resulting comments
  await post.save().catch((err) => {
    const error = new HttpError(
      "Error adding comment to post with ID: " + id,
      500
    );
    return next(error);
  });

  post = await Post.findById(id).populate({
    path: "comments",
    model: Comment,
    populate: {
      path: "creatorID",
      model: User,
    },
  });

  res.send(post.comments);
};

// Find a single post by ID
exports.findOne = async (req, res, next) => {
  const id = req.params.id;
  await Post.findById(id)
    .then((data) => {
      if (!data) {
        const error = new HttpError("Could not find post with ID: " + id, 404);
        return next(error);
      } else res.send(data);
    })
    .catch((err) => {
      const error = new HttpError("Error retrieving post with ID: " + id, 500);
      return next(error);
    });
};

// Update a post by id
exports.update = async (req, res, next) => {
  if (!req.body) {
    const error = new HttpError("Cannot update empty data location.", 400);
    return next(error);
  }

  const id = req.params.id;

  await Post.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        const error = new HttpError(
          "Cannot update post with ID: ${id}. It probably doesn't exist.",
          404
        );
        return next(error);
      } else res.send({ message: "Post ${id} updated successfully." });
    })
    .catch((err) => {
      const error = new HttpError(
        "An error occured while updating post with ID: " + id,
        500
      );
      return next(error);
    });
};

// Delete a post by id
exports.delete = async (req, res, next) => {
  const id = req.params.id;

  console.log(req.userData);
  console.log(req.body);

  if (
    req.userData.userId !== req.body.creatorID &&
    req.userData.userType !== "admin"
  ) {
    const error = new HttpError("You aren't allowed to delete this post.", 401);
    return next(error);
  }

  await Post.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        const error = new HttpError(
          "Cannot delete post with ID: ${id}. It probably doesn't exist.",
          404
        );
        return next(error);
      } else {
        res.send({
          message: "Post deleted successfully.",
        });
      }
    })
    .catch((err) => {
      const error = new HttpError(
        "An error occured while deleting post with ID: ${id}.",
        500
      );
      return next(error);
    });
};

// Delete all posts from the database
exports.deleteAll = async (req, res, next) => {
  if (req.body.userType !== "admin") {
    const error = new HttpError("You aren't allowed to delete all posts.", 401);
    return next(error);
  }

  await Post.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} posts were deleted successfully!`,
      });
    })
    .catch((err) => {
      const error = new HttpError(
        "An error occured while deleting all posts.",
        500
      );
      return next(error);
    });
};
