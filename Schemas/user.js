import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: { unique: true },
  },
  password: {
    type: String,
    require: true,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const user = this;

  try {
    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(user.password, salt);
    next();
  } catch (error) {
    throw new error("No se pudo hashear la contraseña");
  }
});

userSchema.methods.compararpassword = async function (similPassword) {
  return await bcryptjs.compare(similPassword, this.password);
};

export const User = model("userdb", userSchema);
