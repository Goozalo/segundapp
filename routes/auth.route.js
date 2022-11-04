import express from "express";
import {
  login,
  logout,
  protegida,
  register,
} from "../controllers/auth.controller.js";
import { body } from "express-validator";
import { validationResultMiddleware } from "../middlewares/validationResult.js";
import { rutaProtegida } from "../middlewares/authProtegida.js";
const router = express.Router();

router.post("/login", validationResultMiddleware, login);

router.post(
  "/register",
  [
    body("email", "email invalido").trim().isEmail().normalizeEmail(),
    body("password", "Contraseña invalida").trim().isLength({ min: 6 }),
  ],
  validationResultMiddleware,
  register
);

router.get("/protegida", rutaProtegida, protegida);

router.get("/logout", logout);

export default router;
