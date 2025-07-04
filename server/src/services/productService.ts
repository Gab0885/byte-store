import { prisma } from "../config/database";
import type { Product } from "../prisma/generated/prisma";
import type { createProductInput } from "../schemas/product";

export async function findAll() {
  return await prisma.product.findMany();
}

export async function findById(id: number): Promise<Product | null> {
  return await prisma.product.findUnique({ where: { id } });
}

export async function findByName(name: string): Promise<Product[]> {
  return await prisma.product.findMany({
    where: { name: { contains: name, mode: "insensitive" } },
  });
}

export async function deleteById(id: number): Promise<Product | null> {
  return await prisma.product.delete({ where: { id } });
}

export async function createNew(product: createProductInput) {
  return await prisma.product.create({ data: product });
}
