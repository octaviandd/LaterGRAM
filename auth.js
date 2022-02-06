/** @format */

const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server-errors");
const dotenv = require("dotenv");

dotenv.config();

let JWT_SECRET = process.env.JWT_SECRET;

const createToken = (id) => {
  const token = jwt.sign({ id }, JWT_SECRET, { expiresIn: "12h" });
  return token;
};

const getUserFromToken = (token) => {
  try {
    const user = jwt.verify(token, JWT_SECRET);
    return user;
  } catch (error) {
    throw new AuthenticationError("Invalid Token");
  }
};

const authenticated = (next) => (parent, args, context, info) => {
  if (!context.user) {
    throw new AuthenticationError("You need to authenticate");
  } else {
    return next(parent, args, context, info);
  }
};

const authorized = (role, next) => (root, args, context, info) => {
  if (context.user.role !== role) {
    throw new AuthenticationError(`You don't have the ${role} persmissions`);
  } else {
    return next(root, args, context, info);
  }
};

module.exports = {
  createToken,
  getUserFromToken,
  authenticated,
  authorized,
};
