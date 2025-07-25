import { Router } from "express";
import {
  addProductToCart,
  findAllCartProducts,
} from "../controllers/CartController";
import { validateBody } from "../middlewares/valitade";
import { insertProductInCartSchema } from "../schemas/cart";

const router = Router();

router.route("/:userId").get(findAllCartProducts);

router
  .route("/")
  .post(validateBody(insertProductInCartSchema), addProductToCart);

export default router;
