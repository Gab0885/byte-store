import { Router } from "express";
import { findAllProducts, findProductByID, findProductByName} from "../controllers/ProdutcController";

const router = Router();

router.get("/products", findAllProducts);

router.get("/products/search/:name", findProductByName)

router.get("/products/:id", findProductByID);


export { router };
