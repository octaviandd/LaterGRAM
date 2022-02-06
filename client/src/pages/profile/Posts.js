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

  if (error) return <div>error</div>;
  if (loading) return <Spinner></Spinner>;

  const { posts } = data.data;

  console.log(data);

  return (
    <Wrapper>
      <div>
        <ImagesGrid>
          {posts &&
            posts.map((post) => {
              return (
                <img
                  key={post._id}
                  src={`${post.picture}`}
                  alt={post._id}
                ></img>
              );
            })}
        </ImagesGrid>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  padding: 25px 0px;
  max-width: 955px;
  width: 100%;
  color: #e5e7ec;
`;

const ImagesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  grid-gap: 20px;
  img {
    object-fit: cover;
    width: 300px;
    height: 300px;
  }
`;
