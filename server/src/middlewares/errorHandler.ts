import type { Request, Response, NextFunction } from "express";
import { AppError } from "../erros/appError";

// Verifica se o erro é de violação de restrição única (código P2002 do Prisma)
function isUniqueConstraintError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as any).code === "P2002"
  );
}

const errorHandler = (error: unknown, _req: Request, res: Response, _next: NextFunction) => {
  
  // Trata erro de chave única
 if (isUniqueConstraintError(error)) {
    const campos = Array.isArray((error as any).meta?.target)
      ? (error as any).meta.target.join(", ")
      : "campo";

    res.status(409).json({
      status: "fail",
      message: `Já existe um registro com este(s) ${campos}.`,
    });
    return;
  }

  // Trata erros conhecidos e operacionais lançados pela aplicação
   if (error instanceof AppError) {
    res.status(error.statusCode).json({
      status: "fail",
      message: error.message,
    });
    return;
  }

  res.status(500).json({
    status: "error",
    message: "Erro interno do servidor.",
  });
};

export default errorHandler;
