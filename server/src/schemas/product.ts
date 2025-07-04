import z from "zod";

export const createProductSchema = z.object({
    category: z.string().min(1, "Ter ao menos uma categoria é obrigatório."), 
    description: z.string().min(1, "O produto precisa de uma descrição."), 
    image: z.string().url("A imagem deve ser uma URL válida."), 
    name: z.string().min(1, "O produto precisa de um nome"), 
    price: z.number().positive("O preço precisa ser maior que zero"), 
    quantity: z.number().nonnegative("A quantidade não pode ser negativa.")
})

export type createProductInput = z.infer<typeof createProductSchema>