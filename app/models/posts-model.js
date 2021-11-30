const db = require("../models/index.js");
const Comment = require("../models/comments-model.js");

module.exports = mongoose => {
  let schema = mongoose.Schema(
    {
      title: String,
      postBody: String,
      creator: String,
      creatorID: String,
      numComments: Number,
      comments: {
         type: [mongoose.Schema.Types.ObjectId],
         ref: 'comment'
    },
      reactions: []
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Post = mongoose.model("post", schema);
  return Post;
};