/** @format */

import React, { ReactElement, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { GET_CURRENT_USER } from "../graphql/Queries";
import { useQuery } from "@apollo/client";
import Spinner from "./Spinner";

export default function PrivateRoute({ children }) {
  const { data, error, loading } = useQuery(GET_CURRENT_USER);

  if (error) console.log(error);
  if (loading) return <Spinner></Spinner>;

  console.log(data);

  return data ? <>{children}</> : <Navigate to="/login" />;
}
