/** @format */
import "./style.css";

import React, { ReactElement } from "react";
import ReactDOM from "react-dom";
import App from "./src/App";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";

const link = createUploadLink({
  uri: "http://localhost:4000/graphql",
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App></App>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
