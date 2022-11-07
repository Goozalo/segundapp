import { Router } from "express";
import {
  deleteLink,
  leerLinks,
  saveLink,
  singleLink,
  updateLink,
} from "../controllers/links.controllers.js";
import { redirectLink } from "../controllers/redirect.router.js";
import { rutaProtegida } from "../middlewares/authProtegida.js";
import { validationParam, validationURL } from "../middlewares/validations.js";
const router = Router();

// GET /links all links
router.get("/", rutaProtegida, leerLinks);
// GET /links/:id single link
router.get("/:id", rutaProtegida, validationParam, singleLink);
// POST /links save a link
router.post("/", rutaProtegida, validationURL, saveLink);
// PATCH /links/:id edit a link
router.patch("/:id", rutaProtegida, validationParam, validationURL, updateLink);
// DELETE /links/:id dekete a link
router.delete("/:id", rutaProtegida, validationParam, deleteLink);


export default router;
