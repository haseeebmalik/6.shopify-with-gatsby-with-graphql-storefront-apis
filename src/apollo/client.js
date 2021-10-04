// import React from "react";
import React from "react";
import ReactDOM from "react-dom";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
//cross-fetch library is used to call apis on differnt domains
import fetch from "cross-fetch";


export const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://haseeeb-store.myshopify.com/api/2021-07/graphql.json",
    //for fetch we install cross-fetch library
    fetch,
    headers: {
      "X-Shopify-Storefront-Access-Token": "4791a30ca4703aeb6e78af79ee8e1ab8",
    },
  }),
  cache: new InMemoryCache(),
});
