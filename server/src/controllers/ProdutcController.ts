import type { Request, Response } from "express";
import { prisma } from "../config/database";

export const findAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany();
    res.status(200).json(products);
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};