/** @format */

const auth = require("../auth");
const { authenticated } = auth;

const postResolver = {
  Query: {
    getPost: authenticated(async (_, { input }, { models }) => {
      const foundPost = models.Post.findOne({ _id: input })
        .populate("author")
        .populate({ path: "comments", populate: { path: "author" } });
      return foundPost;
    }),
    getAllPosts: authenticated(async (_, __, { models }) => {
      const posts = await models.Post.find({})
        .populate("author")
        .populate({ path: "comments", populate: { path: "author" } });
      return posts;
    }),
  },
  Mutation: {
    createPost: authenticated(async (_, { input }, { models, user }) => {
      const presentUser = await models.User.findOne({ _id: user._id });
      const post = new models.Post({
        author: presentUser,
        description: input.description,
        picture: input.picture,
        createdAt: Date.now(),
        likes: [],
        comments: [],
      });

      presentUser.updateOne(
        { $addToSet: { posts: post } },
        { useFindAndModify: false, new: true },
        function (err, res) {
          if (err) console.log(err);
          return res;
        }
      );

      post.save();
      presentUser.save();
      return post;
    }),
    likePost: authenticated(async (_, { input }, { models, user }) => {
      const currentUser = await models.User.findOne({ _id: user.id });
      const postToBeLiked = await models.Post.findOneAndUpdate(
        { _id: input },
        { $addToSet: { likes: currentUser } },
        { useFindAndModify: false, new: true },
        (err, res) => {
          if (err) console.log(err);
          return res;
        }
      );

      currentUser.updateOne(
        { $addToSet: { likedPosts: postToBeLiked } },
        { useFindAndModify: false, new: true },
        function (err, res) {
          if (err) console.log(err);
          return res;
        }
      );

      return postToBeLiked;
    }),
    unlikePost: authenticated(async (_, { input }, { models, user }) => {
      const currentUser = await models.User.findOne({ _id: user.id });
      const postToBeUnliked = await models.Post.findOneAndUpdate(
        { _id: input },
        { $pull: { likes: currentUser._id } },
        { useFindAndModify: false, new: true },
        function (err, res) {
          if (err) console.log(err);
          return res;
        }
      );
      await currentUser.updateOne(
        { $pull: { likedPosts: postToBeUnliked._id } },
        { useFindAndModify: false, new: true },
        function (err, res) {
          if (err) console.log(err);
          return res;
        }
      );

      return postToBeUnliked;
    }),
  },
};

module.exports = postResolver;
