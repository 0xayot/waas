import { Schema, model } from "mongoose";

const walletSchema = new Schema({
  password: {
    type: String,
    required: [true, "A Wallet must be linked to an email"],
  },
  email: {
    type: String,
    required: [true, "A Wallet must be linked to an email"],
  },
  wallet: {
    type: Object,
  },
});

const Wallet = model("Wallet", walletSchema, "wallets");

export default Wallet;
