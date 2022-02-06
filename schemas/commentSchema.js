/** @format */
const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    parentPost: {
      type: Schema.Types.ObjectId,
      ref: "Post",
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
  },
  {
    collection: "Comments",
  }
);

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
