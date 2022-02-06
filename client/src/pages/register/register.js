/** @format */
import React from "react";
import RegisterLogo from "./Logo";
import RegisterInputs from "./Inputs";
import styled from "styled-components";

export default function Register(props) {
  return (
    <Wrapper>
      <RegisterLogo></RegisterLogo>
      <RegisterInputs history="test"></RegisterInputs>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;
