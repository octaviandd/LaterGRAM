/** @format */

import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Placeholder from "../../../assets/loginpage.png";
import ImageOne from "../../../assets/carousel1.jpg";
import ImageTwo from "../../../assets/carousel2.jpg";
import ImageThree from "../../../assets/carousel3.jpg";
import ImageFour from "../../../assets/carousel4.jpg";

export default function LoginCarousel() {
  const [state, setState] = useState({
    activeSlide: 0,
    _slides: [ImageFour, ImageOne, ImageThree, ImageTwo],
  });

  const { activeSlide, _slides } = state;
  const autoPlayRef = useRef();

  const nextSlide = () => {
    setState({
      ...state,
      activeSlide: activeSlide === _slides.length - 1 ? 0 : activeSlide + 1,
    });
  };

  useEffect(() => {
    autoPlayRef.current = nextSlide;
  });

  useEffect(() => {
    const play = () => {
      autoPlayRef.current();
    };
    let interval = setInterval(play, 3000);
    return () => {
      clearInterval(interval);
    };
  }, [activeSlide]);

  return (
    <Wrapper>
      <ImageHolder></ImageHolder>
      <Container>
        <SliderContent translate={activeSlide}>
          {_slides.map((_slide, i) => (
            <Carousel currentPicture={_slide} key={i} />
          ))}
        </SliderContent>
      </Container>
    </Wrapper>
  );
}

const ImageHolder = styled.div`
  background-image: url(${Placeholder});
  background-position: 0 0;
  background-repeat: no-repeat;
  background-size: 454px 618px;
  width: 475px;
  height: 618px;
`;

const Wrapper = styled.div`
  position: relative;
`;

const Carousel = styled.div`
  width: 240px;
  height: 430px;
  overflow: hidden;
  background-image: url(${(props) => props.currentPicture});
  background-size: contain;
`;

const SliderContent = styled.div`
  position: absolute;
  display: flex;
  width: 960px;
  height: 430px;
  overflow: hidden;
  transform: translate(${(props) => `-` + props.translate * 240 + "px"});
  transition: transform ease-out 0.35s;
`;

const Container = styled.div`
  width: 240px;
  position: absolute;
  overflow: hidden;
  height: 430px;
  top: 99px;
  right: 84px;
`;
