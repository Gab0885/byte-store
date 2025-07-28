import { Router } from "express";
import {
  addProductToCart,
  findAllCartProducts,
  updateQuantityInCart,
} from "../controllers/CartController";
import { validateBody } from "../middlewares/valitade";
import {
  insertProductInCartSchema,
  updateQuantityInCartSchema,
} from "../schemas/cart";

const router = Router();

router.route("/:userId").get(findAllCartProducts);

router
  .route("/")
  .post(validateBody(insertProductInCartSchema), addProductToCart)
  .put(validateBody(updateQuantityInCartSchema), updateQuantityInCart);

export default router;
