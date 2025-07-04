import type { NextFunction, Request, Response } from "express";
import { deleteById, findAll, findById, findByName } from "../services/productService";

export const findAllProducts = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await findAll()
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

export const findProductByID = async (req: Request, res: Response, next: NextFunction) => {
  const id = +req.params.id;
  if (isNaN(id)) {
    res.status(400).json({ message: "ID Inválido." });
    return;
  }

  try {
    const product = await findById(id)
    if (!product) {
      res.status(404).json({ message: "Produto não encontrado." });
      return;
    }

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

export const findProductByName = async ( req: Request, res: Response, next: NextFunction) => {
  const { name } = req.params
  if (!name || !String(name)) {
    res.status(400).json("Nome inválido.")
    return;
  }

  try {
    const products = await findByName(name)
    if(products.length === 0) {
      res.status(404).json({ message: "Produto não encontrado."})
      return
    }

    res.status(200).json(products)
  } catch (error) {
    next(error)
  }
}

export const deleteProductById = async (req: Request, res: Response, next: NextFunction) => {
  const id = +req.params.id
  if(isNaN(id)) {
    res.status(400).json({ meesage: "ID inválido"})
    return
  }

  try {
    const deletedProduct = await deleteById(id)
    if (!deletedProduct) {
      res.status(404).json({ message: "Produto não encontrado." })
    }

    res.status(200).json({ message: "Produto deletado com sucesso.", deletedProduct})
  } catch (error) {
    next(error)
  }
}
