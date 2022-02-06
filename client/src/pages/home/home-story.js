/** @format */

import React, { ReactElement } from "react";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import ProfileAvatar from "../../../assets/profileimg.jpg";
import styled from "styled-components";

export default function HomeStory({}) {
  return (
    <Wrapper>
      <InsideWrapper>
        <Slider>
          <LeftArrow>
            <FaAngleLeft></FaAngleLeft>
          </LeftArrow>
          <div>
            <img src={ProfileAvatar} />
            <span>User1</span>
          </div>
          <div>
            <img src={ProfileAvatar} />
            <span>User2</span>
          </div>
          <div>
            <img src={ProfileAvatar} />
            <span>User3</span>
          </div>
          <div>
            <img src={ProfileAvatar} />
            <span>User4</span>
          </div>
          <div>
            <img src={ProfileAvatar} />
            <span>User4</span>
          </div>
          <div>
            <img src={ProfileAvatar} />
            <span>User5</span>
          </div>
          <div>
            <img src={ProfileAvatar} />
            <span>User5</span>
          </div>
          <div>
            <img src={ProfileAvatar} />
            <span>User6</span>
          </div>
          <div>
            <img src={ProfileAvatar} />
            <span>User7</span>
          </div>
          <div>
            <img src={ProfileAvatar} />
            <span>User8</span>
          </div>
          <RightArrow>
            <FaAngleRight></FaAngleRight>
          </RightArrow>
        </Slider>
      </InsideWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-shrink: 0;
  background-color: #242526;
  height: 120px;
  margin-bottom: 25px;
`;

const InsideWrapper = styled.div`
  border: 1px solid #242526;
  border-radius: 3px;
  width: 100%;
  display: flex;
  overflow-x: hidden;
  position: relative;
`;

const Slider = styled.div`
  width: 100%;
  display: flex;
  position: absolute;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 15px 0px 15px 15px;
    img {
      border-radius: 50%;
      width: 65px;
      height: 65px;
    }
    span {
      line-height: 18px;
      font-size: 14px;
      font-weight: bold;
    }
  }
`;

const ArrowButton = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #ffffff;
  border: none;
  cursor: pointer;
  svg {
    width: 20px;
    height: 20px;
    color: black;
  }
`;

const LeftArrow = styled(ArrowButton)`
  left: 0px;
  top: 25px;
`;

const RightArrow = styled(ArrowButton)`
  right: 5px;
  top: 25px;
`;
