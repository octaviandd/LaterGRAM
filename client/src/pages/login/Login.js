/** @format */

import React from "react";
import styled from "styled-components";
import LoginInputs from "./Inputs";
import LoginCarousel from "./Carousel";
import device from "../../utils/GlobalStyles";

export default function Login() {
  return (
    <Grid>
      <LeftColumn>
        <LoginCarousel></LoginCarousel>
      </LeftColumn>
      <RightColumn>
        <div>
          <Logo>LaterGRAM</Logo>
        </div>
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

const Logo = styled.h1`
  font-family: "Zen Tokyo Zoo", cursive;
  font-size: 40px;
`;
