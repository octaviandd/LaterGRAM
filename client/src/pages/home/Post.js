/** @format */

import React, { ReactElement, useEffect, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import EditDots from "../../utils/EditDots";
import CommentSVG from "../../../assets/svgs/CommentSVG";
import SaveSVG from "../../../assets/svgs/SaveSVG";
import LikedSVG from "../../../assets/svgs/LikedSVG";
import UnlikedHeart from "../../../assets/svgs/UnlikedHeartSVG";
import MessageSVG from "../../../assets/svgs/MessageSVG";
import Comments from "./PostComments";
import { LIKE_POST, UNLIKE_POST } from "../../graphql/Mutations";
import { GET_CURRENT_USER } from "../../graphql/Queries";
import { useQuery, useMutation } from "@apollo/client";
import Spinner from "../../utils/Spinner";

export default function HomeFeedPost({ post }) {
  const [currentPostLikes, setCurrentPostLikes] = useState(0);

  const {
    data: data2,
    loading: currentLoading,
    error: currentErro,
  } = useQuery(GET_CURRENT_USER);

  const [likePost, { error, loading }] = useMutation(LIKE_POST, {
    update(cache, { data: { likePost } }) {
      const data = cache.readQuery({ query: GET_CURRENT_USER });
      cache.writeQuery({
        query: GET_CURRENT_USER,
        data: {
          data: {
            ...data.data,
            likedPosts: data.data.likedPosts.concat(likePost),
          },
        },
      });
    },
    onCompleted(data) {
      setCurrentPostLikes(data.likePost.likes.length);
    },
  });

  const [unlikePost, { error: error2, loading: loading2 }] = useMutation(
    UNLIKE_POST,
    {
      update(cache, { data: { unlikePost } }) {
        const data = cache.readQuery({ query: GET_CURRENT_USER });
        console.log(unlikePost);
        cache.writeQuery({
          query: GET_CURRENT_USER,
          data: {
            data: {
              ...data.data,
              likedPosts: [
                data.data.likedPosts.filter((id) => id === unlikePost._id),
              ],
            },
          },
        });
      },
      onCompleted(data) {
        setCurrentPostLikes(data.unlikePost.likes.length);
      },
    }
  );

  // COMPONENT METHODS
  const likePostMethod = async () => {
    await likePost({ variables: { input: post._id } });
  };

  const unlikePostMethod = async () => {
    await unlikePost({ variables: { input: post._id } });
  };

  return (
    <Wrapper>
      <UserDetails>
        <div>
          <Link to={`profile/${post && post.author._id}`}>
            <img src={post && post.author.avatar} width="40" height="40" />
            <span>{post && post.author.username}</span>
          </Link>
        </div>
        <EditDots />
      </UserDetails>
      <PostImage>
        <img src={post && post.picture}></img>
      </PostImage>
      <PostOptions>
        <ButtonsContainer>
          <div>
            {data2 &&
            data2.data.likedPosts.some((el) => el._id === post._id) ? (
              <LikedButton onClick={() => unlikePostMethod()}>
                <LikedSVG />
              </LikedButton>
            ) : (
              <NotLikedButton onClick={() => likePostMethod()}>
                <UnlikedHeart />
              </NotLikedButton>
            )}
            <Link to={`post/${post && post._id}`}>
              <button>
                <CommentSVG />
              </button>
            </Link>
          </div>
        </ButtonsContainer>
        <LikesContainer>
          <a href="">
            {!currentPostLikes && post && post.likes.length > 0 ? (
              <span>
                {post.likes.length === 1
                  ? `${post.likes.length} like`
                  : `${post.likes.length} likes`}
              </span>
            ) : (
              <span>
                {currentPostLikes === 1
                  ? `${currentPostLikes} like`
                  : `${currentPostLikes} likes`}
              </span>
            )}
          </a>
        </LikesContainer>
        <Comments
          postComments={post && post.comments}
          id={post && post._id}
          username={post && post.author.username}
          author={post && post.author._id}
          description={post && post.description}
          createdAt={post && post.createdAt}
        ></Comments>
      </PostOptions>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 30px;
  border-radius: 6px;
  position: relative;
  border: none;
  -webkit-box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3),
    0 15px 12px rgba(0, 0, 0, 0.22);
  -moz-box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3),
    0 15px 12px rgba(0, 0, 0, 0.22);
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.2);
`;

const UserDetails = styled.div`
  background-color: #242526;
  height: 60px;
  width: 100%;
  border-left: 1px solid #201d1e;
  border-right: 1px solid #201d1e;
  border-top: 1px solid #201d1e;
  border-top-right-radius: 6px;
  border-top-left-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 15px;
  padding-right: 15px;
  position: relative;

  & > div {
    display: flex;
    align-items: center;
    position: relative;
    height: 60px;
    a {
      line-height: 60px;
      display: flex;
      font-size: 0;
      height: 60px;
      align-items: center;
      text-decoration: none;
      color: #e5e7ec;
      img {
        margin-right: 15px;
        border-radius: 50%;
        object-fit: cover;
      }
      span {
        line-height: 60px;
        font-size: 14px;
        font-weight: 800;
      }
    }
  }
`;

const PostImage = styled.div`
  display: flex;
  width: 100%;
  min-height: 500px;
  background-color: #242526;
  border-left: 0.5px solid #201d1e;
  border-right: 0.5px solid #201d1e;

  img {
    width: 100%;
    object-fit: cover;
  }
`;

const PostOptions = styled.div`
  display: flex;
  background-color: #242526;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-top: 5px;
  border-right: 1px solid #201d1e;
  border-left: 1px solid #201d1e;
  border-bottom: 1px solid #201d1e;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  position: relative;
`;

const ButtonsContainer = styled.div`
  padding-left: 10px;
  padding-top: 5px;
  padding-right: 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  div {
    display: flex;
    justify-content: space-around;
    button {
      cursor: pointer;
      background-color: inherit;
      border: none;
    }

    button:nth-of-type(2),
    button:nth-of-type(1) {
      margin-right: 10px;
    }
  }
`;

const LikesContainer = styled.div`
  display: flex;
  width: 100%;
  margin-top: 7.5px;
  padding-left: 10px;

  a {
    font-size: 14px;
    line-height: 18px;
    font-weight: 800;
    text-decoration: none;
    color: #e5e7ec;
  }
`;

const LikedButton = styled.button`
  background-color: #c609ec;
`;

const NotLikedButton = styled.button``;
