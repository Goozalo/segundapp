import mongoose from "mongoose";

try {
  await mongoose.connect(process.env.DB_URI);
  console.log("Conección a MongoDB exitosa ❤");
} catch (error) {
  console.log("Error de conección a MongoDb 😢 " + error);
}
