/** @format */

import React, { ReactElement, useState, useCallback } from "react";
import styled from "styled-components";
import { useMutation } from "@apollo/client";
import { FcPicture } from "react-icons/fc";
import { FaPlusCircle, FaTimes } from "react-icons/fa";
import { CREATE_POST } from "../../graphql/Mutations";
import { GET_ALL_POSTS } from "../../graphql/Queries";
import { useDropzone } from "react-dropzone";
import { nanoid } from "nanoid";
import AWS from "aws-sdk";

AWS.config.update({
  region: "eu-central-1",
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: "eu-central-1:df1bc5d5-1bee-4dab-b02f-283bf46d2db9",
  }),
});

export default function HomeFeedPostGenerator({}) {
  const [state, setState] = useState({
    picture: "",
    isActive: false,
    buttonStatus: false,
    inputValue: "",
  });

  const onDrop = useCallback(async ([file]) => {
    const s3 = new AWS.S3.ManagedUpload({
      params: {
        Bucket: "latergram",
        Key: `${nanoid()}${file.name}`,
        Body: file,
      },
    });
    let result = s3.promise();
    result.then((res) => {
      setState((prevState) => ({
        ...prevState,
        picture: res.Location,
      }));
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const [createPost] = useMutation(CREATE_POST, {
    update(cache, { data: { createPost } }) {
      const data = cache.readQuery({ query: GET_ALL_POSTS });
      let newData = data.getAllPosts.concat(createPost);
      cache.writeQuery({
        query: GET_ALL_POSTS,
        data: {
          data: newData,
        },
      });
    },
  });

  const submitForm = async (input) => {
    await createPost({
      variables: {
        input: {
          description: input || "",
          picture: state.picture,
        },
      },
    });
    setState((prevState) => ({
      ...prevState,
      isActive: !state.isActive,
      picture: "",
    }));
  };

  return (
    <Wrapper>
      <OpenModalButton
        hidden={state.isActive}
        onClick={() =>
          setState((prevState) => ({ ...prevState, isActive: !state.isActive }))
        }
      >
        <FaPlusCircle />
      </OpenModalButton>
      {state.isActive && (
        <FormModal
          onSubmit={(e) => {
            e.preventDefault();
            submitForm(e.target[1].value);
          }}
        >
          <TopBar>
            <h2>Create Post</h2>
            <span
              onClick={() => {
                setState((prevState) => ({
                  ...prevState,
                  isActive: !state.isActive,
                  picture: "",
                }));
              }}
            >
              <FaTimes />
            </span>
          </TopBar>
          <div>
            <Dropzone {...getRootProps()} hidden={state.picture}>
              <input {...getInputProps()} />
              <PictureInput>
                <FcPicture id="dropZone" />
                <span>Photo</span>
              </PictureInput>
            </Dropzone>
            {state.picture ? (
              <ThumbsContainer>
                <Thumb>
                  <ThumbInner>
                    <Img src={state.picture} />
                  </ThumbInner>
                </Thumb>
              </ThumbsContainer>
            ) : null}
          </div>
          <FormActions>
            <input
              type="text"
              name="description"
              value={state.inputValue}
              onChange={(e) =>
                setState((prevState) => ({
                  ...prevState,
                  inputValue: e.target.value,
                }))
              }
            />
            <SubmitButton type="submit" disabled={state.picture ? false : true}>
              Post
            </SubmitButton>
          </FormActions>
        </FormModal>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
  position: relative;
  align-items: center;
  position: relative;
  width: 100%;
`;

const OpenModalButton = styled.button`
  color: #8f94fb;
  border: none;
  cursor: pointer;
  background-color: transparent;

  svg {
    width: 30px;
    height: 30px;
  }
`;

const FormModal = styled.form`
  padding: 1rem 0;
  flex-direction: column;
  display: flex;
  align-items: center;
  background-color: #242526;
  display: flex;
  width: 100%;
  z-index: 99999;
  border-radius: 10px;
  border: 1px solid #242526;

  #dropZone {
    width: 40px;
    height: 40px;
    cursor: pointer;
  }
`;

const TopBar = styled.div`
  display: grid;
  border-bottom: 1px solid #e5e7ec;
  width: 100%;
  position: relative;
  padding: 1rem;

  h2 {
    color: #e5e7ec;
    text-align: center;
    padding-bottom: 1rem;
  }

  span {
    color: #e5e7ec;
    text-align: center;
    cursor: pointer;
    position: absolute;
    right: 15px;
    top: 20px;
    svg {
      width: 18px;
      height: 18px;
      fill: #e5e7ec;
    }
  }
`;

const FormActions = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  input {
    padding: 10px 5px;
    border-radius: 20px;
    border: 0;
    background-color: #18191a;
    color: #e5e7ec;
    width: 100%;
    height: 200px;
    font-size: 30px;
    text-align: center;

    &:focus {
      outline: none;
    }

    ::-webkit-input-placeholder {
      /* Chrome/Opera/Safari */
      font-size: 30px;
      text-align: center;
    }
    ::-moz-placeholder {
      /* Firefox 19+ */
      font-size: 30px;
      text-align: center;
    }
    :-ms-input-placeholder {
      /* IE 10+ */
      font-size: 30px;
      text-align: center;
    }
    :-moz-placeholder {
      /* Firefox 18- */
      font-size: 30px;
      text-align: center;
    }
  }
`;

const PictureInput = styled.div`
  display: flex;
  align-items: center;
  color: #838384;
  width: 100%;
  padding: 7.5px 12.5px;
  margin-top: 25px;
  svg {
    padding-right: 10px;
  }
  background-color: #3a3b3c;
  border-radius: 10px;
`;

const Dropzone = styled.div`
  cursor: pointer;
`;

const SubmitButton = styled.button`
  cursor: pointer;
  color: #838384;
  background: #3a3b3c;
  border: 0;
  padding: 10px 17.5px;
  border-radius: 10px;
  font-size: 18px;
  width: 90%;
  text-align: center;
  font-weight: bold;
  margin-top: 2rem;
  line-height: 18px;
  ${({ disabled }) => !disabled && `background: #8ea1e1;color: #e5e7ec;`}
`;

const ThumbsContainer = styled.div`
  display: flex;
  margin-top: 16px;
`;

const Thumb = styled.div`
  display: inline-flex;
  border-radius: 2px;
  border: 1px solid #eaeaea;
  margin-bottom: 8px;
  margin-right: 8px;
  width: 100px;
  height: 100px;
  padding: 4px;
  box-sizing: border-box;
`;

const ThumbInner = styled.div`
  display: flex;
  min-width: 0;
  overflow: hidden;
`;

const Img = styled.img`
  display: block;
  width: 100px;
  height: 100px;
`;
