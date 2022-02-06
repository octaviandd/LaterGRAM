/** @format */

import React, { ReactElement } from "react";
import styled from "styled-components";

export default function EditDots({}) {
  return (
    <Wrapper>
      <span></span>
      <span></span>
      <span></span>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  cursor: pointer;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: space-around;
  & > span:nth-of-type(1) {
    width: 3px;
    height: 3px;
    background-color: #e5e7ec;
    display: block;
    border-radius: 50%;
  }
  & > span:nth-of-type(2) {
    width: 3px;
    height: 3px;
    background-color: #e5e7ec;
    display: block;
    border-radius: 50%;
  }
  & > span:nth-of-type(3) {
    width: 3px;
    height: 3px;
    background-color: #e5e7ec;
    display: block;
    border-radius: 50%;
  }
`;
