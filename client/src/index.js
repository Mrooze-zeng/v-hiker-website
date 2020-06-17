import "antd/dist/antd.css";
import { InMemoryCache } from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";
import { createUploadLink } from "apollo-upload-client";
import React from "react";
import { ApolloProvider } from "react-apollo";
import { render } from "react-dom";
import "Utils/vda";
import App from "./App";
import "./index.css";
import * as serviceWorker from "./serviceWorker";

const client = new ApolloClient({
  // eslint-disable-next-line no-undef
  uri: SERVER_URI,
  link: createUploadLink({
    // eslint-disable-next-line no-undef
    uri: SERVER_URI,
  }),
  cache: new InMemoryCache(),
});

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
serviceWorker.register();

console.log("-------------------", new Date().toISOString());
