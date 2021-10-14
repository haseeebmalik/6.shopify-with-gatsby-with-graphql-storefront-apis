// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method

const Shopify = require('@shopify/shopify-api');


const handler = async (event) => {
  console.log("shopify",Shopify.Shopify.Clients)
  const client = new Shopify.Shopify.Clients.Graphql('haseeeb-store-2.myshopify.com', "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");
const data = await client.query({
  
data: `{
    
products(first: 10, reverse: true) {
      
edges {
        
node {
          
id
          
title
          
handle
        
}
      
}
    
}
  
}`,
});
  try {
    const subject = event.queryStringParameters.name || 'World'
    return {
      statusCode: 200,
      body: JSON.stringify({ message: data }),
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
