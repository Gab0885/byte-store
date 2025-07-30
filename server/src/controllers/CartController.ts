import type { NextFunction, Request, Response } from "express";
import { getAllCartItems, insertItemInCart, updateCartItemQuantity } from "../services/cartService";

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
    const result = await insertItemInCart(userId, productId, quantity);
    if (!result.success) {
      res.status(400).json({ message: result.message || "Erro ao adicionar produto ao carrinho."})
    }

    res
      .status(201)
      .json({ message: "Produto adicionado ao carrinho com sucesso!", data: result.data });
  } catch (error) {
    next(error);
  }
};

export const updateQuantityInCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId, productId, newQuantity } = req.body
  try {
    const result= await updateCartItemQuantity(userId, productId, newQuantity)

    if(!result.success) {
      res.status(404).json({ message: result.message})
    }

    res.status(200).json({ message: "Quantidade atualizada com sucesso!", data: result.data})
  } catch (error) {
    next(error)
  }
}