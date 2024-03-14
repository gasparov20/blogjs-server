const db = require("../models/index.js");
const Comment = require("../models/comments-model.js");

module.exports = (mongoose) => {
  let schema = mongoose.Schema(
    {
      title: { type: String, required: true },
      postBody: { type: String, required: true },
      creatorID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      comments: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Comment",
        },
      ],
      published: { type: Boolean, required: true },
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Post = mongoose.model("Post", schema);
  return Post;
};
