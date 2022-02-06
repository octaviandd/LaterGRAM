/** @format */

import React, { ReactElement } from "react";
import styled from "styled-components";
import ProfileSVG from "../../assets/svgs/ProfileSVG";
import { Link } from "react-router-dom";
import SettingSVG from "../../assets/svgs/SettingsSVG";

export default function NavbarSettings({ id, logOut }) {
  return (
    <MainContainter>
      <ul>
        <li>
          <Link to={`/profile/${id}`}>
            <div>
              <span>
                <ProfileSVG />
              </span>
              <span>Profile</span>
            </div>
          </Link>
        </li>
        <li>
          <div>
            <span>
              <SettingSVG />
            </span>
            <span>Settings</span>
          </div>
        </li>
        <li>
          <button onClick={() => logOut()}>
            <div>Log Out</div>
          </button>
        </li>
      </ul>
    </MainContainter>
  );
}

const MainContainter = styled.div`
  position: absolute;
  right: 0px;
  top: 63px;
  background-color: #242526;
  max-width: 200px;
  width: 100%;
  z-index: 999;
  border-radius: 6px;

  ul {
    li:nth-of-type(1) {
      &:hover {
        border-top-right-radius: 6px;
        border-top-left-radius: 6px;
      }
    }
    li:nth-of-type(3) {
      &:hover {
        border-bottom-right-radius: 6px;
        border-bottom-left-radius: 6px;
      }
    }
    li {
      list-style: none;
      display: flex;
      align-items: center;
      line-height: 50px;
      height: 50px;
      padding-left: 10px;
      color: whitesmoke;

      &:hover {
        background-color: #c609ec;
      }

      a {
        text-decoration: none;
        color: whitesmoke;
      }

      div {
        display: flex;
        align-items: center;
        /* margin-bottom: 17.5px; */
      }
      span {
        margin-right: 15px;
        font-weight: 400;

        svg {
          fill: whitesmoke;
        }
      }
    }

    > li:nth-of-type(3) {
      border-top: 1px solid #dbdbdb;
      padding-top: 12.5px;
      padding-bottom: 5px;

      button {
        background-color: transparent;
        border: none;
        font-size: 16px;
        cursor: pointer;
        color: whitesmoke;
      }
    }
  }
`;
