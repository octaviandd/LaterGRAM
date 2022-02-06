/** @format */
const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const postSchema = new Schema(
  {
    description: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdAt: {
      type: String,
      required: true,
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    collection: "Posts",
  }
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
