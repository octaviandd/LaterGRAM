/** @format */

const auth = require("../auth");
const bcrypt = require("bcrypt");
const AWS = require("aws-sdk");
const salt = 10;
const { AuthenticationError } = require("apollo-server-express");

AWS.config.update({
  region: "eu-central-1",
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: "eu-central-1:df1bc5d5-1bee-4dab-b02f-283bf46d2db9",
  }),
});

const { authenticated } = auth;

const userResolver = {
  Query: {
    getMe: authenticated(async (parent, args, ctx) => {
      const { user } = ctx;
      const presentUser = await ctx.models.User.findOne({
        _id: user._id,
      })
        .populate({
          path: "following",
        })
        .populate("posts");
      return presentUser;
    }),
    getUserById: authenticated(async (root, args, ctx) => {
      const userToBeReturned = await ctx.models.User.findOne({
        _id: args.input,
      }).populate("posts");
      return userToBeReturned;
    }),
    getUsers: authenticated(async (root, args, ctx) => {
      const users = await ctx.models.User.find({});
      return users;
    }),
  },

  Mutation: {
    createUser: async (root, args, ctx) => {
      const { email, name, username, password } = args.input;
      const { models, createToken, res } = ctx;
      const existing = await models.User.findOne({
        email: email,
      });
      if (existing) {
        throw new AuthenticationError("User already exists");
      }

      const user = new models.User({
        name: name,
        password: await bcrypt.hash(password, salt),
        email: email,
        username: username,
        createdAt: Date.now(),
        avatar:
          "https://instagramcopy-octavian.s3.eu-central-1.amazonaws.com/44884218_345707102882519_2446069589734326272_n.jpg",
        posts: [],
        images: [],
        likedPosts: [],
        followers: [],
        following: [],
      });

      const token = createToken(user);
      user.save();
      return { user, token };
    },
    loginUser: async (root, args, ctx) => {
      const { models, createToken, res } = ctx;
      const { email, password } = args.input;

      const user = await models.User.findOne({ email: email });
      if (!user) {
        throw new AuthenticationError("User doesn't exist");
      }
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        throw new AuthenticationError("Invalid password");
      }
      const token = createToken(user);
      return { user, token };
    },
    changeAvatar: authenticated(async (_, { input }, { user, models }) => {
      const currentUser = await models.User.findOneAndUpdate(
        { _id: user._id },
        { avatar: input },
        { useFindAndModify: false, new: true }
      );
      console.log(currentUser);

      return currentUser;
    }),

    createComment: authenticated(async (_, { input }, { models, user }) => {
      const parentUser = await models.User.findOne({ _id: user.id });
      const parentPost = await models.Post.findOne({
        _id: input._id,
      });
      const comment = await new models.Comment({
        content: input.content,
        author: parentUser,
        parentPost: parentPost,
        createdAt: Date.now(),
        likes: [],
      });

      await comment.save();

      const findComment = await models.Comment.findOne({ _id: comment._id });
      parentPost.updateOne(
        { $addToSet: { comments: findComment } },
        { useFindAndModify: false, new: true },
        function (err, res) {
          if (err) console.log(err);
          return res;
        }
      );
      return comment;
    }),
    followUser: authenticated(async (_, { input }, { models, user }) => {
      const userToBeFollowed = await models.User.findOne({ _id: input });
      const currentUser = await models.User.findOneAndUpdate(
        { _id: user.id },
        { $addToSet: { following: userToBeFollowed } },
        { useFindAndModify: false, new: true },
        function (err, res) {
          if (err) console.log(err);
          return res;
        }
      );

      userToBeFollowed.updateOne(
        { $addToSet: { followers: currentUser } },
        { useFindAndModify: false, new: true },
        function (err, res) {
          if (err) console.log(err);
          return res;
        }
      );

      return userToBeFollowed;
    }),
    unfollowUser: authenticated(async (_, { input }, { user, models }) => {
      const userToBeUnfollowed = await models.User.findOne({ _id: input });
      const currentUser = await models.User.findOneAndUpdate(
        { _id: user.id },
        { $pull: { following: userToBeUnfollowed._id } },
        { useFindAndModify: false, new: true },
        function (err, res) {
          if (err) console.log(err);
          return res;
        }
      );
      userToBeUnfollowed.updateOne(
        { $pull: { followers: currentUser._id } },
        { useFindAndModify: false, new: true },
        function (err, res) {
          if (err) console.log(err);
          return res;
        }
      );

      return userToBeUnfollowed;
    }),
  },
};

module.exports = userResolver;
