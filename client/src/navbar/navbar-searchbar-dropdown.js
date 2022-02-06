/** @format */

import React, { ReactElement } from "react";
import styled from "styled-components";
import { GET_USERS } from "../graphql/queries";
import { useQuery } from "@apollo/client";
import Spinner from "../utils/spinner";
import { Link } from "react-router-dom";

export default function NavbarSearchDropdown({ searchValue }) {
  const { data, loading, error } = useQuery(GET_USERS);
  if (error) return <div>errror</div>;
  if (loading) return <Spinner />;

  return (
    <Wrapper>
      {data &&
        data.data
          .slice(0, 20)
          .filter((user) => user.username.includes(searchValue))
          .map((user) => {
            return (
              <div key={user._id}>
                <Link to={`/profile/${user._id}`}>
                  <div>
                    <img src={user.avatar} />
                  </div>
                  <div>
                    <p>{user.username}</p>
                    <p>{user.name}</p>
                  </div>
                </Link>
              </div>
            );
          })}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  right: 368px;
  top: 61px;
  max-width: 220px;
  width: 100%;
  background-color: white;
  border: 1px solid #dbdbdb;
  height: 362px;
  z-index: 999;
  overflow-x: hidden;
  overflow-y: auto;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);

  & > div {
    border-bottom: 1px solid #dbdbdb;
    padding: 8px 14px;
  }

  a {
    height: 50px;
    align-items: center;
    display: flex;
    text-decoration: none;
    color: black;

    & > div:nth-of-type(1) {
      img {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        object-fit: contain;
        margin-right: 8px;
      }
    }

    & > div:nth-of-type(2) {
      & > p:nth-of-type(1) {
        font-weight: 600;
        line-height: 22px;
        font-size: 14px;
        text-overflow: ellipsis;
      }
      & > p:nth-of-type(2) {
        font-weight: 300;
        font-size: 14px;
        text-align: left;
        text-overflow: ellipsis;
        line-height: 22px;
      }
    }
  }
`;
