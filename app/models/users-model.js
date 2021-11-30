module.exports = mongoose => {
    let schema = mongoose.Schema(
      {
        firstName: String,
        lastName: String,
        email: String,
        password: String,
        numPosts: Number,
        userType: String
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const User = mongoose.model("user", schema);
    return User;
  };