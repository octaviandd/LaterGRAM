/** @format */

import React, { ReactElement } from "react";
import { FaGithub } from "react-icons/fa";
import styled from "styled-components";

export default function Watermark({}) {
  return (
    <Wrapper>
      <p>Made by Octavian David</p>
      <a href="http://github.com/octaviandd">
        <FaGithub />
      </a>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background: #242526;
  display: flex;
  margin-top: 3rem;
  flex-direction: column;
  align-items: center;
  padding: 10px 15px;
  border-radius: 10px;
  p {
    text-align: center;
    color: #e5e7ec;
  }
  a {
    margin-top: 1rem;
    color: #e5e7ec;
    font-size: 20px;
    svg {
      height: 25px;
      width: 25px;
    }
  }
`;
