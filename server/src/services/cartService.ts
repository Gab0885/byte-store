import { prisma } from "../config/database";
import type { CartItem } from "../prisma/generated/prisma";

export async function getCartItemById(userId: number, productId: number) {
  return await prisma.cartItem.findFirst({
    where: { userId, productId },
  });
}

export async function getAllCartItems(id: number): Promise<CartItem[]> {
  return await prisma.cartItem.findMany({
    where: { userId: id },
    include: { product: true },
  });
}

export async function generateCartItem(userId: number, productId: number, quantity: number) {
  return await prisma.cartItem.create({
    data: { userId, productId, quantity },
    include: { product: true },
  });
}

export async function insertItemInCart(
  userId: number,
  productId: number,
  quantity: number = 1
): Promise<CartItem> {
  const existingItem = await getCartItemById(userId, productId)

  if (existingItem) {
    return await prisma.cartItem.update({
      where: {
        id: existingItem.id,
      },
      data: {
        quantity: existingItem.quantity + quantity,
      },
      include: {
        product: true,
      },
    });
  }

  return await generateCartItem(userId, productId, quantity)
}
