// import React from "react";
import React from "react";
import ReactDOM from "react-dom";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
//cross-fetch library is used to call apis on differnt domains
import fetch from "cross-fetch";


export const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://haseeeb-store-2.myshopify.com/api/2021-07/graphql.json",
    //for fetch we install cross-fetch library
    fetch,
    headers: {
      "X-Shopify-Storefront-Access-Token": "8bc8a7af0e158f62e5ceaf9d2226d242",
    },
  }),
  cache: new InMemoryCache(),
});
