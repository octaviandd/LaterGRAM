/** @format */

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../graphql/Mutations";
import { FaGithub } from "react-icons/fa";
import Spinner from "../../utils/Spinner";

let initialState = {
  passwordInput: "",
  emailInput: "",
  emailStatus: false,
  passwordStatus: false,
};

export default function LoginInputs({}) {
  const [state, setState] = useState({
    passwordInput: "",
    emailInput: "",
    emailStatus: false,
    passwordStatus: false,
  });

  const [loginUser, { data, loading, error }] = useMutation(LOGIN_USER);
  const navigate = useNavigate();

  const resetForm = () => {
    setState(initialState);
  };

  const submitForm = async () => {
    try {
      await loginUser({
        variables: {
          input: {
            email: state.emailInput,
            password: state.passwordInput,
          },
        },
      }).then(({ data }) => {
        console.log(data);
        window.localStorage.setItem("token", data.loginUser.token);
        resetForm();
        navigate("/", { replace: true });
      });
    } catch {
      console.error(error);
    }
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
  }, [state.passwordInput, state.emailInput]);

  if (loading) return <Spinner />;

  return (
    <Wrapper>
      <FormSection>
        <StyledForm
          onSubmit={(e) => {
            e.preventDefault();
            submitForm();
          }}
        >
          <h4>Sign up to see photos and videos from your friends.</h4>
          <label>
            <EmailLegend emailStatus={state.emailStatus}>
              Username or e-mail
            </EmailLegend>
            <StyledField
              type="email"
              name="emailInput"
              onChange={(e) => handleInput(e)}
              value={state.emailValue}
              required
            />
          </label>
          <label>
            <PasswordLegend passwordStatus={state.passwordStatus}>
              Password
            </PasswordLegend>
            <StyledField
              type="password"
              name="passwordInput"
              onChange={(e) => handleInput(e)}
              value={state.passwordValue}
              required
            />
          </label>

          <SubmitButton type="submit">Login</SubmitButton>
          {error && <ErrorMsg>Invalid credentials</ErrorMsg>}
        </StyledForm>
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

const ErrorMsg = styled.div`
  margin: 10px 5px;
  background-color: #ff6767;
  color: white;
  padding: 15px 17.5px;
  border-radius: 6px;
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
  background-color: ${(props) => props.theme.colors.buttonPrimary};
  font-size: 14px;
  color: #fff;
  font-weight: 600;
  border: 1px solid transparent;
  border-radius: 5px;
  cursor: pointer;
  padding: 4px 2px;
`;
