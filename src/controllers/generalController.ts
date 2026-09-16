import { Request, Response } from 'express';

export const welcome = async (_req: Request, res: Response) => {
  let status = 200;

  try {
    return res.status(status).json({
      status,
      message: 'Bienvenido a la API de Turnos Médicos',
    });
  } catch (_error) {
    status = 500;
    
    return res.status(status).json({
      status,
      message: 'Error interno del servidor',
      code: 'INTERNAL_SERVER_ERROR',
      details: [],
    });
  }
};

export const routeNotFound = async (req: Request, res: Response) => {
  let status = 404;

  try {
    return res.status(status).json({
      status,
      message: `La ruta ${req.method} ${req.originalUrl} no existe`,
      code: 'ROUTE_NOT_FOUND',
      details: [],
    });
  } catch (_error) {
    status = 500;
    return res.status(status).json({
      status,
      message: 'Error interno del servidor',
      code: 'INTERNAL_SERVER_ERROR',
      details: [],
    });
  }
};
