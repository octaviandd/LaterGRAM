/** @format */

import React, { ReactElement, useState } from "react";
import styled from "styled-components";
import HomeSVG from "../../assets/svgs/HomeSVG";
import ExploreSVG from "../../assets/svgs/ExploreSVG";
import MessageSVG from "../../assets/svgs/MessageSVG";
import UnlikedHeartSVG from "../../assets/svgs/UnlikedHeartSVG";
import { Link } from "react-router-dom";
import NavbarSettings from "./NavbarSettings";

export default function NavbarLinks({ user, logOut }) {
  const [activeDropdown, activateDropdown] = useState(false);

  return (
    <Wrapper>
      <div>
        <Link to="/">
          <HomeSVG />
        </Link>
      </div>
      <div>
        <Link to="">
          <MessageSVG />
        </Link>
      </div>
      <div>
        <Link to="/explore">
          <ExploreSVG />
        </Link>
      </div>
      <div>
        <Link to="">
          <UnlikedHeartSVG />
        </Link>
      </div>
      <div>
        <a onClick={() => activateDropdown(!activeDropdown)}>
          <span>
            {user.data && (
              <img src={`${user && user.data.avatar}`} alt="profile-icon" />
            )}
          </span>
        </a>
      </div>
      <div>
        {activeDropdown && (
          <NavbarSettings id={user.data._id} logOut={logOut} />
        )}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  div {
    margin-left: 20px;
    a {
      cursor: pointer;
    }
    span {
      img {
        width: 25px;
        height: 25px;
        border-radius: 50%;
        object-fit: cover;
      }
    }
  }
`;
