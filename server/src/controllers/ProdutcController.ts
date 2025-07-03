import type { NextFunction, Request, Response } from "express";
import { prisma } from "../config/database";

export const findAllProducts = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await prisma.product.findMany();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

export const findProductByID = async ( req: Request, res: Response, next: NextFunction) => {
  const id = +req.params.id;
  if (isNaN(id)) {
    res.status(400).json({ message: "ID Inválido." });
    return;
  }

  try {
    const product = await prisma.product.findUnique({
      where: { id },
    });
    if (!product) {
      res.status(404).json({ message: "Produto não encontrado." });
      return;
    }

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};
