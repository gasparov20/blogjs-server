module.exports = (mongoose) => {
  let schema = mongoose.Schema(
    {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      image: { type: String },
      userType: { type: String, required: true },
      posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
      active: { type: Boolean, required: true },
      code: { type: String },
      bio: { type: String },
      location: { type: String },
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const User = mongoose.model("User", schema);
  return User;
};
