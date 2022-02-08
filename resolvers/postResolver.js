/** @format */

const auth = require("../auth");
const { authenticated } = auth;

const postResolver = {
  Query: {
    getPost: authenticated(async (_, { input }, { models }) => {
      const foundPost = await models.Post.findOne({ _id: input })
        .populate("author")
        .populate({ path: "comments", populate: { path: "author" } });
      console.log(foundPost);
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
        { useFindAndModify: false, new: true }
      );

      post.save();
      presentUser.save();
      return post;
    }),
    likePost: authenticated(async (_, { input }, { models, user }) => {
      const currentUser = await models.User.findOne({ _id: user._id });
      const postToBeLiked = await models.Post.findOneAndUpdate(
        { _id: input },
        { $addToSet: { likes: currentUser } },
        { useFindAndModify: false, new: true }
      );

      currentUser.updateOne(
        { $addToSet: { likedPosts: postToBeLiked } },
        { useFindAndModify: false, new: true }
      );

      currentUser.save();
      postToBeLiked.save();
      return postToBeLiked;
    }),
    unlikePost: authenticated(async (_, { input }, { models, user }) => {
      const currentUser = await models.User.findOne({ _id: user._id });
      const postToBeUnliked = await models.Post.findOneAndUpdate(
        { _id: input },
        { $pull: { likes: currentUser._id } },
        { useFindAndModify: false, new: true }
      );
      await currentUser.updateOne(
        { $pull: { likedPosts: postToBeUnliked._id } },
        { useFindAndModify: false, new: true }
      );

      currentUser.save();
      postToBeUnliked.save();
      return postToBeUnliked;
    }),
  },
};

module.exports = postResolver;
