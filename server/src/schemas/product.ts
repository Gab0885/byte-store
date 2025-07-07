import z from "zod";

export const createProductSchema = z
  .object({
    name: z
      .string()
      .nonempty("O nome do produto é obrigatório")
      .min(2, "O nome deve ter ao menos 2 caracteres"),

    category: z
      .string()
      .trim()
      .nonempty("A categoria é obrigatória")
      .min(2, "A categoria deve ter ao menos 2 caracteres"),

    description: z
      .string()
      .trim()
      .nonempty("A descrição é obrigatória")
      .min(10, "A descrição deve ter ao menos 10 caracteres"),

    image: z
      .string()
      .trim()
      .nonempty("A URL da imagem é obrigatória")
      .url("Formato de URL inválido"),

    price: z.number().positive("O preço deve ser maior que zero"),

    quantity: z.number().nonnegative("A quantidade não pode ser negativa"),
  })
  .strict();

export const updateProductSchema = z.object({
  name: z
    .string()
    .nonempty("O nome do produto é obrigatório")
    .min(2, "O nome deve ter ao menos 2 caracteres")
    .optional(),

  category: z
    .string()
    .trim()
    .nonempty("A categoria é obrigatória")
    .min(2, "A categoria deve ter ao menos 2 caracteres")
    .optional(),

  description: z
    .string()
    .trim()
    .nonempty("A descrição é obrigatória")
    .min(10, "A descrição deve ter ao menos 10 caracteres")
    .optional(),

  image: z
    .string()
    .trim()
    .nonempty("A URL da imagem é obrigatória")
    .url("Formato de URL inválido")
    .optional(),

  price: z.number().positive("O preço deve ser maior que zero").optional(),

  quantity: z
    .number()
    .nonnegative("A quantidade não pode ser negativa")
    .optional(),
});

export type createProductInput = z.infer<typeof createProductSchema>;

export type updateProductInput = z.infer<typeof updateProductSchema>;
