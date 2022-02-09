/** @format */

import React, { ReactElement, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Avatar from "../../../assets/profileimg.jpg";
import { FOLLOW_USER } from "../../graphql/Mutations";
import { GET_CURRENT_USER } from "../../graphql/Queries";
import { useMutation } from "@apollo/client";
import Spinner from "../../utils/Spinner";

export default function HomeFriendsFriend({ user }) {
  const [isFollowing, follow] = useState(false);
  const [followUser, { error, loading }] = useMutation(FOLLOW_USER, {
    update(cache, { data: { followUser } }) {
      const data = cache.readQuery({ query: GET_CURRENT_USER });
      console.log(data);
      console.log(followUser);
      cache.writeQuery({
        query: GET_CURRENT_USER,
        data: {
          data: {
            ...data.data,
            following: data.data.following.concat(followUser),
          },
        },
      });
    },
  });

  // COMPONENT METHODS
  const onButtonClick = () => {
    follow(true);
    followUser({ variables: { input: user._id } });
  };

  // ERROR HANDLING
  if (loading) return <Spinner />;
  if (error) return <div>error</div>;

  return (
    <Wrapper>
      <div>
        <div>
          <Link to={`/profile/${user._id}`}>
            <img src={user.avatar} alt={`${user.username} avatar`}></img>
          </Link>
          <Link to={`/profile/${user._id}`}>{user.username}</Link>
        </div>
        <button onClick={() => onButtonClick()}>
          {isFollowing ? `Following` : `Follow`}
        </button>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  div {
    button {
      position: relative;
      border: none;
      font-weight: bold;
      font-size: 12px;
      cursor: pointer;
      padding: 5px;
      border-radius: 5px;
      background-color: ${(props) => props.theme.colors.buttonPrimary};
      color: #fff;
    }

    div {
      a {
        text-decoration: none;
        font-size: 14px;
        line-height: 18px;
        font-size: 14px;
        font-weight: bold;
        color: ${(props) => props.theme.colors.textDefault};

        img {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          object-fit: cover;
        }
      }
      img {
        margin-right: 7.5px;
      }
    }
  }
`;
