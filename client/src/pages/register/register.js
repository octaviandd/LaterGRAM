/** @format */
import React from "react";
import RegisterLogo from "./register-logo";
import RegisterInputs from "./register-inputs";
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
