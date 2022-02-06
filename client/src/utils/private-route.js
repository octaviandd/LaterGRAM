/** @format */

import React, { ReactElement, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { GET_CURRENT_USER } from "../graphql/queries";
import { useQuery } from "@apollo/client";
import Spinner from "./spinner";

export default function PrivateRoute({ children }) {
  const { data, error, loading } = useQuery(GET_CURRENT_USER);

  if (error) console.log(error);
  if (loading) return <Spinner></Spinner>;

  console.log(data);

  return data ? <>{children}</> : <Navigate to="/login" />;
}
