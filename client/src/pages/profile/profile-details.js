/** @format */

import { useQuery, useMutation } from "@apollo/client";
import React, { ReactElement, useState } from "react";
import styled from "styled-components";
import { GET_CURRENT_USER } from "../../graphql/queries";
import Spinner from "../../utils/spinner";
import { CHANGE_AVATAR } from "../../graphql/mutations";
import { Formik, Form } from "formik";

import { nanoid } from "nanoid";

// AWS.config.update({
//   region: "eu-central-1",
//   credentials: new AWS.CognitoIdentityCredentials({
//     IdentityPoolId: "eu-central-1:df1bc5d5-1bee-4dab-b02f-283bf46d2db9",
//   }),
// });

export default function ProfileDetails({ data, error, loading }) {
  const [state, setState] = useState({
    modal: false,
  });

  const [changeAvatar, { loading: loadingAvatar }] = useMutation(
    CHANGE_AVATAR,
    {
      update(cache, { data: { changeAvatar } }) {
        const data = cache.readQuery({ query: GET_CURRENT_USER });
        console.log(data);
        cache.writeQuery({
          query: GET_CURRENT_USER,
          data: { results: { avatar: changeAvatar } },
        });
      },
    }
  );

  const handleSubmit = (file) => {
    // const s3 = new AWS.S3.ManagedUpload({
    //   params: {
    //     Bucket: "latergram",
    //     Key: `${nanoid()}${file.photo1.name}`,
    //     Body: file.photo1,
    //   },
    // });
    // let result = s3.promise();
    // result.then((res) => {
    //   let input = res.Location;
    //   changeAvatar({
    //     variables: { input },
    //   }).then((res) => {
    //     console.log(res);
    //   });
    // });
  };

  const setModal = () => {
    setState((prevState) => ({
      ...prevState,
      modal: !state.modal,
    }));
  };

  if (error) return <div>error</div>;
  if (loading) return <Spinner></Spinner>;

  const { username, avatar, posts, following, followers } = data?.data;

  return (
    <>
      <Wrapper>
        <Modal>
          <button>Change Avatar</button>
        </Modal>
        <ImageWrapper>
          <img src={`${avatar}`} alt="profile" />
        </ImageWrapper>
        <UserDetails>
          <TopRowSection>
            <UserName>{`${username}`}</UserName>
            <UploadButtonDivision onClick={() => setModal()}>
              <svg fill="#fafafa" height="24" viewBox="0 0 48 48" width="24">
                <path
                  clipRule="evenodd"
                  d="M46.7 20.6l-2.1-1.1c-.4-.2-.7-.5-.8-1-.5-1.6-1.1-3.2-1.9-4.7-.2-.4-.3-.8-.1-1.2l.8-2.3c.2-.5 0-1.1-.4-1.5l-2.9-2.9c-.4-.4-1-.5-1.5-.4l-2.3.8c-.4.1-.8.1-1.2-.1-1.4-.8-3-1.5-4.6-1.9-.4-.1-.8-.4-1-.8l-1.1-2.2c-.3-.5-.8-.8-1.3-.8h-4.1c-.6 0-1.1.3-1.3.8l-1.1 2.2c-.2.4-.5.7-1 .8-1.6.5-3.2 1.1-4.6 1.9-.4.2-.8.3-1.2.1l-2.3-.8c-.5-.2-1.1 0-1.5.4L5.9 8.8c-.4.4-.5 1-.4 1.5l.8 2.3c.1.4.1.8-.1 1.2-.8 1.5-1.5 3-1.9 4.7-.1.4-.4.8-.8 1l-2.1 1.1c-.5.3-.8.8-.8 1.3V26c0 .6.3 1.1.8 1.3l2.1 1.1c.4.2.7.5.8 1 .5 1.6 1.1 3.2 1.9 4.7.2.4.3.8.1 1.2l-.8 2.3c-.2.5 0 1.1.4 1.5L8.8 42c.4.4 1 .5 1.5.4l2.3-.8c.4-.1.8-.1 1.2.1 1.4.8 3 1.5 4.6 1.9.4.1.8.4 1 .8l1.1 2.2c.3.5.8.8 1.3.8h4.1c.6 0 1.1-.3 1.3-.8l1.1-2.2c.2-.4.5-.7 1-.8 1.6-.5 3.2-1.1 4.6-1.9.4-.2.8-.3 1.2-.1l2.3.8c.5.2 1.1 0 1.5-.4l2.9-2.9c.4-.4.5-1 .4-1.5l-.8-2.3c-.1-.4-.1-.8.1-1.2.8-1.5 1.5-3 1.9-4.7.1-.4.4-.8.8-1l2.1-1.1c.5-.3.8-.8.8-1.3v-4.1c.4-.5.1-1.1-.4-1.3zM24 41.5c-9.7 0-17.5-7.8-17.5-17.5S14.3 6.5 24 6.5 41.5 14.3 41.5 24 33.7 41.5 24 41.5z"
                  fillRule="evenodd"
                ></path>
              </svg>
            </UploadButtonDivision>
          </TopRowSection>
          <BottomRowSection>
            <span>{posts.length} posts</span>
            <span>{followers.length} followers</span>
            <span>{following.length} following</span>
          </BottomRowSection>
        </UserDetails>
      </Wrapper>
      <FormModal>
        <Formik initialValues={{ photo1: "" }} onSubmit={handleSubmit}>
          {(formProps) => (
            <Form>
              <Input
                type="file"
                name="file"
                onChange={(event) => {
                  formProps.setFieldValue("photo1", event.target.files[0]);
                }}
              />
              <button type="submit">Submit</button>
            </Form>
          )}
        </Formik>
      </FormModal>
    </>
  );
}

const Wrapper = styled.section`
  position: relative;
  padding: 30px 20px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #dbdbdb;
  max-width: 975px;
  justify-content: space-between;
  width: 100%;
  padding-left: 50px;
  padding-bottom: 50px;
`;

const UploadButtonDivision = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: grey;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  button {
    background-color: #18191a;
    border-radius: 10px;
    border: 0;
    color: white;
    padding: 5px 10px;
    cursor: pointer;
  }

  svg {
    cursor: pointer;
  }
`;

const UserDetails = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 4;
`;

const ImageWrapper = styled.div`
  flex-grow: 1;
  img {
    width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: 50%;
  }
`;

const TopRowSection = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const BottomRowSection = styled.div`
  display: flex;
  width: 100%;
  margin-top: 20px;

  span {
    font-weight: bold;
    margin-right: 12.5px;
  }
`;

const UserName = styled.p`
  font-weight: 700;
  font-size: 20px;
  margin-right: 20px;
`;

const Modal = styled.div`
  position: absolute;
  border: 0px solid red;
  left: 70px;
  cursor: pointer;

  button {
    background-color: #18191a;
    border-radius: 10px;
    border: 0;
    color: white;
    padding: 5px 10px;
    cursor: pointer;
  }
`;

const FormModal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Input = styled.input``;
