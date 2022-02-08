/** @format */
const { authenticated } = require("../auth");

const commentResolver = {
  Query: {
    getPostComments: authenticated(async (_, { input }, { models }) => {
      const allComments = await models.Comment.find({})
        .populate("author")
        .populate("parentPost");

      const comments = allComments.filter(
        (comment) => comment.parentPost._id.toString() === input
      );
      return comments;
    }),
  },
  Mutation: {
    createComment: authenticated(async (_, { input }, { models, user }) => {
      const parentUser = await models.User.findOne({ _id: user._id });
      const parentPost = await models.Post.findOne({
        _id: input._id,
      });

      const comment = new models.Comment({
        content: input.content,
        author: parentUser,
        parentPost: parentPost,
        createdAt: Date.now(),
        likes: [],
      });

      parentPost.updateOne(
        { $addToSet: { comments: comment } },
        { useFindAndModify: false, new: true },
        (res, err) => {
          console.log(res, err);
        }
      );

      comment.save();
      parentPost.save();
      return comment;
    }),
  },
};

module.exports = commentResolver;
