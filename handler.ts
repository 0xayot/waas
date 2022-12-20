import { APIGatewayProxyHandler } from "aws-lambda";
import axios from "axios";
import Wallet from "walletmodel";

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

export const addressProvider: APIGatewayProxyHandler = async (
  event,
  context
) => {
  const { email, password } = JSON.parse(event.body);
  // retrieve address
  const addressData = await generateBlockAddress();

  await Wallet.create({ password, email, wallet: addressData });

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Your address was generated successfully",
      data: {
        address: addressData,
      },
    }),
  };
};
// How do we transfer out the money ?

async function generateBlockAddress() {
  const token = process.env.TOKEN;
  const addressCall = await axios.post(
    `https://api.blockcypher.com/v1/eth/main/addrs?token=${token}`
  );
  return addressCall;
}
