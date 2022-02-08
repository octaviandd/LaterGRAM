/** @format */

import gql from "graphql-tag";

export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    data: getMe {
      _id
      name
      email
      username
      createdAt
      avatar
      posts {
        _id
      }
      likedPosts {
        _id
      }
      following {
        _id
        username
        posts {
          _id
          picture
          description
          likes {
            _id
          }
          author {
            _id
          }
          comments {
            _id
            content
            author {
              _id
              username
            }
          }
        }
      }
      followers {
        _id
      }
    }
  }
`;

export const GET_USERS = gql`
  query GetUsers {
    getUsers {
      _id
      name
      username
      email
      createdAt
      avatar
      posts {
        _id
      }
      likedPosts {
        _id
      }
      followers {
        _id
      }
      following {
        _id
      }
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query GetUser($input: ID!) {
    data: getUserById(input: $input) {
      _id
      name
      email
      username
      createdAt
      avatar
      posts {
        _id
        picture
      }
      likedPosts {
        _id
      }
      following {
        _id
      }
      followers {
        _id
      }
    }
  }
`;

export const GET_ALL_POSTS = gql`
  query {
    getAllPosts {
      picture
      _id
      description
      createdAt
      likes {
        _id
      }
      author {
        _id
        username
        avatar
      }
      comments {
        _id
        content
        author {
          _id
          avatar
          username
        }
      }
    }
  }
`;

export const GET_POST_COMMENTS = gql`
  query GetPostComments($input: ID!) {
    getPostComments(input: $input) {
      _id
      content
      author {
        _id
        username
        avatar
      }
      parentPost {
        _id
      }
      createdAt
      likes {
        _id
      }
    }
  }
`;

export const GET_POST = gql`
  query GetPost($input: ID!) {
    getPost(input: $input) {
      _id
      picture
      createdAt
      likes {
        _id
      }
      description
      author {
        _id
        username
        avatar
      }
      comments {
        _id
        content
        createdAt
        author {
          username
          avatar
        }
      }
    }
  }
`;
