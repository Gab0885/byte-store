import { Router } from "express";
import { findAllProducts, findProductByID} from "../controllers/ProdutcController";

const router = Router();

router.get("/products", findAllProducts);

router.get("/products/:id", findProductByID);

export { router };
