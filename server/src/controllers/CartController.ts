import type { NextFunction, Request, Response } from "express";
import { getAllCartItems, insertItemInCart } from "../services/cartService";

export const findAllCartProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const userId = +req.params.userId
  try {
    const products = await getAllCartItems(userId)

    if (products.length === 0) {
      res.status(200).json({ message: "Seu carrinho está vazio."})
      return
    }
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

export const addProductToCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId, productId, quantity} = req.body
  try {
    const cartItem = await insertItemInCart(userId, productId, quantity);
    res
      .status(201)
      .json({ message: "Produto adicionado ao carrinho com sucesso!", cartItem });
  } catch (error) {
    next(error);
  }
};