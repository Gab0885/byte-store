import { Router } from "express";
import { createProduct, deleteProductById, findAllProducts, findProductByID, findProductByName, updateProduct} from "../controllers/ProdutcController";
import { validateBody } from "../middlewares/valitade";
import { createProductSchema, updateProductSchema } from "../schemas/product";

const router = Router();

router.get("/products", findAllProducts);

router.get("/products/search/:name", findProductByName)

router.get("/products/:id", findProductByID);

router.delete("/products/:id", deleteProductById)

router.post("/products", validateBody(createProductSchema), createProduct)

router.put("/products/:id", validateBody(updateProductSchema), updateProduct)

export { router };