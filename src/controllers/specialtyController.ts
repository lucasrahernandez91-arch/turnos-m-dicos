import { Request, Response } from 'express';
import { AppError } from '../errors/appError.js';
import * as specialtyService from '../services/specialtyService.js';

const sendError = (error: unknown, res: Response) => {
  console.error('Error en especialidades:', error);
  const status = error instanceof AppError ? error.statusCode : 500;
  const message = error instanceof AppError ? error.message : 'Error interno del servidor';
  const code = error instanceof AppError ? error.code : 'INTERNAL_SERVER_ERROR';
  const details = error instanceof AppError ? error.details : [];

  return res.status(status).json({ status, message, code, details });
};

const getId = (id: string | string[]): number => {
  const parsedId = Number(id);

  if (!Number.isInteger(parsedId) || parsedId <= 0) {
    throw new AppError(400, 'El ID de la especialidad debe ser un número entero positivo', 'INVALID_SPECIALTY_ID');
  }

  return parsedId;
};

export const getSpecialties = async (_req: Request, res: Response) => {
  const status = 200;

  try {
    const specialties = await specialtyService.getAllSpecialties();
    return res.status(status).json(specialties);
  } catch (error) {
    return sendError(error, res);
  }
};

export const getSpecialtyById = async (req: Request, res: Response) => {
  const status = 200;

  try {
    const specialty = await specialtyService.getSpecialtyById(getId(req.params.id));
    return res.status(status).json(specialty);
  } catch (error) {
    return sendError(error, res);
  }
};

export const createSpecialty = async (req: Request, res: Response) => {
  const status = 201;

  try {
    const { nombreEspecialidad, activa } = req.body ?? {};

    if (typeof nombreEspecialidad !== 'string' || nombreEspecialidad.trim().length === 0) {
      throw new AppError(400, 'El nombre de la especialidad es obligatorio', 'INVALID_SPECIALTY');
    }

    if (typeof activa !== 'boolean') {
      throw new AppError(400, 'El campo activa debe ser un booleano', 'INVALID_SPECIALTY');
    }

    const newSpecialty = await specialtyService.createSpecialty({
      nombreEspecialidad: nombreEspecialidad.trim(),
      activa,
    });

    return res.status(status).json(newSpecialty);
  } catch (error) {
    return sendError(error, res);
  }
};

export const deleteSpecialty = async (req: Request, res: Response) => {
  const status = 204;

  try {
    await specialtyService.deleteSpecialty(getId(req.params.id));
    return res.status(status).send();
  } catch (error) {
    return sendError(error, res);
  }
};
