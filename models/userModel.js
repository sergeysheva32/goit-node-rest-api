import { Schema, model } from "mongoose";
import { subsList } from "../helpers/index.js";

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: subsList,
      default: "starter",
    },
    token: { type: String, default: "" },
    avatarURL: {
      type: String,
      required: true,
    },
  },

  {
    versionKey: false,
    minlength: 6,
    timestamps: true,
  }
);

export const User = model("user", userSchema);