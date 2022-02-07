/** @format */

const express = require("express");
const cors = require("cors");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const merge = require("lodash.merge");
const postResolver = require("./resolvers/postResolver");
const commentResolver = require("./resolvers/commentResolver");
const userResolver = require("./resolvers/userResolver");
const User = require("./schemas/userSchema");
const Post = require("./schemas/postSchema");
const Comment = require("./schemas/commentSchema");
const typeDefs = require("./types/typeDefs");
const auth = require("./auth");
const { createToken, getUserFromToken } = auth;

const resolvers = merge({}, userResolver, postResolver, commentResolver);
let models = { User, Comment, Post };

const startServer = async () => {
  const app = express();

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", true);
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      const token = req.headers.authorization;
      const user = getUserFromToken(token);
      return { user, models, createToken };
    },
  });

  await server.start();

  server.applyMiddleware({
    app,
    cors: { origin: "*", credentials: true },
    onHealthCheck: () => {
      new Promise((resolve, reject) => {
        if (mongoose.connection.readyState > 0) {
          resolve();
        } else {
          reject();
        }
      });
    },
  });
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    console.log(error);
  }
  app.listen({ port: 4000 }, (port) => {
    console.log("running");
  });
};

startServer();
