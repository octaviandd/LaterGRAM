/** @format */

import gql from "graphql-tag";

export const NEW_USER = gql`
  mutation RegisterUserMutation($input: RegisterInput!) {
    createUser(input: $input) {
      user {
        _id
        name
        username
        email
        avatar
        createdAt
        likedPosts {
          _id
        }
        posts {
          _id
        }
      }
      token
    }
  }
`;

export const LOGIN_USER = gql`
  mutation GetUserMutation($input: LoginInput!) {
    loginUser(input: $input) {
      user {
        _id
        email
        name
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
        }
        followers {
          _id
        }
      }
      token
    }
  }
`;

export const CREATE_POST = gql`
  mutation CreatePost($input: NewPostInput!) {
    createPost(input: $input) {
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

export const SINGLE_UPLOAD = gql`
  mutation ($file: Upload!) {
    singleUpload(file: $file) {
      filename
      mimetype
      encoding
      uri
    }
  }
`;

export const CHANGE_AVATAR = gql`
  mutation ($input: String!) {
    changeAvatar(input: $input) {
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

export const NEW_COMMENT = gql`
  mutation CreateComment($input: NewCommentInput!) {
    createComment(input: $input) {
      _id
      content
      parentPost {
        _id
      }
      author {
        _id
        username
        avatar
        name
      }
      createdAt
      likes {
        _id
      }
    }
  }
`;

export const FOLLOW_USER = gql`
  mutation FollowUser($input: ID!) {
    followUser(input: $input) {
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

export const UNFOLLOW_USER = gql`
  mutation UnfollowUser($input: ID!) {
    unfollowUser(input: $input) {
      _id
    }
  }
`;

export const LIKE_POST = gql`
  mutation LikePost($input: ID!) {
    likePost(input: $input) {
      _id
      createdAt
      likes {
        _id
      }
    }
  }
`;

export const UNLIKE_POST = gql`
  mutation UnlikePost($input: ID!) {
    unlikePost(input: $input) {
      _id
      createdAt
      likes {
        _id
      }
    }
  }
`;

export const LIKE_COMMENT = gql`
  mutation LikeComment($input: ID!) {
    likeComment(input: $input) {
      _id
    }
  }
`;

export const UNLIKE_COMMENT = gql`
  mutation unlikeComment($input: ID!) {
    unlikeComment(input: $input) {
      _id
    }
  }
`;
