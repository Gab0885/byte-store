import z from "zod";

const userIdSchema = z.number().positive("O ID do usuário deve ser maior que zero.");
const productIdSchema = z.number().positive("O ID do produto deve ser maior que zero.");
const quantitySchema = z.number().positive("A quantidade deve ser maior que zero.");

export const insertProductInCartSchema = z
  .object({
    userId: userIdSchema,
    productId: productIdSchema,
    quantity: quantitySchema.optional(),
  })
  .strict();

export const updateQuantityInCartSchema = z
  .object({
    userId: userIdSchema,
    productId: productIdSchema,
    newQuantity: quantitySchema,
  })
  .strict();

export type InsertProductInCartInput = z.infer<typeof insertProductInCartSchema>;
export type UpdateQuantityInCartInput = z.infer<typeof updateQuantityInCartSchema>;