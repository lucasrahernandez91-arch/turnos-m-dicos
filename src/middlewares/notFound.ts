import { Request, Response, NextFunction } from 'express';

export const notFound = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    res.status(404).json({
        status: 404,
        message: `La ruta ${req.method} ${req.originalUrl} no existe`,
        code: 'ROUTE_NOT_FOUND'
    });
};