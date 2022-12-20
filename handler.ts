import { APIGatewayProxyHandler } from "aws-lambda";
import axios from "axios";
import mongoose from "mongoose";
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
  try {
    const db = process.env.MONGO_URL;
    console.log(db);
    await mongoose.connect(db).then(() => console.log("Connected!"));
    const { email, password } = JSON.parse(event.body);
    // retrieve address
    const addressData = await generateBlockAddress();

    const doc = await Wallet.create({ password, email, wallet: addressData });

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Your address was generated successfully",
        data: {
          address: addressData,
          email,
        },
      }),
    };
  } catch (error) {
    console.log("error", error);
  }
};

export const retrieveWallet: APIGatewayProxyHandler = async (
  event,
  context
) => {
  try {
    const db = process.env.MONGO_URL;

    await mongoose.connect(db).then(() => console.log("Connected!"));
    const { email } = event.pathParameters;

    const doc = await Wallet.findOne({ email });
    // console.log("doc", doc);
    const { public: publicKey, address } = doc.wallet;
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Your address was generated successfully",
        data: {
          publicKey,
          address,
        },
      }),
    };
  } catch (error) {
    console.log("error", error);
  }
};
// How do we transfer out the money ?

async function generateBlockAddress() {
  const token = process.env.TOKEN;
  const addressCall = await axios.post(
    `https://api.blockcypher.com/v1/eth/main/addrs?token=${token}`
  );

  return addressCall.data;
}
