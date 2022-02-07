/** @format */

import React, { ReactElement } from "react";
import styled from "styled-components";
import { Field, Formik } from "formik";
import { useMutation } from "@apollo/client";
import { NEW_USER } from "../../graphql/Mutations";
import { useNavigate } from "react-router-dom";

export default function RegisterFormik({ statusState, handleInput }) {
  const [registerUser, { data, loading, error }] = useMutation(NEW_USER);
  const history = useNavigate();
  const submitForm = async (values, resetForm) => {
    try {
      await registerUser({
        variables: {
          input: {
            name: values.name,
            username: values.username,
            email: values.email,
            password: values.password,
          },
        },
      }).then((res) => {
        window.localStorage.setItem("token", res.data.createUser.token);
        resetForm();
        history("/", { replace: true });
      });
    } catch {}
  };

  return (
    <div>
      <Formik
        initialValues={{ name: "", password: "", username: "", email: "" }}
        onSubmit={(values, { resetForm }) => {
          submitForm(values, resetForm);
        }}
      >
        {(props) => (
          <StyledForm onSubmit={props.handleSubmit}>
            <h4>Sign up to see photos and videos from your friends.</h4>
            <label>
              <EmailLegend emailStatus={statusState.emailStatus}>
                Email
              </EmailLegend>
              <StyledField
                type="email"
                name="email"
                onKeyUp={(e) => handleInput(e)}
              />
            </label>
            {props.errors.email && (
              <div id="feedback">{props.errors.email}</div>
            )}
            <label>
              <NameLegend nameStatus={statusState.nameStatus}>Name</NameLegend>
              <StyledField
                type="text"
                name="name"
                onKeyUp={(e) => handleInput(e)}
              />
              {props.errors.name && (
                <div id="feedback">{props.errors.name}</div>
              )}
            </label>
            <label>
              <UsernameLegend usernameStatus={statusState.usernameStatus}>
                Username
              </UsernameLegend>
              <StyledField
                type="text"
                name="username"
                onKeyUp={(e) => handleInput(e)}
              />
              {props.errors.username && (
                <div id="feedback">{props.errors.username}</div>
              )}
            </label>
            <label>
              <PasswordLegend passwordStatus={statusState.passwordStatus}>
                Password
              </PasswordLegend>
              <StyledField
                type="password"
                name="password"
                onKeyUp={(e) => handleInput(e)}
              />
              {props.errors.password && (
                <div id="feedback">{props.errors.password}</div>
              )}
            </label>
            <SubmitButton type="submit">Register</SubmitButton>
          </StyledForm>
        )}
      </Formik>
    </div>
  );
}

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

const StyledField = styled(Field)`
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
