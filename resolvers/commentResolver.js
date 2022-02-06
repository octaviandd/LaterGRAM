/** @format */
const commentResolver = {
  Query: {
    getPostComments: () => {
      return " hello";
    },
  },
  Mutation: {
    createComment: () => {
      return "hey";
    },
  },
};

module.exports = commentResolver;
