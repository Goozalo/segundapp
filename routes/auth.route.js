import express from "express";
import { login, register } from "../controllers/auth.controller.js";
import { body } from "express-validator";
import { validationResultMiddleware } from "../middlewares/validationResult.js";
const router = express.Router();

router.post(
  "/login",
  [
    body("email", "email invalido").trim().isEmail().normalizeEmail(),
    body("password", "Contraseña invalida").trim().isLength({ min: 6 }),
  ],
  validationResultMiddleware,
  login
);

router.post(
  "/register",
  [
    body("email", "email invalido").trim().isEmail().normalizeEmail(),
    body("password", "Contraseña invalida").trim().isLength({ min: 6 }),
  ],
  validationResultMiddleware,
  register
);

export default router;
