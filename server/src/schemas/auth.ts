import z from "zod";

export const createUserSchema = z
  .object({
    name: z
      .string()
      .trim()
      .nonempty("O nome é obrigatório")
      .min(2, "O nome deve ter ao menos 2 caracteres"),

    email: z
      .string()
      .trim()
      .nonempty("O email é obrigatório")
      .email("Formato de email inválido"),

    password: z.string().min(5, "A senha deve ter ao menos 5 caracteres"),
  })
  .strict();

export const loginSchema = z
  .object({
    email: z.string().trim().email("Formato de email inválido"),

    password: z.string().trim().min(5, "A senha deve ter ao menos 5 caracteres"),
  })
  .strict();

export type CreateUserInput = z.infer<typeof createUserSchema>;

export type LoginInput = z.infer<typeof loginSchema>;
