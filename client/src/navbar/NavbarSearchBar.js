/** @format */

import React, { ReactElement } from "react";
import styled from "styled-components";
import { FaSearch, FaTimes } from "react-icons/fa";

export default function NavbarSearchBar({
  value,
  handleInput,
  clearText,
  active,
}) {
  return (
    <>
      <Wrapper>
        <SearchInput
          //   tabIndex="1"
          type="text"
          id="search-input"
          value={value}
          onChange={(e) => handleInput(e)}
          active={active}
        />
        <SearchIcon>
          <FaSearch />
        </SearchIcon>
        <SearchPlaceholder active={active}>Search</SearchPlaceholder>
        <SearchCloseButton active={active} onClick={() => clearText()}>
          <FaTimes />
        </SearchCloseButton>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  position: relative;
`;

const SearchCloseButton = styled.span`
  position: absolute;
  opacity: 0;
  top: 5px;
  right: 10px;
  svg {
    background-color: #c7c7c7;
    border-radius: 50%;
    fill: #f2f2f2;
    width: 12px;
    height: 12px;
    padding: 1px 3px;
  }
`;

const SearchIcon = styled.span`
  position: absolute;
  left: 76px;
  top: 5px;
  line-height: 20px;
  svg {
    width: 12px;
    height: 12px;
  }
`;

const SearchPlaceholder = styled.span`
  position: absolute;
  left: 96px;
  top: 4px;
  color: #8e8e8e;
  font-size: 14px;
  line-height: 20px;
  pointer-events: none;
  ${({ active }) =>
    active &&
    `
        display: none;
      `}
`;

const SearchInput = styled.input`
  position: relative;
  background-color: #fafafa;
  border: 1px solid #dbdbdb;
  border-radius: 3px;
  font-size: 14px;
  padding-left: 24px;
  padding-right: 10px;
  padding-top: 3px;
  padding-bottom: 3px;
  line-height: 20px;
  text-indent: 70px;

  &:focus {
    text-indent: 0px;
  }

  &:focus ~ ${SearchIcon} {
    left: 10px;
  }

  &:focus ~ ${SearchCloseButton} {
    opacity: 1;
  }

  &:focus ~ ${SearchPlaceholder} {
    left: 25px;
    ${({ active }) =>
      active &&
      `
        display: none;
      `}
  }

  span {
    position: absolute;
    svg {
      fill: #c7c7c7;
    }
  }
`;
