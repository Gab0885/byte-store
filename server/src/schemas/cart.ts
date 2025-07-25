import z from "zod";

export const insertProductInCartSchema = z
  .object({
    userId: z.number().positive("O ID do usuário deve ser maior que zero."),

    productId: z.number().positive("O ID do produto deve ser maior que zero."),

    quantity: z.number().positive("A quantidade deve ser maior que zero."),
  })
  .strict();

export type insertProductInCartInput = z.infer<
  typeof insertProductInCartSchema
>;
