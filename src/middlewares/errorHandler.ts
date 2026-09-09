import {Request, Response, NextFunction} from 'express';
import { AppError } from '../errors/appError.js';

export const errorHandler = (
    err: any,
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    //  Imprime el error real en la terminal para identificar la causa
console.error('>>> ERROR CAPTURADO:', err);
    // Manejo de errores especificos de la aplicación.
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            status: err.statusCode,
            message: err.message,
            code: err.code,
            details: err.details,
        });
    }

// Manejo de errores genéricos (500)
return res.status(err.statusCode || 500).json({
    status: err.statusCode || 500,
    message: err.message || 'Error interno del servidor',
    code: err.code || 'INTERNAL_SERVER_ERROR',
    details: err.details || [],
});
}
