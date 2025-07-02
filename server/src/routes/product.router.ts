import { Router } from "express";
import { findAllProducts } from "../controllers/produtcController";

const router = Router();

router.get("/", findAllProducts);

export { router };
