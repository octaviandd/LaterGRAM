/** @format */

import React, { useState, useCallback, useEffect, ReactElement } from "react";
import { useQuery } from "@apollo/client";
import ProfileDetails from "./Details";
import styled from "styled-components";
import ProfilePosts from "./Posts";
import { GET_USER_BY_ID } from "../../graphql/Queries";
import { useParams } from "react-router-dom";

export default function UserProfile({}) {
  const { id } = useParams();

  const {
    data: data,
    loading: loading,
    error: error,
  } = useQuery(GET_USER_BY_ID, {
    variables: { input: id },
  });
  return (
    <>
      <Wrapper>
        <ProfileDetails
          data={data}
          error={error}
          loading={loading}
        ></ProfileDetails>
        <Breakpoint>
          <span>
            <svg fill="white" height="12" viewBox="0 0 48 48" width="12">
              <path
                clipRule="evenodd"
                d="M45 1.5H3c-.8 0-1.5.7-1.5 1.5v42c0 .8.7 1.5 1.5 1.5h42c.8 0 1.5-.7 1.5-1.5V3c0-.8-.7-1.5-1.5-1.5zm-40.5 3h11v11h-11v-11zm0 14h11v11h-11v-11zm11 25h-11v-11h11v11zm14 0h-11v-11h11v11zm0-14h-11v-11h11v11zm0-14h-11v-11h11v11zm14 28h-11v-11h11v11zm0-14h-11v-11h11v11zm0-14h-11v-11h11v11z"
                fillRule="evenodd"
              ></path>
            </svg>
            <span>POSTS</span>
          </span>
        </Breakpoint>
        <ProfilePosts id={id}></ProfilePosts>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.section`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
  background-color: #18191a;
`;

const Breakpoint = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 20px;
  justify-content: center;
  color: white;
  span {
    position: relative;
    span {
      letter-spacing: 2px;
      font-size: 14px;
      margin-left: 5px;
    }
  }

  & > span:nth-of-type(1):after {
    content: "";
    width: 70px;
    top: -1px;
    height: 1px;
    color: black;
    display: block;
    position: absolute;
    background-color: black;
  }
`;
