import { Request, Response, NextFunction } from 'express';

import { AppError } from '../errors/appError.js';

export const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {

    // Imprime el error real en la terminal
    console.error('>>> ERROR CAPTURADO:', err);

    // Manejo de errores específicos de la aplicación
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            status: err.statusCode,
            message: err.message,
            code: err.code,
            details: err.details,
        });
    }

    // Manejo de errores genéricos (500)
    return res.status(500).json({
        status: 500,
        message: 'Error interno del servidor',
        code: 'INTERNAL_SERVER_ERROR',
        details: [],
    });
};