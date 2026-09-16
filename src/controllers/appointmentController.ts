import { Request, Response } from 'express';
import { ZodError } from 'zod';
import { AppError } from '../errors/appError.js';
import * as appointmentService from '../services/appointmentService.js';
import { createAppointmentSchema, updateAppointmentSchema } from '../schemas/appointmentSchema.js';

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
  const message = error instanceof AppError ? error.message : 'Error interno del servidor';
  const code = error instanceof AppError ? error.code : 'INTERNAL_SERVER_ERROR';
  const details = error instanceof AppError ? error.details : [];

  return res.status(status).json({ status, message, code, details });
};

const getId = (id: string | string[]): string => {
  if (typeof id !== 'string' || !/^\d+$/.test(id)) {
    throw new AppError(400, 'El ID del turno debe ser numérico', 'INVALID_APPOINTMENT_ID');
  }

  return id;
};

export const getAppointments = async (req: Request, res: Response) => {
  const status = 200;

  try {
    const { especialidad, fecha, medicoId } = req.query;

    if ((especialidad !== undefined && typeof especialidad !== 'string') ||
        (fecha !== undefined && typeof fecha !== 'string')) {
      throw new AppError(400, 'Los filtros especialidad y fecha deben ser texto', 'INVALID_FILTER');
    }

    if (medicoId !== undefined && (!/^\d+$/.test(String(medicoId)) || Number(medicoId) <= 0)) {
      throw new AppError(400, 'El filtro medicoId debe ser un número positivo', 'INVALID_FILTER');
    }

    const appointments = await appointmentService.getAllAppointments({
      especialidad,
      fecha,
      medicoId: medicoId === undefined ? undefined : Number(medicoId),
    });

    return res.status(status).json(appointments);
  } catch (error) {
    return sendError(error, res);
  }
};

export const getAppointmentById = async (req: Request, res: Response) => {
  const status = 200;

  try {
    const appointment = await appointmentService.getAppointmentById(getId(req.params.id));
    return res.status(status).json(appointment);
  } catch (error) {
    return sendError(error, res);
  }
};

export const createAppointment = async (req: Request, res: Response) => {
  const status = 201;

  try {
    const appointmentData = createAppointmentSchema.parse(req.body);
    const newAppointment = await appointmentService.createAppointment(appointmentData);
    return res.status(status).json(newAppointment);
  } catch (error) {
    return sendError(error, res);
  }
};

export const updateAppointment = async (req: Request, res: Response) => {
  const status = 200;

  try {
    const appointmentData = updateAppointmentSchema.parse(req.body);
    const updatedAppointment = await appointmentService.updateAppointment(getId(req.params.id), appointmentData);
    return res.status(status).json(updatedAppointment);
  } catch (error) {
    return sendError(error, res);
  }
};

export const deleteAppointment = async (req: Request, res: Response) => {
  const status = 204;

  try {
    await appointmentService.deleteAppointment(getId(req.params.id));
    return res.status(status).send();
  } catch (error) {
    return sendError(error, res);
  }
};
