import express from "express";
import {
  login,
  logout,
  protegida,
  register,
} from "../controllers/auth.controller.js";
import {
  validationLogin,
  validationRegister,
} from "../middlewares/validations.js";
import { rutaProtegida } from "../middlewares/authProtegida.js";
const router = express.Router();

router.post("/login", validationLogin, login);

router.post("/register", validationRegister, register);

router.get("/protegida", rutaProtegida, protegida);

router.get("/logout", logout);

export default router;
