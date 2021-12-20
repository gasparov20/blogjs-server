const db = require("./index.js");
const Comment = require("./comments-model.js");

module.exports = (mongoose) => {
  let schema = mongoose.Schema(
    {
      title: String,
      postBody: String,
      creatorID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      comments: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "comment",
        },
      ],
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const PendingPost = mongoose.model("PendingPost", schema);
  return PendingPost;
};
