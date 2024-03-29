import { gql, useMutation } from "@apollo/client";
import { navigate } from "gatsby-link";
import * as React from "react";
import { graphql } from "gatsby";
const createCheckout = gql`
  mutation checkoutCreate($input: CheckoutCreateInput!) {
    checkoutCreate(input: $input) {
      checkout {
        id
        webUrl
        lineItems(first: 100) {
          edges {
            node {
              id
              quantity
              variant {
                id
              }
              title
            }
          }
        }
      }
      checkoutUserErrors {
        code
        field
        message
      }
      queueToken
    }
  }
`;
const addLineItems = gql`
  mutation checkoutLineItemsAdd(
    $lineItems: [CheckoutLineItemInput!]!
    $checkoutId: ID!
  ) {
    checkoutLineItemsAdd(lineItems: $lineItems, checkoutId: $checkoutId) {
      checkout {
        id
        webUrl
        lineItems(first: 100) {
          edges {
            node {
              id
              quantity
              variant {
                id
              }
              title
            }
          }
        }
      }
      checkoutUserErrors {
        code
        field
        message
      }
    }
  }
`;
const checkOutSubmit = async () => {
  const response = await fetch("/.netlify/functions/gqlnode", {
    method: "post",
  });
  const dataa = await response.json();
  console.log("dataaaaaaa===>", dataa);
}
const IndexPage = ({ data }) => {
  const [checkOutDataVar, setCheckoutVar] = React.useState();
  console.log("dataa", data);
  const [triggeruseEffect, setTriggerUseEffect] = React.useState(false);
  const [createCheckoutMutation, { data: checkoutData }] =
    useMutation(createCheckout);
  const [addLineItemMutation, { data: addLineItemData }] =
    useMutation(addLineItems);

  React.useEffect(() => {
    (async () => {
      const response = await createCheckoutMutation({
        variables: {
          input: {},
        },
      });
      console.log("checkout session created", response);
      setCheckoutVar(response);
      console.log("checkoutData.checkoutCreate.checkout.id", response);
    })();
  }, []);
  // setCheckoutVar("abc");
  console.log("checkoutData.checkoutCreate.checkout.id_out", checkOutDataVar);
  return (
    <main>
      hello world
      <div>
        <button
          onClick={() => {
            console.log(
              "weburl",
              checkOutDataVar.data.checkoutCreate.checkout.webUrl
            );
            // return;
            window.open(checkoutData?.createCheckout?.checkout?.webUrl);
          }}
        >
          checkout
        </button>
        <button
          onClick={() => {
            navigate("/cart");
          }}
        >
          cart
        </button>
        {data &&
          data.allShopifyProduct.edges.map((node, i) => (
            <div
              key={node.node.id}
              style={{ border: "1px solid gray", borderRadius: "5" }}
            >
              {node.node.variants.map((val, ind) => (
                <div>
                  <button
                    onClick={() => {
                      console.log(node.node.id);
                    }}
                  >
                    abc
                  </button>
                  {console.log("variants", node.node.variants)}
                  {console.log("key", node.node.id)}
                  <div>
                    {" "}
                    {ind + 1}. Name:{node.node.variants[ind].product.title} ===
                    price:
                    {node.node.variants[ind].product.variants[ind].price}
                  </div>
                  // <div> Name:{node.node.variants[ind].product.title}</div>
                  <br />
                  <button
                    onClick={async () => {
                      const responseAddLineItems = await addLineItemMutation({
                        variables: {
                          lineItems: [
                            {
                              quantity: 1,
                              variantId:
                                node.node.variants[ind].product.variants[ind]
                                  .storefrontId,
                            },
                          ],
                          checkoutId:
                            checkoutData?.checkoutCreate?.checkout?.id,
                        },
                      });
                      console.log("responseAddLineItems", responseAddLineItems);
                    }}
                  >
                    Add to Cart
                  </button>
                  <br/>
                 
                </div>
              ))}
            </div>
          ))}
           <button onClick={checkOutSubmit}>gqlNodeFunction</button>
      </div>
    </main>
  );
};

export default IndexPage;

export const query = graphql`
  {
    allShopifyProduct {
      edges {
        node {
          variants {
            title
            price
            id
            shopifyId
            productId
            storefrontId
            product {
              title
              variants {
                price
                storefrontId
              }
            }
          }
          shopifyId
          id
        }
      }
    }
  }
`;
