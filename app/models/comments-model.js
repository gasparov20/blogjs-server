const db = require("../models/index.js");

module.exports = mongoose => {
  let schema = mongoose.Schema(
    {
        comment: String,
        creatorID: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
        creator: String,
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Comment = mongoose.model("comment", schema);
  return Comment;
};
