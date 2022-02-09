/** @format */

import React, { ReactElement } from "react";
import styled from "styled-components";
import HomeStory from "./Story";
import HomeFriends from "./Friends";
import HomeFeed from "./Feed";

export default function Home({ currentUser }) {
  return (
    <>
      <Wrapper>
        <LeftColumn>
          {/* <HomeStory /> */}
          <HomeFeed />
        </LeftColumn>
        <RightColumn>
          <HomeFriends />
        </RightColumn>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  background: ${(props) => props.theme.colors.backgroundColor};
  padding-top: 25px;
  min-height: 100vh;
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
`;

const LeftColumn = styled.div`
  position: relative;
  display: flex;
  max-width: 614px;
  width: 100%;
  margin-right: 28px;
  height: 100%;
  flex-direction: column;
`;

const RightColumn = styled.div`
  max-width: 293px;
  width: 100%;
`;
