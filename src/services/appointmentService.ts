import fs from 'fs/promises';
import path from 'path';
import { Appointment } from '../models/appointment.js';
import { AppError } from '../errors/appError.js';

// Verificá si el archivo JSON se llama turnos.json o similar en tu carpeta data
const filePath = path.join(process.cwd(), 'src', 'data', 'turnos.json');

const readAppointments = async (): Promise<Appointment[]> => {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const writeAppointments = async (appointments: Appointment[]): Promise<void> => {
  await fs.writeFile(filePath, JSON.stringify(appointments, null, 2));
};

// GET /turnos con Query Params (Punto 4)
export const getAllAppointments = async (filters: {
  especialidad?: string;
  fecha?: string;
  medicoId?: string;
}): Promise<Appointment[]> => {
  let appointments = await readAppointments();

  if (filters.especialidad) {
    appointments = appointments.filter(
      (a) => a.especialidad.toLowerCase() === filters.especialidad?.toLowerCase()
    );
  }

  if (filters.fecha) {
    appointments = appointments.filter((a) => a.fecha === filters.fecha);
  }

  if (filters.medicoId) {
    appointments = appointments.filter((a) => a.medicoId === filters.medicoId);
  }

  return appointments;
};

// GET /turnos/:id
export const getAppointmentById = async (id: string): Promise<Appointment> => {
  const appointments = await readAppointments();
  const appointment = appointments.find((a) => a.id === id);

  if (!appointment) {
    throw new AppError(404, `No se encontró el turno con ID ${id}`, 'APPOINTMENT_NOT_FOUND');
  }

  return appointment;
};

// POST /turnos
export const createAppointment = async (
  appointmentData: Omit<Appointment, 'id'>
): Promise<Appointment> => {
  const appointments = await readAppointments();
  const newAppointment: Appointment = {
    id: Date.now().toString(),
    ...appointmentData,
  };

  appointments.push(newAppointment);
  await writeAppointments(appointments);
  return newAppointment;
};

// PUT /turnos/:id
export const updateAppointment = async (
  id: string,
  appointmentData: Partial<Appointment>
): Promise<Appointment> => {
  const appointments = await readAppointments();
  const index = appointments.findIndex((a) => a.id === id);

  if (index === -1) {
    throw new AppError(404, `No se encontró el turno con ID ${id}`, 'APPOINTMENT_NOT_FOUND');
  }

  appointments[index] = { ...appointments[index], ...appointmentData };
  await writeAppointments(appointments);
  return appointments[index];
};

// DELETE /turnos/:id
export const deleteAppointment = async (id: string): Promise<void> => {
  const appointments = await readAppointments();
  const index = appointments.findIndex((a) => a.id === id);

  if (index === -1) {
    throw new AppError(404, `No se encontró el turno con ID ${id}`, 'APPOINTMENT_NOT_FOUND');
  }

  appointments.splice(index, 1);
  await writeAppointments(appointments);
};