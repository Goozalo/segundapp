import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema({
  name:{
    type: String,
    required: true,
    trim: true,
  },
  lastname:{
    type: String,
    required: true,
    trim: true,
  },
  email:{
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: {unique: true},
  },
  password:{
    type: String,
    require: true,
  },
});

export const User = model("userdb", userSchema);
