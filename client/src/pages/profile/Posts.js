/** @format */

import { useQuery } from "@apollo/client";
import React, { ReactElement } from "react";
import styled from "styled-components";
import { GET_CURRENT_USER, GET_USER_BY_ID } from "../../graphql/Queries";
import Spinner from "../../utils/Spinner";

export default function ProfilePosts({ id }) {
  const {
    data: data,
    loading: loading,
    error: error,
  } = useQuery(GET_USER_BY_ID, {
    variables: { input: id },
  });

  console.log(data);

  if (error) return <div>error</div>;
  if (loading) return <Spinner></Spinner>;

  const { posts } = data.data;

  return (
    <Wrapper>
      <ImagesGrid>
        {posts &&
          posts.map((post) => {
            return (
              <img key={post._id} src={`${post.picture}`} alt={post._id}></img>
            );
          })}
      </ImagesGrid>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  padding: 25px 0px;
  width: 100%;
  color: #e5e7ec;
  background-color: #18191a;
  max-width: 955px;
`;

const ImagesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 300px));
  width: 100%;
  grid-gap: 20px;
  img {
    width: 100%;
    max-height: 100%;
    object-fit: cover;
  }
`;
