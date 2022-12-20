import { APIGatewayProxyHandler } from "aws-lambda";

export const hello: APIGatewayProxyHandler = async (event, context) => {

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Go Serverless v2.0! Your function executed successfully!",
      context,
      event,
    }),
  };
};

export const addressProvider :APIGatewayProxyHandler = async (event, context) => {
  const {email, password} = JSON.parse(event.body)
  // retrieve address 
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Your address was generated successfully",
      data: {
        address: "someAddress"
      }
    }),
  };
}
// How do we transfer out the money ?