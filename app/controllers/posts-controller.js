const db = require("../models/index.js");
const HttpError = require("../models/http-error");
const Post = db.posts;
const Comment = db.comments;


// Create a new post
exports.create = async (req, res, next) => {
  // Validate request
  if (!req.body.title || !req.body.postBody) {
    res.status(400).send({ message: "Content can not be empty." });
    return;
  }

  // Create a new post
  const post = new Post({
    title: req.body.title,
    postBody: req.body.postBody,
    creator: req.body.creator,
    creatorID: req.body.creatorID,
    numComments: 0
  });

  // Save post in the database
  await post
    .save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      const error = new HttpError("An error occurred while creating the post.", 500);
      return next(error);
    });
    
  };

// Retrieve all posts
exports.findAll = async (req, res, next) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
  await Post.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      const error = new HttpError("An error occurred while retrieving posts.", 500);
      return next(error);
    });
};

// Retrieve all comments for a post
exports.findComments = async (req, res, next) => {
  const id = req.params.id;
  const post = await Post.findById(id).populate('comments');

  if (post) {
    if (post.comments) {
      res.send(post.comments);
    } else {
      const error = new HttpError("Could not find comments for post with ID: " + id, 404);
      return next(error);
    }
    
  } else {    
    const error = new HttpError("Could not find post with ID: " + id, 404);
    return next(error);
  }
};

// delete a comment
exports.deleteComment = async (req, res, next) => {
  // post ID
  const pid = req.params.pid;
  // comment ID
  const cid = req.params.cid;

  // delete the comment
  try {
    await Comment.findByIdAndRemove(cid);
  } catch (err) {
    const error = new HttpError("Could not delete comment with ID: " + id, 500);
    return next(error);
  }

  // pull the reference to the comment from the post document
  try {
    const post = await Post.findOneAndUpdate({ _id: pid }, {
        $pull: {
            'comments': cid
        }
    }).populate('comments');

    // send rest of comments for post
    res.send(post.comments);

  } catch (err) {
    const error = new HttpError("Could not remove comment from post with ID: " + id, 500);
    return next(error);
  }
}

// create a new comment for a post
exports.addComment = async (req, res, next) => {
  const id = req.params.id;

  const newComment = new Comment({
    comment: req.body.comment,
    creatorID: req.body.creatorID,
    creator: req.body.creator
  })

  // save the new comment
  newComment.save().catch(err => {
    const error = new HttpError("Could not save comment for post: " + id, 500);
    return next(error);
  })

  // find the post to attach the comment to
  const post = await Post.findById(id);

  // populate the reference field if not populated
  if (!post.populated('comments')) {
    await post.populate('comments');
  }

  // add reference to new comment
  post.comments[post.comments.length] = newComment;

  // save post and send the resulting comments
  post.save()
  .then(data => {
    res.status(201).send(data.comments)
  })
  .catch(err => {
    const error = new HttpError("Error adding comment to post with ID: " + id, 500);
    return next(error);
  });
};

// Find a single post by ID
exports.findOne = async (req, res, next) => {
    const id = req.params.id;
    await Post.findById(id)
      .then(data => {
        if (!data) {
          const error = new HttpError("Could not find post with ID: " + id, 404);
          return next(error);
        }
        else res.send(data);
      })
      .catch(err => {
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
        .then(data => {
          if (!data) {
            const error = new HttpError("Cannot update post with ID: ${id}. It probably doesn't exist.", 404);
            return next(error);
          } else res.send({ message: "Post ${id} updated successfully." });
        })
        .catch(err => {
          const error = new HttpError("An error occured while updating post with ID: " + id, 500);
          return next(error);
        });
};

// Delete a post by id
exports.delete = async (req, res) => {
    const id = req.params.id;

    await Post.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          const error = new HttpError("Cannot delete post with ID: ${id}. It probably doesn't exist.", 404);
          return next(error);
        } else {
          res.send({
            message: "Post deleted successfully."
          });
        }
      })
      .catch(err => {
          const error = new HttpError("An error occured while deleting post with ID: ${id}.", 500);
          return next(error);
      });
};

// Delete all posts from the database
exports.deleteAll = async (req, res) => {
  await Post.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} posts were deleted successfully!`
      });
    })
    .catch(err => {
        const error = new HttpError("An error occured while deleting all posts.", 500);
        return next(error);
    });
};