/** @format */

import React, { ReactElement } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { timer } from "../../utils/timer";
import Avatar from "../../../assets/profileimg.jpg";

export default function HomeFeedPostCommentsComment({ comment }) {
  const timerDifference = timer(Date.now(), Number(comment.createdAt));

  return (
    <Wrapper>
      <CommentLogo>
        <img src={Avatar}></img>
      </CommentLogo>
      <CommentSection>
        <div>
          <Link to={`/profile/${comment.author._id}`}>
            <span>{comment.author.username}</span>
          </Link>
          <span>{comment.content}</span>
        </div>
        <div>
          <Timer>{timerDifference && timerDifference}</Timer>
        </div>
      </CommentSection>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  padding: 15px 15px;
`;

const CommentLogo = styled.div`
  margin-right: 10px;
  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }
`;

const CommentSection = styled.div`
  display: flex;
  flex-direction: column;

  a {
    text-decoration: none;
    color: whitesmoke;
    font-weight: 600;
    margin-right: 4px;
    word-wrap: break-word;
  }

  span {
    word-wrap: break-word;
    color: whitesmoke;
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
