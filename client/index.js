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
import { setContext } from "@apollo/client/link/context";
import Theme from "./Theme.jsx";

let uri = "";

if (process.env.NODE_ENV === "production") {
  uri = "https://laterrgram.herokuapp.com/graphql";
} else {
  uri = "http://localhost:4000/graphql";
}

const link = createUploadLink({
  uri: "http://localhost:4000/graphql",
});
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? token : "",
    },
  };
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(link),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Theme>
        <App></App>
      </Theme>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
