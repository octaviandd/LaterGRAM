/** @format */
import { useQuery } from "@apollo/client";
import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { GET_CURRENT_USER, GET_USERS } from "../../graphql/Queries";
import Spinner from "../../utils/Spinner";
import Watermark from "../../utils/Watermark";
import FriendProfile from "./Friend";

export default function HomeFriends({}) {
  const { data, error, loading } = useQuery(GET_CURRENT_USER);
  const { data: usersData } = useQuery(GET_USERS);

  if (error) return <div>error</div>;
  if (loading) return <Spinner></Spinner>;

  const { _id, username, following, avatar } = data.data;

  return (
    <Wrapper>
      <Profile>
        <Link to={`/profile/${_id}`}>
          <img src={`${avatar}`}></img>
        </Link>
        <Link to={`/profile/${_id}`}>
          <span>{`${username}`}</span>
        </Link>
      </Profile>
      <Suggestions>
        <div>
          <p>Suggestions For You</p>
          <a href="#">See all</a>
        </div>
        {usersData &&
          usersData.data
            .filter(
              (user) =>
                user._id !== _id &&
                !following.find(({ _id }) => user._id === _id)
            )
            .slice(0, 5)
            .map((user) => {
              return <FriendProfile user={user} key={user._id} />;
            })}
      </Suggestions>
      <Watermark />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  height: 100vh;
  width: 293px;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 1rem;
  padding-top: 2rem;
  img {
    margin-right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
  }

  a {
    text-decoration: none;
    color: #e5e7ec;
    font-weight: bold;
  }
`;

const Suggestions = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;

  div {
    display: flex;
    align-items: center;
    width: 100%;
    margin-top: 3.5px;
    margin-bottom: 3.5px;
  }

  & > div:nth-of-type(1) {
    display: flex;
    justify-content: space-between;
    p {
      font-size: 14px;
      line-height: 18px;
      color: #e5e7ec;
      font-weight: bold;
    }
    a {
      font-size: 14px;
      line-height: 18px;
      text-decoration: none;
      color: #e5e7ec;
      font-weight: bold;
    }
  }
`;
