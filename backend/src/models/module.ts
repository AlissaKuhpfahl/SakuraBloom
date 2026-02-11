import { Schema, model } from "mongoose";

const moduleSchema = new Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true // online, privacy, chats, fake
    },
    title: {
      type: String,
      required: true
    },
    icon: {
      type: String
    },
    order: {
      type: Number
    }
  },
  { timestamps: true }
);

export default model("Module", moduleSchema);
