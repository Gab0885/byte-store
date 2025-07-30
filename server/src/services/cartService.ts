import { prisma } from "../config/database";
import type { CartItem } from "../prisma/generated/prisma";

type ServiceResponse<T> = {
  success: boolean;
  data?: T;
  message?: string;
};

const CART_ITEM_NOT_FOUND = "Item do carrinho não encontrado.";

export async function getAllCartItems(id: number): Promise<CartItem[]> {
  return await prisma.cartItem.findMany({
    where: { userId: id },
    include: { product: true },
  });
}

async function findCartItem(userId: number, productId: number) {
  return prisma.cartItem.findFirst({ where: { userId, productId } });
}

export async function generateCartItem(
  userId: number,
  productId: number,
  quantity: number
) {
  return await prisma.cartItem.create({
    data: { userId, productId, quantity },
    include: { product: true },
  });
}

async function updateItemQuantityById(id: number, quantity: number) {
  return prisma.cartItem.update({
    where: { id },
    data: { quantity },
    include: { product: true },
  });
}

export async function getCartItemById(
  userId: number,
  productId: number
): Promise<ServiceResponse<CartItem>> {
  const item = await findCartItem(userId, productId);
  if (!item) return { success: false, message: CART_ITEM_NOT_FOUND };

  return { success: true, data: item };
}

export async function updateCartItemQuantity(
  userId: number,
  productId: number,
  newQuantity: number
): Promise<ServiceResponse<CartItem>> {
  const existingItem = await findCartItem(userId, productId);
  if (!existingItem) return { success: false, message: CART_ITEM_NOT_FOUND };

  const updatedItem = await updateItemQuantityById(
    existingItem.id,
    newQuantity
  );
  return { success: true, data: updatedItem };
}

export async function insertItemInCart(
  userId: number,
  productId: number,
  quantity: number = 1
): Promise<ServiceResponse<CartItem>> {
  const existingItem = await findCartItem(userId, productId);
  if (existingItem) {
    const newQuantity = existingItem.quantity + quantity;
    const updatedItem = await updateItemQuantityById(
      existingItem.id,
      newQuantity
    );
    return { success: true, data: updatedItem };
  }

  const newItem = await generateCartItem(userId, productId, quantity);
  return { success: true, data: newItem };
}

export async function removeCartItemById(
  userId: number,
  productId: number
): Promise<ServiceResponse<null>> {
  const existingItem = await findCartItem(userId, productId);
  if (!existingItem) return { success: false, message: CART_ITEM_NOT_FOUND };

  await prisma.cartItem.delete({ where: { id: existingItem.id } });
  return { success: true };
}
