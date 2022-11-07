import "dotenv/config";
import express from "express";
import "./database/connectdb.js";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import linkRouter from "./routes/link.routes.js";
import redirectRouter from "./routes/redirect.router.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

const whitelist = [process.env.ORIGIN1, process.env.ORIGIN2];

app.use(
  cors({
    origin: function (origin, callback) {
      if (whitelist.includes(origin)) {
        callback(null, origin);
      } else {
        return callback(origin + " no autorizazdo");
      }
    },
  })
);

app.use(cookieParser());
app.use(express.json());
app.use("/api/v1/auth/", authRouter);
app.use("/api/v1/link/", linkRouter);
app.use("/", redirectRouter);
app.use(express.static("public"));

app.listen(PORT, () =>
  console.log("Conección exitosa 😊 en el puerto http://localhost:" + PORT)
);
