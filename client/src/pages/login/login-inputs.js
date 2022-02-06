/** @format */

import React, { useState, useEffect, ReactElement } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import LoginFormik from "./login-formik";

export default function LoginInputs({}) {
  const [status, setStatus] = useState({
    emailStatus: false,
    passwordStatus: false,
  });

  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const { email, password } = state;

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
    email !== ""
      ? setInputStatus("emailStatus", true)
      : setInputStatus("emailStatus", false);
    password !== ""
      ? setInputStatus("passwordStatus", true)
      : setInputStatus("passwordStatus", false);
  }, [password, email]);

  return (
    <Wrapper>
      <FormSection>
        <LoginFormik handleInput={handleInput} statusState={status} />
      </FormSection>
      <RegisterLink>
        <p>
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      </RegisterLink>
      <WaterMark>
        <p>Made by Octavian David</p>
        <a href="http://github.com/octaviandd">
          <FaGithub />
        </a>
      </WaterMark>
    </Wrapper>
  );
}

const Wrapper = styled("div")`
  display: flex;
  flex-direction: column;
  height: 618px;
  max-width: 350px;
  width: 100%;
  flex-shrink: 0;
  -webkit-box-shadow: 4px 2px 23px -4px rgba(32, 29, 30, 1);
  -moz-box-shadow: 4px 2px 23px -4px rgba(32, 29, 30, 1);
  box-shadow: 4px 2px 23px -4px rgba(32, 29, 30, 1);
  border-radius: 20px;
`;

const FormSection = styled.section`
  background: rgba(var(--d87, 255, 255, 255), 1);
  width: 100%;
  border-radius: 20px;
`;

const RegisterLink = styled.div`
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

const WaterMark = styled.div`
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  display: flex;
  padding-top: 3rem;
  padding-bottom: 1rem;
  flex-direction: column;
  align-items: center;
  p {
    text-align: center;
    color: grey;
  }
  a {
    margin-top: 1rem;
    color: grey;
    font-size: 20px;
  }
`;
