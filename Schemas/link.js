import mongoose from "mongoose";
const { Schema, model } = mongoose;

const linkSchema = new Schema({
  link: {
    type: String,
    required: true,
    trim: true,
  },
  shortLink: {
    type: String,
    required: true,
    unique: true,
  },
  uid: {
    type: Schema.Types.ObjectId,
    ref: "userdb",
    required: true,
  },
});

export const Link = model("Link", linkSchema);
