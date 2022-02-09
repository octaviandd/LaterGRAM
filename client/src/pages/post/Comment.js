/** @format */

import React, { ReactElement } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { timer } from "../../utils/Timer";

export default function Comment({ comment }) {
  console.log(comment);
  const timeDifference = timer(Date.now(), comment.createdAt);
  return (
    <Wrapper>
      <CommentLogo>
        <img src={comment.author.avatar}></img>
      </CommentLogo>
      <CommentSection>
        <div>
          <Link to={`/profile/${comment.author._id}`}>
            <span>{comment.author.username}</span>
          </Link>
          <span>{comment.content}</span>
        </div>
        <div>
          <Timer>{timeDifference.replace("hours ago", "h")}</Timer>
        </div>
      </CommentSection>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 15px;
  color: ${(props) => props.theme.colors.textDefault};
`;

const CommentLogo = styled.div`
  margin-right: 10px;
  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const CommentSection = styled.div`
  display: flex;
  flex-direction: column;

  a {
    text-decoration: none;
    font-weight: 600;
    margin-right: 4px;
    word-wrap: break-word;
    color: ${(props) => props.theme.colors.textDefault};
  }

  span {
    color: ${(props) => props.theme.colors.textDefault};
    word-wrap: break-word;
  }
`;

const Timer = styled.time`
  font-size: 10px;
  letter-spacing: 0.2px;
  line-height: 18px;
  text-transform: uppercase;
  margin-bottom: 4px;
  color: ${(props) => props.theme.colors.textDefault};
`;
