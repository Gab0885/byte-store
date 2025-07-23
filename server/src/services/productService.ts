import { prisma } from "../config/database";
import type { Product } from "../prisma/generated/prisma";
import type { createProductInput, updateProductInput } from "../schemas/product";

export async function getAllProducts() {
  return await prisma.product.findMany();
}

export async function getProductById(id: number): Promise<Product | null> {
  return await prisma.product.findUnique({ where: { id } });
}

export async function getProductByName(name: string): Promise<Product[]> {
  return await prisma.product.findMany({
    where: { name: { contains: name, mode: "insensitive" } },
  });
}

export async function removeProductById(id: number): Promise<Product | null> {
  return await prisma.product.delete({ where: { id } });
}

export async function generateProduct(product: createProductInput) {
  return await prisma.product.create({ data: product });
}

export async function updateProductById(product: updateProductInput, id: number) {
  return await prisma.product.update({ where: { id }, data: product })
}