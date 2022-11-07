import { Router } from "express";
const router = Router();
import { redirectLink } from "../controllers/redirect.router.js";

// Redireccionamiento LINK
router.get("/:nanoid", redirectLink);

export default router;
