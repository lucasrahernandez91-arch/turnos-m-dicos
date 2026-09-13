import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';

export const validateSchema =
  (schema: z.ZodTypeAny) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error: any) {
      if (error instanceof ZodError || error?.name === 'ZodError') {
        const details = error.issues?.map((issue:any)=>({
          field:issue.path.join('.'),
          message: issue.message,
        })) || [];

        return res.status(400).json({
          status: 400,
          message: 'Error de validación en los datos ingresados',
          code: 'VALIDATION_ERROR',
          details,
        });
      }
      next(error);
    }
  };