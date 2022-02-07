/** @format */

import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import { GET_CURRENT_USER, GET_USER_BY_ID } from "../../graphql/Queries";
import Spinner from "../../utils/Spinner";
import {
  CHANGE_AVATAR,
  FOLLOW_USER,
  UNFOLLOW_USER,
} from "../../graphql/Mutations";
import { useDropzone } from "react-dropzone";
import { Formik, Form } from "formik";
import AWS from "aws-sdk";
import { useForm } from "react-hook-form";
import { FaTimes } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { nanoid } from "nanoid";

AWS.config.update({
  region: "eu-central-1",
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: "eu-central-1:df1bc5d5-1bee-4dab-b02f-283bf46d2db9",
  }),
});

export default function ProfileDetails() {
  //HOOKS
  const [isFollowing, follow] = useState(false);
  const [isActive, setActive] = useState(false);
  const { register, handleSubmit, errors } = useForm();
  const [picture, addPicture] = useState("");
  const { id } = useParams();

  //MUTATIONS && QUERIES
  const { data, loading, error } = useQuery(GET_CURRENT_USER);
  const {
    data: data2,
    loading: loading2,
    error: error2,
  } = useQuery(GET_USER_BY_ID, {
    variables: { input: id },
  });

  const [changeAvatar, { loading: loadingAvatar }] = useMutation(
    CHANGE_AVATAR,
    {
      update(cache, { data: { changeAvatar } }) {
        const data = cache.readQuery({ query: GET_CURRENT_USER });
        cache.writeQuery({
          query: GET_CURRENT_USER,
          data: { data: { avatar: changeAvatar } },
        });
      },
    }
  );

  const onDrop = useCallback(async ([file]) => {
    console.log(file);
    const s3 = new AWS.S3.ManagedUpload({
      params: {
        Bucket: "latergram",
        Key: `${nanoid()}${file.name}`,
        Body: file,
      },
    });
    let result = s3.promise();
    result.then((res) => {
      addPicture(res.Location);
      changeAvatar({
        variables: { input: res.Location },
      });
      setActive(false);
    });
  }, []);

  const [followUser, { error: error1, loading: loading1 }] =
    useMutation(FOLLOW_USER);

  const [unfollowUser, { error: error3, loading: loading3 }] =
    useMutation(UNFOLLOW_USER);

  // COMPONENT METHODS

  const followTheUser = () => {
    followUser({ variables: { input: newId } });
  };

  const unfollowTheUser = () => {
    unfollowUser({ variables: { input: newId } });
  };

  //DESTRUCTURING

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  if ((loading, loading1, loading2, error, error1, error2, error3))
    return "Loading...";

  if (loading2) {
    return <Spinner />;
  } else {
    const {
      followers,
      following,
      username,
      posts,
      _id: newId,
      avatar,
    } = data2.data;
    return (
      <>
        <MainContainer>
          <RowOne>
            <div>
              {isActive && (
                <UploadButton>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <button>Upload picture</button>
                  </div>
                </UploadButton>
              )}
              <img src={`${avatar}`} width="150" height="150" />
              {loadingAvatar ? <Spinner /> : null}
            </div>
            <div>
              <div>
                <p>{username && username}</p>
                {data && data.data._id !== newId ? (
                  <div>
                    {data.data.following.find(({ _id }) => newId === _id) ? (
                      <UnfollowButton
                        isFollowing={isFollowing}
                        onClick={(newId) => unfollowTheUser(newId)}
                      >
                        Following
                      </UnfollowButton>
                    ) : (
                      <FollowButton
                        isFollowing={isFollowing}
                        onClick={() => followTheUser(newId)}
                      >
                        Follow
                      </FollowButton>
                    )}
                  </div>
                ) : (
                  <button onClick={() => setActive(!isActive)}>
                    <svg
                      fill="#262626"
                      height="24"
                      viewBox="0 0 48 48"
                      width="24"
                    >
                      <path
                        clipRule="evenodd"
                        d="M46.7 20.6l-2.1-1.1c-.4-.2-.7-.5-.8-1-.5-1.6-1.1-3.2-1.9-4.7-.2-.4-.3-.8-.1-1.2l.8-2.3c.2-.5 0-1.1-.4-1.5l-2.9-2.9c-.4-.4-1-.5-1.5-.4l-2.3.8c-.4.1-.8.1-1.2-.1-1.4-.8-3-1.5-4.6-1.9-.4-.1-.8-.4-1-.8l-1.1-2.2c-.3-.5-.8-.8-1.3-.8h-4.1c-.6 0-1.1.3-1.3.8l-1.1 2.2c-.2.4-.5.7-1 .8-1.6.5-3.2 1.1-4.6 1.9-.4.2-.8.3-1.2.1l-2.3-.8c-.5-.2-1.1 0-1.5.4L5.9 8.8c-.4.4-.5 1-.4 1.5l.8 2.3c.1.4.1.8-.1 1.2-.8 1.5-1.5 3-1.9 4.7-.1.4-.4.8-.8 1l-2.1 1.1c-.5.3-.8.8-.8 1.3V26c0 .6.3 1.1.8 1.3l2.1 1.1c.4.2.7.5.8 1 .5 1.6 1.1 3.2 1.9 4.7.2.4.3.8.1 1.2l-.8 2.3c-.2.5 0 1.1.4 1.5L8.8 42c.4.4 1 .5 1.5.4l2.3-.8c.4-.1.8-.1 1.2.1 1.4.8 3 1.5 4.6 1.9.4.1.8.4 1 .8l1.1 2.2c.3.5.8.8 1.3.8h4.1c.6 0 1.1-.3 1.3-.8l1.1-2.2c.2-.4.5-.7 1-.8 1.6-.5 3.2-1.1 4.6-1.9.4-.2.8-.3 1.2-.1l2.3.8c.5.2 1.1 0 1.5-.4l2.9-2.9c.4-.4.5-1 .4-1.5l-.8-2.3c-.1-.4-.1-.8.1-1.2.8-1.5 1.5-3 1.9-4.7.1-.4.4-.8.8-1l2.1-1.1c.5-.3.8-.8.8-1.3v-4.1c.4-.5.1-1.1-.4-1.3zM24 41.5c-9.7 0-17.5-7.8-17.5-17.5S14.3 6.5 24 6.5 41.5 14.3 41.5 24 33.7 41.5 24 41.5z"
                        fillRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                )}
              </div>
              <div>
                <span>
                  <strong>{posts && posts.length}</strong> post
                </span>
                <span>
                  <strong>{followers && followers.length}</strong> followers
                </span>
                <span>
                  <strong>{following && following.length}</strong> following
                </span>
              </div>
            </div>
          </RowOne>
        </MainContainer>
      </>
    );
  }
}

const MainContainer = styled.div`
  width: 100%;
  position: relative;
  background-color: #18191a;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const RowOne = styled.div`
  padding: 30px 20px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #dbdbdb;
  max-width: 975px;
  justify-content: space-between;
  width: 100%;
  padding-left: 50px;
  padding-bottom: 50px;
  & > div:nth-of-type(1) {
    margin-right: 100px;
    position: relative;
    img {
      border-radius: 50%;
      object-fit: cover;
    }
  }
  & > div:nth-of-type(2) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-grow: 4;
    color: #e5e7ec;
    & > div:nth-of-type(1) {
      width: 100%;
      display: flex;
      p {
        font-size: 28px;
      }
      button:nth-of-type(1) {
        cursor: pointer;
        margin-left: 20px;
        margin-right: 15px;
        border: 1px solid #dbdbdb;
        padding: 3px 9px;
        border-radius: 5px;
        font-weight: 600;
        font-size: 14px;
        letter-spacing: 0.2px;
      }
      button:nth-of-type(2) {
        border: none;
      }
    }
    & > div:nth-of-type(2) {
      margin-top: 30px;
      display: flex;
      width: 100%;
      span:nth-of-type(2) {
        margin-left: 20px;
        margin-right: 20px;
      }
    }
  }
`;

const FollowButton = styled.button`
  background-color: #0095f6;
  color: white;
  ${({ isFollowing }) => isFollowing && `display:none`}
`;

const UnfollowButton = styled.button`
  background-color: #fafafa;
  ${({ isFollowing }) => isFollowing && `display:block`}
`;

const UploadButton = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  button {
    background-color: #18191a;
    border-radius: 10px;
    border: 0;
    color: white;
    padding: 5px 10px;
    cursor: pointer;
  }
`;
