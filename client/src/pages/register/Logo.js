/** @format */
import React from "react";
import styled from "styled-components";
import device from "../../utils/GlobalStyles";

export default function RegisterLogo() {
  return (
    <Logo>
      <h1>LaterGRAM</h1>
      <h3>Would you mind me taking your data? :d</h3>
    </Logo>
  );
}

const Logo = styled.div`
  width: 100%;
  text-align: center;

  ${device.md} {
    display: none;
  }
  h1 {
    font-family: "Zen Tokyo Zoo", cursive !important;
    font-size: 60px;
  }
`;
