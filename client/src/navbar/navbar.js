/** @format */

import React, { ReactElement, useEffect, useState } from "react";
import styled from "styled-components";
import NavbarSearchbar from "./navbar-searchbar";
import { Link } from "react-router-dom";
import NavbarLinks from "./navbar-links";
import NavbarSearchbarDropdown from "./navbar-searchbar-dropdown";
import { GET_USERS, GET_CURRENT_USER } from "../graphql/queries";
import { useQuery } from "@apollo/client";
import Cookies from "js-cookie";

export default function Navbar({}) {
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
    Cookies.remove("id");
    window.location.reload(false);
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
          <NavbarSearchbarDropdown searchValue={state.inputValue} />
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
