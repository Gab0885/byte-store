import { Router } from "express";
import {
  createProduct,
  deleteProductById,
  findAllProducts,
  findProductByID,
  findProductByName,
  updateProduct,
} from "../controllers/ProdutcController";
import { validateBody } from "../middlewares/valitade";
import { createProductSchema, updateProductSchema } from "../schemas/product";

const router = Router();

router
  .route("/")
  .get(findAllProducts)
  .post(validateBody(createProductSchema), createProduct);

router
  .route("/")
  .get(findAllProducts)
  .post(validateBody(createProductSchema), createProduct);

router.route("/search/:name").get(findProductByName);

router
  .route("/:id")
  .get(findProductByID)
  .put(validateBody(updateProductSchema), updateProduct)
  .delete(deleteProductById);

export default router