/** @format */

import React, { ReactElement, useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../navbar/Navbar";
import { timer } from "../../utils/Timer";
import Comment from "../home/CommentComments";
import {
  GET_POST,
  GET_CURRENT_USER,
  GET_POST_COMMENTS,
} from "../../graphql/Queries";
import { LIKE_POST, UNLIKE_POST, NEW_COMMENT } from "../../graphql/Mutations";
import { useQuery, useMutation } from "@apollo/client";
import Spinner from "../../utils/Spinner";

export default function Post({}) {
  const { id } = useParams();
  const [state, setState] = useState({
    inputValue: "",
    isInputActive: false,
  });
  console.log(id);

  const { data, loading, error } = useQuery(GET_POST, {
    variables: { input: id },
  });

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
  console.log(data);

  if (loading) return <Spinner />;

  if (data) {
    const timerDifference = timer(Date.now(), Number(data.getPost.createdAt));
    return (
      <Wrapper>
        <PostModal>
          <LeftColumn>
            <img src={`${data.getPost.picture}`}></img>
          </LeftColumn>
          <RightColumn>
            <UserProfile>
              <img src={`${data.getPost.author.avatar}`}></img>
              <p>{data.getPost.author.username}</p>
            </UserProfile>
            <PostDescription>
              <div>
                <div>
                  <img src={`${data.getPost.author.avatar}`}></img>
                </div>
                <div>
                  <div>
                    <Link to={`${data.getPost.author._id}`}>
                      {data.getPost.author.username}
                    </Link>
                    <span>{data.getPost.description}</span>
                  </div>
                  <div>
                    <Timer>{timerDifference}</Timer>
                  </div>
                </div>
              </div>
            </PostDescription>
            <CommentsList>
              {data.getPost.comments.map((comment) => {
                return <Comment comment={comment} />;
              })}
            </CommentsList>
          </RightColumn>
        </PostModal>
      </Wrapper>
    );
  } else {
    return <Spinner />;
  }
}

const PostModal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
`;

const Wrapper = styled.div`
  background-color: #18191a;
  height: 100vh;
`;

const LeftColumn = styled.div`
  position: relative;
  img {
    top: 0;
    left: 0;
    height: 600px;
    width: 600px;
    object-fit: cover;
  }
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  height: 600px;
  width: 300px;
  background: #242526;
`;

const UserProfile = styled.div`
  display: flex;
  width: 100%;
  border-bottom: 1px solid #dbdbdb;
  padding: 15px 15px;
  align-items: center;
  color: whitesmoke;
  img {
    width: 32px;
    height: 32px;
    margin-right: 12.5px;
    margin-left: 10px;
    border-radius: 50%;
  }
`;

const PostDescription = styled.div`
  display: flex;
  width: 100%;
  padding: 15px 15px;
  flex-direction: column;

  & > div:nth-of-type(1) {
    align-items: center;
    display: flex;

    & > div:nth-of-type(1) {
      margin-right: 10px;
      img {
        width: 32px;
        height: 32px;
        border-radius: 50%;
      }
    }
    & > div:nth-of-type(2) {
      a {
        font-weight: 600;
        word-wrap: break-word;
        margin-right: 4px;
        text-decoration: none;
        color: whitesmoke;
      }
      span {
        word-wrap: break-word;
        color: whitesmoke;
      }
    }
  }

  & > div:nth-of-type(2) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Timer = styled.time`
  font-size: 10px;
  letter-spacing: 0.2px;
  line-height: 18px;
  text-transform: uppercase;
  margin-bottom: 4px;
  color: whitesmoke;
`;

const CommentsList = styled.div`
  height: 350px;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #dbdbdb;
`;
