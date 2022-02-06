/** @format */

import React from "react";
import styled from "styled-components";
import LoginInputs from "./login-inputs";
import LoginCarousel from "./login-carousel";
import LoginLogo from "./login-logo";
import device from "../../utils/global-styles";

export default function Login(props) {
  return (
    <Grid>
      <LeftColumn>
        <LoginCarousel></LoginCarousel>
      </LeftColumn>
      <RightColumn>
        <LoginLogo></LoginLogo>
        <LoginInputs></LoginInputs>
      </RightColumn>
    </Grid>
  );
}

const Grid = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LeftColumn = styled.div`
  ${device.md} {
    display: none;
  }
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
