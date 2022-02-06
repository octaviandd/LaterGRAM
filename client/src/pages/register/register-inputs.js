/** @format */

import React, { ReactElement, useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import MyForm from "./register-formik";

export default function RegisterInputs({ history }) {
  const [status, setStatus] = useState({
    nameStatus: false,
    emailStatus: false,
    passwordStatus: false,
    usernameStatus: false,
  });
  const [state, setState] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });

  const { name, email, username, password } = state;

  const handleInput = (e) => {
    const target = e.target.value;
    setState((prevState) => ({
      ...prevState,
      [e.target.name]: target,
    }));
  };

  const setInputStatus = (val, on) => {
    setStatus((prevStatus) => ({
      ...prevStatus,
      [val]: on,
    }));
  };

  useEffect(() => {
    name !== ""
      ? setInputStatus("nameStatus", true)
      : setInputStatus("nameStatus", false);
    email !== ""
      ? setInputStatus("emailStatus", true)
      : setInputStatus("emailStatus", false);
    password !== ""
      ? setInputStatus("passwordStatus", true)
      : setInputStatus("passwordStatus", false);
    username !== ""
      ? setInputStatus("usernameStatus", true)
      : setInputStatus("usernameStatus", false);
  }, [name, password, email, username]);

  return (
    <Wrapper>
      <InnerWrapper>
        <MyForm handleInput={handleInput} statusState={status} />
        <Redirect>
          <p>
            Have an account?<Link to="/login"> Log In</Link>
          </p>
        </Redirect>
      </InnerWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100%;
  min-height: 100vh;
  position: relative;
  font-family: "Roboto", sans-serif;
`;

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 618px;
  max-width: 350px;
  width: 100%;
  flex-shrink: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-box-shadow: 4px 2px 23px -4px rgba(32, 29, 30, 1);
  -moz-box-shadow: 4px 2px 23px -4px rgba(32, 29, 30, 1);
  box-shadow: 4px 2px 23px -4px rgba(32, 29, 30, 1);
  border-radius: 20px;
`;

const Redirect = styled.div`
  border-top: 1px solid #dbdbdb;
  border-bottom: 1px solid #dbdbdb;
  margin-bottom: 0.3rem;
  p {
    padding: 20px 15px;
    text-align: center;
    font-weight: 400;
    color: black;
    a {
      text-decoration: none;
      color: #0095f6;
      font-weight: 600;
      cursor: pointer;
    }
  }
`;
