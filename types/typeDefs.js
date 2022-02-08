/** @format */
const { gql } = require("apollo-server-express");

const typeDefs = gql`
  enum Role {
    OWNER
    MEMBER
  }

  scalar Upload

  type Image {
    _id: ID!
    url: String!
    author: User!
  }

  type Post {
    _id: ID!
    author: User!
    description: String!
    createdAt: String!
    picture: String!
    likes: [User]!
    comments: [Comment]!
  }

  type Comment {
    _id: ID!
    content: String!
    author: User!
    parentPost: User!
    createdAt: String!
    likes: [User]!
  }

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }

  type Query {
    getMe: User!
    getUserById(input: ID!): User!
    getUsers: [User]!
    getAllPosts: [Post]!
    getUserPosts(input: ID!): [Post]!
    getPost(input: ID!): Post!
    getPostComments(input: ID!): [Comment]!
    getFollowers(input: ID!): [User]!
    getFollowedUsers(input: ID!): [User]!
  }

  type Mutation {
    unfollowUser(input: ID!): User!
    singleUpload(file: Upload!): File!
    createPost(input: NewPostInput!): Post!
    createUser(input: RegisterInput!): AuthUser!
    loginUser(input: LoginInput!): AuthUser!
    createComment(input: NewCommentInput!): Comment!
    likePost(input: ID!): Post!
    likeComment(input: ID!): Comment!
    followUser(input: ID!): User!
    unlikePost(input: ID!): Post!
    changeAvatar(input: String!): User!
  }

  # USER && AUTH
  type User {
    _id: ID!
    email: String!
    password: String!
    name: String!
    username: String!
    createdAt: String!
    age: Int!
    avatar: String!
    posts: [Post]!
    likedPosts: [Post]!
    images: [Image]!
    followers: [User]!
    following: [User]!
    # role: Role!
  }

  type AuthUser {
    token: String!
    user: User!
  }
  # USER && AUTH

  # Authentication INPUT

  input RegisterInput {
    email: String!
    name: String!
    password: String!
    username: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  # Authentication INPUT

  # POST && COMMENT INPUT

  input NewPostInput {
    description: String!
    picture: String!
  }

  input NewCommentInput {
    content: String!
    _id: ID!
  }

  # POST && COMMENT INPUT
`;

module.exports = typeDefs;
