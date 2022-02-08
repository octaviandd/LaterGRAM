/** @format */

import React, { ReactElement, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import { timer } from "../../utils/Timer";
import { Link } from "react-router-dom";
import Comment from "./Comment";
import { GET_POST_COMMENTS } from "../../graphql/Queries";
import { NEW_COMMENT } from "../../graphql/Mutations";

import { useQuery, useMutation } from "@apollo/client";

export default function PostComments({
  id,
  username,
  author,
  description,
  createdAt,
}) {
  const [state, setState] = useState({
    inputValue: "",
    isInputActive: false,
  });

  const { data, loading, error } = useQuery(GET_POST_COMMENTS, {
    variables: { input: id },
  });

  const [createComment] = useMutation(NEW_COMMENT, {
    update(cache, { data: { createComment } }) {
      const data = cache.readQuery({
        query: GET_POST_COMMENTS,
        variables: { input: id },
      });
      cache.writeQuery({
        query: GET_POST_COMMENTS,
        variables: { input: id },
        data: {
          ...data,
          getPostComments: [createComment, ...data.getPostComments],
        },
      });
    },
  });

  const onSubmit = (content) => {
    createComment({
      variables: { input: { content, _id: id } },
    });
    setState((prevState) => ({
      ...prevState,
      inputValue: "",
    }));
  };

  useEffect(() => {
    if (state.inputValue !== "") {
      setState((prevState) => ({
        ...prevState,
        isInputActive: true,
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        isInputActive: false,
      }));
    }
  }, [state.inputValue]);

  const timerDifference = timer(Date.now(), Number(createdAt));

  return (
    <Wrapper>
      <div>
        <div>
          {username && <Link to={`/profile/${author}`}>{username}</Link>}
          <span>{description && description}</span>
        </div>
        {data &&
          data.getPostComments.map((comment) => {
            return <Comment comment={comment} key={uuidv4()}></Comment>;
          })}
        <Timer>{timerDifference && timerDifference}</Timer>
        <AddCommentsContainer>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit(e.target[0].value);
            }}
          >
            <input
              type="text"
              name="content"
              value={state.inputValue}
              onChange={(e) =>
                setState((prevState) => ({
                  ...prevState,
                  inputValue: e.target.value,
                }))
              }
            />
            <WriteCommentSpan active={state.isInputActive}>
              Add a comment..
            </WriteCommentSpan>
            <button type="submit">Post</button>
          </form>
        </AddCommentsContainer>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  & > div:nth-of-type(1) {
    padding-left: 10px;
    display: flex;
    flex-direction: column;
    margin-bottom: 4px;
    font-size: 14px;
    line-height: 18px;
    color: whitesmoke;

    a {
      font-weight: 800;
      text-decoration: none;
      color: whitesmoke;
      margin-right: 6px;
    }
  }
`;

const AddCommentsContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #dbdbdb;
  width: 100%;

  form {
    padding: 15px 10px;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  input {
    border: none;
    font-size: 14px;
    background-color: inherit;
    color: whitesmoke;

    &:focus {
      outline: none;
    }
  }

  button {
    font-size: 16px;
    background-color: transparent;
    color: #8f94fb;
    border: none;
    font-weight: 600;
    cursor: pointer;
  }
`;

const WriteCommentSpan = styled.span`
  left: 12.5px;
  position: absolute;
  color: whitesmoke;
  font-size: 14px;
  line-height: 18px;
  pointer-events: none;
  ${({ active }) =>
    active &&
    `
        display: none;
      `}
`;

const Timer = styled.time`
  padding-left: 10px;
  font-size: 10px;
  letter-spacing: 0.2px;
  line-height: 18px;
  text-transform: uppercase;
  margin-bottom: 4px;
  color: whitesmoke;
`;
