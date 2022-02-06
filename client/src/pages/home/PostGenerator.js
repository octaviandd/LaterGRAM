/** @format */

import React, { ReactElement, useState, useCallback } from "react";
import styled from "styled-components";
import { useMutation } from "@apollo/client";
import { FcPicture } from "react-icons/fc";
import { FaPlusCircle, FaTimes } from "react-icons/fa";
import { SINGLE_UPLOAD, CREATE_POST } from "../../graphql/Mutations";
import { GET_ALL_POSTS } from "../../graphql/Queries";
import Spinner from "../../utils/Spinner";
import { useDropzone } from "react-dropzone";
import { Field, Formik } from "formik";
import { nanoid } from "nanoid";

// AWS.config.update({
//   region: "eu-central-1",
//   credentials: new AWS.CognitoIdentityCredentials({
//     IdentityPoolId: "eu-central-1:df1bc5d5-1bee-4dab-b02f-283bf46d2db9",
//   }),
// });

export default function HomeFeedPostGenerator({}) {
  const [state, setState] = useState({
    picture: "",
    isActive: false,
    buttonStatus: false,
    inputValue: "",
  });
  const [uploadPicture, { data, error, loading }] = useMutation(SINGLE_UPLOAD);

  const onDrop = useCallback(async ([file]) => {
    // const s3 = new AWS.S3.ManagedUpload({
    //   params: {
    //     Bucket: "latergram",
    //     Key: `${nanoid()}${file.name}`,
    //     Body: file,
    //   },
    // });
    // let result = s3.promise();
    // result.then((res) => {
    //   setState((prevState) => ({
    //     ...prevState,
    //     picture: res.Location,
    //   }));
    // });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  const handleInput = (e) => {
    setState((prevState) => ({
      ...prevState,
      inputValue: e.target.value,
    }));
  };

  const [createPost] = useMutation(CREATE_POST, {
    update(cache, { data: { createPost } }) {
      const data = cache.readQuery({ query: GET_ALL_POSTS });
      cache.writeQuery({
        query: GET_ALL_POSTS,
        data: { results: [createPost, ...data.data] },
      });
    },
  });

  const submitForm = async (formData, resetForm) => {
    await createPost({
      variables: {
        input: {
          description: formData.description || " ",
          picture: state.picture,
        },
      },
    });

    setState((prevState) => ({
      ...prevState,
      isActive: !state.isActive,
      picture: "",
    }));
    resetForm();
  };

  if (error) return <div>Error</div>;
  if (loading) return <Spinner></Spinner>;

  return (
    <Wrapper>
      <OpenModalButton
        onClick={() =>
          setState((prevState) => ({ ...prevState, isActive: !state.isActive }))
        }
      >
        <FaPlusCircle />
      </OpenModalButton>
      {state.isActive && (
        <FormModal
          //   encType={"multipart/form-data"}
          initialValues={{ description: "", picture: "" }}
          onSubmit={(values, { resetForm }) => {
            console.log(values.description, state.picture);
            submitForm(values, resetForm);
          }}
        >
          {(props) => (
            <FormActions onSubmit={props.handleSubmit}>
              <TopBar>
                <h2>Create Post</h2>
                <span
                  onClick={() =>
                    setState((prevState) => ({
                      ...prevState,
                      isActive: !state.isActive,
                    }))
                  }
                >
                  <FaTimes />
                </span>
              </TopBar>
              <Dropzone {...getRootProps()}>
                <input {...getInputProps()} />
                <PictureInput>
                  <FcPicture id="dropZone" />
                  <span>Photo</span>
                </PictureInput>
              </Dropzone>
              <Field
                type="text"
                name="description"
                onKeyUp={handleInput}
              ></Field>
              <SubmitButton type="submit" disabled={false}>
                Post
              </SubmitButton>
            </FormActions>
          )}
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

const FormModal = styled(Formik)`
  position: fixed;
  padding: 1rem 0;
  flex-direction: column;
  display: flex;
  align-items: center;
  background-color: white;
  display: flex;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 540px;
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

const FormActions = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  input {
    padding: 10px 5px;
    border-radius: 5px;
    border: 0;
    background-color: inherit;
    color: #e5e7ec;
    width: 100%;
    height: 400px;
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

const Dropzone = styled.div``;

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
