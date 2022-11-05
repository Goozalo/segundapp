import { validationResult, body, param } from "express-validator";
import axios from "axios";

export const gestiorValidaciones = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};

export const validationLogin = [
  body("email", "email invalido").trim().isEmail().normalizeEmail(),
  body("password", "Contraseña invalida").trim().isLength({ min: 6 }),
  gestiorValidaciones,
];

export const validationRegister = [
  body("email", "email invalido").trim().isEmail().normalizeEmail(),
  body("password", "Contraseña invalida").trim().isLength({ min: 6 }),
  gestiorValidaciones,
];

export const validationURL = [
  body("link", "URL Invalida por id")
    .trim()
    .notEmpty()
    .custom(async (value) => {
      try {
        if (!value.startsWith("http://") && !value.startsWith("https://")) {
          value = "https://" + value;
        }
        await axios.get(value);
      } catch (error) {
        throw new Error("URL Invalida por axios");
      }
    }),
  gestiorValidaciones,
];
export const validationParam = [
  param("id", "Param invalido").trim().notEmpty().escape(),
  gestiorValidaciones,
];
