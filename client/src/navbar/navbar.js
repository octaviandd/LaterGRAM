/** @format */

import React, { ReactElement, useEffect, useState } from "react";
import styled from "styled-components";
import NavbarSearchbar from "./NavbarSearchBar";
import { Link, useNavigate } from "react-router-dom";
import NavbarLinks from "./NavbarLinks";
import NavbarSearchDropDown from "./NavbarSearchDropDown";
import { GET_USERS, GET_CURRENT_USER } from "../graphql/Queries";
import { useQuery } from "@apollo/client";

export default function Navbar({}) {
  let navigate = useNavigate();
  const [state, setState] = useState({
    isSearchingActive: false,
    inputValue: "",
  });

  const { data: currentData, loading: loadingCurrent } =
    useQuery(GET_CURRENT_USER);

  const handleInput = (e) => {
    setState((prevState) => ({
      ...prevState,
      inputValue: e.target.value,
    }));
  };

  const clearInput = () => {
    setState((prevState) => ({
      ...prevState,
      inputValue: "",
    }));
  };

  const logOut = () => {
    window.localStorage.clear();
    window.location.reload();
  };

  useEffect(() => {
    if (state.inputValue !== "") {
      setState((prevState) => ({
        ...prevState,
        isSearchingActive: true,
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        isSearchingActive: false,
      }));
    }
  }, [state.inputValue]);

  return (
    <NavbarWrapper>
      <Wrapper>
        <LogoDivision>
          <h3>
            <Link to="/">LaterGRAM</Link>
          </h3>
        </LogoDivision>
        <NavbarSearchbar
          clearText={clearInput}
          value={state.inputValue}
          handleInput={handleInput}
          active={state.isSearchingActive}
        />
        <NavbarLinks user={currentData} logOut={logOut} />
        {state.isSearchingActive && (
          <NavbarSearchDropDown searchValue={state.inputValue} />
        )}
      </Wrapper>
    </NavbarWrapper>
  );
}

const NavbarWrapper = styled.nav`
  background: #18191a;
  border-bottom: 1px solid #dbdbdb;
  display: flex;
  align-items: stretch;
  flex-shrink: 0;
  margin: 0;
  position: relative;
  justify-content: center;
  padding-left: 30px;
  padding-right: 30px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 0rem;
  max-width: 975px;
  width: 100%;
  position: relative;
  align-items: center;
`;

const LogoDivision = styled.div`
  h3 {
    a {
      text-decoration: none;
      color: white;
      font-family: "Zen Tokyo Zoo", cursive;
    }
  }
`;
