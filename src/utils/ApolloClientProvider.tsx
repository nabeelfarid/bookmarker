import React from "react";
import {
  ApolloProvider,
  ApolloClient,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import fetch from "cross-fetch";

const httpLink = new HttpLink({
  uri: "/.netlify/functions/bookmarker",
  // add isomorphic-fetch to your dependencies since apollo looks for fetch to make HTTP requests
  // https://github.com/gatsbyjs/gatsby/issues/11225#issuecomment-457211628
  fetch,
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: httpLink,
});

interface ApolloClientProviderProps {}

const ApolloClientProvider: React.FC<ApolloClientProviderProps> = (props) => {
  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
};

export default ApolloClientProvider;
