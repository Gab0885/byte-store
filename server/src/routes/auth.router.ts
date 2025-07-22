import { Router } from "express";
import { validateBody } from "../middlewares/valitade";
import { registerUser, loginUser } from "../controllers/AuthController";
import { createUserSchema, loginSchema } from "../schemas/auth";

const router = Router();

router.post("/register", validateBody(createUserSchema), registerUser);
router.post("/login", validateBody(loginSchema), loginUser);

export default router;
