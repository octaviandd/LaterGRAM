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
  },
};

module.exports = commentResolver;
