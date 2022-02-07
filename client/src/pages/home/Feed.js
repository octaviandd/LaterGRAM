/** @format */

import React, { ReactElement } from "react";
import styled from "styled-components";
import HomeFeedPost from "./Post";
import { useQuery } from "@apollo/client";
import { GET_ALL_POSTS, GET_CURRENT_USER } from "../../graphql/Queries";
import Spinner from "../../utils/Spinner";
import HomeFeedPostGenerator from "./PostGenerator";

const compare = (a, b) => {
  const timeA = a.createdAt.toUpperCase();
  const timeB = b.createdAt.toUpperCase();

  let comparison = 0;
  if (timeA > timeB) {
    comparison = -1;
  } else if (timeA < timeB) {
    comparison = 1;
  }
  return comparison;
};

export default function HomeFeed({}) {
  const { data, error, loading } = useQuery(GET_ALL_POSTS);
  const { data: currentUser } = useQuery(GET_CURRENT_USER);

  if (error) return <div>errror</div>;
  if (loading) return <Spinner />;

  const { following, _id: currentUserID } = currentUser.data;
  const postsArray = data.getAllPosts;

  const newArr = postsArray.slice();
  newArr.sort(compare);

  return (
    <Wrapper>
      <HomeFeedPostGenerator></HomeFeedPostGenerator>
      {newArr &&
        newArr
          .filter(
            (user) =>
              following.find(({ _id }) => user.author._id === _id) ||
              user._id !== currentUserID
          )
          .map((post) => {
            return <HomeFeedPost key={post._id} post={post && post} />;
          })}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 75px;
`;
