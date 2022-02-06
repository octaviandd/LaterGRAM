/** @format */

import React, { ReactElement } from "react";
import styled, { keyframes } from "styled-components";

export default function Spinner({}) {
  return (
    <MainContainer>
      <div className="spinner">
        <div className="double-bounce1"></div>
        <div className="double-bounce2"></div>
      </div>
    </MainContainer>
  );
}

const skBounce = keyframes`
  0%, 100% { 
    transform: scale(0.0);
    -webkit-transform: scale(0.0);
  } 50% { 
    transform: scale(1.0);
    -webkit-transform: scale(1.0);
  }
`;

const MainContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  width: 40px;
  height: 40px;
  .double-bounce1,
  .double-bounce2 {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #c609ec;
    opacity: 0.6;
    position: absolute;
    top: 0;
    left: 0;

    -webkit-animation: ${skBounce} 2s infinite ease-in-out;
    animation: ${skBounce} 2s infinite ease-in-out;
  }

  .double-bounce2 {
    -webkit-animation-delay: -1s;
    animation-delay: -1s;
  }
`;
