import { Request, Response } from 'express';
import { ZodError } from 'zod';
import { AppError } from '../errors/appError.js';
import * as doctorService from '../services/doctorService.js';
import { createDoctorSchema, updateDoctorSchema } from '../schemas/doctorSchema.js';

const sendError = (error: unknown, res: Response) => {
  if (error instanceof ZodError) {
    const status = 400;

    return res.status(status).json({
      status,
      message: 'Error de validación en los datos ingresados',
      code: 'VALIDATION_ERROR',
      details: error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      })),
    });
  }


  const status = error instanceof AppError ? error.statusCode : 500;
  const message = error instanceof AppError
  ? error.message
  : 'Error interno del servidor';

  const code = error instanceof AppError
  ? error.code 
  : 'INTERNAL_SERVER_ERROR';

  const details = error instanceof AppError ? error.details : [];

  return res.status(status).json({ status, message, code, details });
};

const getId = (id: string | string[]): number => {
  if (typeof id !== 'string') {
    throw new AppError(
      400,
      'El ID del profesional debe ser un número entero positivo',
      'INVALID_DOCTOR_ID'
    );
  }

  const parsedId = Number(id);

  if (!Number.isInteger(parsedId) || parsedId <= 0) {
    throw new AppError(
      400,
      'El ID del profesional debe ser un número entero positivo',
      'INVALID_DOCTOR_ID'
    );
  }

  return parsedId;
};

export const getDoctors = async (req: Request, res: Response) => {
  const status = 200;

  try {
    const { especialidad, activo } = req.query;

    if (especialidad !== undefined && typeof especialidad !== 'string') {
      throw new AppError(400, 'El filtro especialidad debe ser un texto', 'INVALID_FILTER');
    }

    if (activo !== undefined && activo !== 'true' && activo !== 'false') {
      throw new AppError(400, 'El filtro activo debe ser true o false', 'INVALID_FILTER');
    }

    const doctors = await doctorService.getAllDoctors({
      especialidad,
      activo: activo === undefined ? undefined : activo === 'true',
    });

    return res.status(status).json(doctors);
  } catch (error) {
    return sendError(error, res);
  }
};

export const getDoctorById = async (req: Request, res: Response) => {
  const status = 200;

  try {
    const doctor = await doctorService.getDoctorById(getId(req.params.id));
    return res.status(status).json(doctor);
  } catch (error) {
    return sendError(error, res);
  }
};

export const createDoctor = async (req: Request, res: Response) => {
  const status = 201;

  try {
    const doctorData = createDoctorSchema.parse(req.body);
    const newDoctor = await doctorService.createDoctor(doctorData);
    
    return res.status(status).json(newDoctor);
  } catch (error) {
    return sendError(error, res);
  }
};

export const updateDoctor = async (req: Request, res: Response) => {
  const status = 200;

  try {
    const doctorData = updateDoctorSchema.parse(req.body);
    const updatedDoctor = await doctorService.updateDoctor(getId(req.params.id), doctorData);
    return res.status(status).json(updatedDoctor);
  } catch (error) {
    return sendError(error, res);
  }
};

export const deleteDoctor = async (req: Request, res: Response) => {
  const status = 204;

  try {
    await doctorService.deleteDoctor(getId(req.params.id));
    return res.status(status).send();
  } catch (error) {
    return sendError(error, res);
  }
};
