import { Request, Response, NextFunction } from 'express';
import * as appointmentService from '../services/appointmentService.js';

export const getAppointments = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { especialidad, fecha, medicoId } = req.query;
    const appointments = await appointmentService.getAllAppointments({
      especialidad: especialidad as string,
      fecha: fecha as string,
      medicoId: medicoId as string,
    });
    res.status(200).json(appointments);
  } catch (error) {
    next(error);
  }
};

export const getAppointmentById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const appointment = await appointmentService.getAppointmentById(req.params.id as string);
    res.status(200).json(appointment);
  } catch (error) {
    next(error);
  }
};

export const createAppointment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newAppointment = await appointmentService.createAppointment(req.body);
    res.status(201).json(newAppointment);
  } catch (error) {
    next(error);
  }
};

export const updateAppointment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedAppointment = await appointmentService.updateAppointment(
      req.params.id as string,
      req.body
    );
    res.status(200).json(updatedAppointment);
  } catch (error) {
    next(error);
  }
};

export const deleteAppointment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await appointmentService.deleteAppointment(req.params.id as string);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};