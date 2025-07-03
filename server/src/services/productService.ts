import { prisma } from "../config/database";
import type { Product } from "../prisma/generated/prisma";

export async function findById(id: number): Promise<Product | null> {
  return await prisma.product.findUnique({ where: { id } });
}

export async function findByName(name: string): Promise<Product[]> {
  return await prisma.product.findMany({
    where: { name: { contains: name, mode: "insensitive" } },
  });
}
