/** @format */

import React, { ReactElement } from "react";
import styled from "styled-components";
// import Navbar from "../components/navbar";
import { GET_ALL_POSTS, GET_CURRENT_USER } from "../../graphql/queries";
import { useQuery } from "@apollo/client";
import Spinner from "../../utils/spinner";
import HeartSVG from "../../../assets/svgs/LikedSVG";
import CommentSVG from "../../../assets/svgs/UnlikedHeartSVG";
import { Link } from "react-router-dom";

export default function Explore({}) {
  const { data, error, loading } = useQuery(GET_ALL_POSTS);

  console.log(data);

  if (loading) return <Spinner />;

  const shuffledPostsArray = data.data.slice();
  function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    return a;
  }

  shuffle(shuffledPostsArray);

  return (
    <>
      <MainContainer>
        <Container>
          {shuffledPostsArray.map((post) => {
            return (
              <Post key={post._id}>
                <Link to={`/post/${post._id}`}>
                  <img src={post.picture} />
                </Link>
                <PostDetails>
                  <span>
                    <HeartSVG />
                    <span>{post.likes.length}</span>
                  </span>
                  <span>
                    <CommentSVG />
                    <span>{post.comments.length}</span>
                  </span>
                </PostDetails>
              </Post>
            );
          })}
        </Container>
      </MainContainer>
    </>
  );
}

const MainContainer = styled.div`
  background-color: #18191a;
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  max-width: 975px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 1fr;
  justify-content: space-between;
  margin-top: 25px;
  grid-gap: 25px;
`;

const PostDetails = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-around;
  align-items: center;
  display: none;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;

  & > span {
  }

  span {
    color: white;
    svg {
      fill: white;
    }
  }
`;

const Post = styled.div`
  flex: 0 0 auto;
  position: relative;
  cursor: pointer;
  height: 370px;

  img {
    object-fit: cover;
    height: 100%;
    width: 100%;
  }

  &:hover {
    ${PostDetails} {
      display: block;
    }
    img {
      opacity: 0.5;
    }
  }
`;
