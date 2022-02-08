/** @format */

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { NEW_USER } from "../../graphql/Mutations";
import { useNavigate } from "react-router-dom";
import Spinner from "../../utils/Spinner";

let initialState = {
  nameInput: "",
  emailInput: "",
  passwordInput: "",
  usernameInput: "",
  nameStatus: false,
  emailStatus: false,
  passwordStatus: false,
  usernameStatus: false,
  emailError: false,
  emailErrorMessage: "",
  passwordError: false,
  passwordErrorMessage: "",
  nameError: false,
  nameErrorMessage: "",
  usernameError: false,
  usernameErrorMessage: "",
};

function validateEmail(elementValue) {
  var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(elementValue);
}

export default function RegisterInputs({}) {
  const [state, setState] = useState({
    nameInput: "",
    emailInput: "",
    passwordInput: "",
    usernameInput: "",
    nameStatus: false,
    emailStatus: false,
    passwordStatus: false,
    usernameStatus: false,
    emailError: false,
    emailErrorMessage: "",
    passwordError: false,
    passwordErrorMessage: "",
    nameError: false,
    nameErrorMessage: "",
    usernameError: false,
    usernameErrorMessage: "",
  });

  const resetForm = () => {
    setState(initialState);
  };
  const [registerUser, { data, loading, error }] = useMutation(NEW_USER);
  const history = useNavigate();
  const submitForm = async () => {
    try {
      await registerUser({
        variables: {
          input: {
            name: state.nameInput,
            username: state.usernameInput,
            email: state.emailInput,
            password: state.passwordInput,
          },
        },
      }).then((res) => {
        window.localStorage.setItem("token", res.data.createUser.token);
        resetForm();
        history("/", { replace: true });
      });
    } catch {}
  };

  const handleInput = (e) => {
    const target = e.target.value;
    setState((prevState) => ({
      ...prevState,
      [e.target.name]: target,
    }));
  };

  const setInputStatus = (val, on) => {
    setState((prevStatus) => ({
      ...prevStatus,
      [val]: on,
    }));
  };

  useEffect(() => {
    state.emailInput !== ""
      ? setInputStatus("emailStatus", true)
      : setInputStatus("emailStatus", false);
    state.passwordInput !== ""
      ? setInputStatus("passwordStatus", true)
      : setInputStatus("passwordStatus", false);
    state.usernameInput !== ""
      ? setInputStatus("usernameStatus", true)
      : setInputStatus("usernameStatus", false);
    state.nameInput !== ""
      ? setInputStatus("nameStatus", true)
      : setInputStatus("nameStatus", false);
  }, [
    state.passwordInput,
    state.emailInput,
    state.usernameInput,
    state.nameInput,
    state.emailError,
    state.nameError,
    state.usernameError,
    state.passwordError,
  ]);

  if (error) return "Error..";
  if (loading) return <Spinner />;
  return (
    <Wrapper>
      <InnerWrapper>
        <StyledForm
          onSubmit={(e) => {
            e.preventDefault();
            submitForm();
          }}
        >
          <h4>Sign up to see photos and videos from your friends.</h4>
          <label>
            <EmailLegend emailStatus={state.emailStatus}>Email</EmailLegend>
            <StyledField
              type="email"
              name="emailInput"
              onChange={(e) => handleInput(e)}
              required
            />
          </label>

          <label>
            <NameLegend nameStatus={state.nameStatus}>Name</NameLegend>
            <StyledField
              min={2}
              max={20}
              type="text"
              name="nameInput"
              onChange={(e) => handleInput(e)}
              required
            />
          </label>
          <label>
            <UsernameLegend usernameStatus={state.usernameStatus}>
              Username
            </UsernameLegend>
            <StyledField
              min={2}
              max={20}
              type="text"
              name="usernameInput"
              onChange={(e) => handleInput(e)}
              required
            />
          </label>
          <label>
            <PasswordLegend passwordStatus={state.passwordStatus}>
              Password
            </PasswordLegend>
            <StyledField
              min={6}
              max={20}
              type="password"
              name="passwordInput"
              onChange={(e) => handleInput(e)}
              required
            />
          </label>
          <SubmitButton type="submit">Register</SubmitButton>
        </StyledForm>
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

const StyledForm = styled.form`
  padding: 2rem 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  h1 {
    font-size: 40px;
    margin-bottom: 2rem;
    color: whitesmoke;
  }
  h4 {
    text-align: center;
    margin-bottom: 0.525rem;
    color: #8e8e8e;
    padding-bottom: 1.6rem;
  }

  label {
    position: relative;
    margin-bottom: 7.5px;
    width: 100%;
  }
`;

const StyledField = styled.input`
  padding: 9px 0 7px 8px;
  width: 100%;
  border: 1px solid #dbdbdb;
  background-color: #fafafa;
  font-size: 16px;
  cursor: auto;
  border-radius: 3px;
  text-overflow: ellipsis;
  &:focus {
    outline: #a2a2a2;
    border: 1px solid #a2a2a2;
  }
`;

const TextLegend = styled.span`
  position: absolute;
  top: 30%;
  left: 3.5%;
  color: #a2a2a2;
  cursor: auto;
  font-size: 14px;
  transition: all 0.1s ease-in-out;
`;

const NameLegend = styled(TextLegend)`
  ${({ nameStatus }) =>
    nameStatus &&
    `
      left: 8px;
      font-size: 10px;
      top: 5px;
      overflow:hidden;
      color: rgba(var(--f52,142,142,142),1);
      text-overflow: ellipsis;

      + input {
        padding: 14px 0 2px 8px;
        font-size: 12px;
      }
    `}
`;

const PasswordLegend = styled(TextLegend)`
  ${({ passwordStatus }) =>
    passwordStatus &&
    `
      left: 8px;
      font-size: 10px;
      top: 5px;
      overflow:hidden;
      color: rgba(var(--f52,142,142,142),1);
      text-overflow: ellipsis;
      + input {
        padding: 14px 0 2px 8px;
        font-size: 12px;
      }
    `}
`;

const UsernameLegend = styled(TextLegend)`
  ${({ usernameStatus }) =>
    usernameStatus &&
    `
      left: 8px;
      font-size: 10px;
      top: 5px;
      overflow:hidden;
      color: rgba(var(--f52,142,142,142),1);
      text-overflow: ellipsis;
      + input {
        padding: 14px 0 2px 8px;
        font-size: 12px;
      }
    `}
`;

const EmailLegend = styled(TextLegend)`
  ${({ emailStatus }) =>
    emailStatus &&
    `
      left: 8px;
      font-size: 10px;
      top: 5px;
      overflow:hidden;
      color: rgba(var(--f52,142,142,142),1);
      text-overflow: ellipsis;
      + input {
        padding: 14px 0 2px 8px;
        font-size: 12px;
      }
    `}
`;

const SubmitButton = styled.button`
  width: 100%;
  background-color: #ff6767;
  font-size: 14px;
  color: #fff;
  font-weight: 600;
  border: 1px solid transparent;
  border-radius: 5px;
  cursor: pointer;
  padding: 4px 2px;
`;
