/** @format */

const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    createdAt: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    posts: [
      {
        type: Schema.Types.Mixed,
        ref: "Post",
        required: true,
      },
    ],
    likedPosts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
        required: true,
      },
    ],
    images: {
      type: Array,
      required: true,
    },
    followers: [
      {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
    ],
    following: [
      {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
    ],
  },
  {
    collection: "Users",
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
