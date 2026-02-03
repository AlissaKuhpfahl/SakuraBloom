import mongoose, { Schema, model } from "mongoose";
import { mime, minLength } from "zod";
import { Progress } from "#models";

const kidsSchema = new Schema({
  name: { type: String, default: "Child" },
  id: { type: String }
});

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "firstName is required"],
      trim: true
    },
    lastName: {
      type: String,
      required: [true, "firstName is required"],
      trim: true
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Email is not valid"]
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
      minlength: [12, "Password must be at least 6 characters long"]
    },
    roles: {
      type: [String],
      default: ["user", "child"],
      required: true
    },

    members: {
      type: [Schema.Types.ObjectId],
      ref: "Progress"
    }
  },
  {
    timestamps: { createdAt: true, updatedAt: false }
  }
);

const User = model("User", userSchema);

export default User;
