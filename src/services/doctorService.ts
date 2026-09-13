import { Doctor } from '../models/doctor.js';
import { AppError } from '../errors/appError.js';
import {
  arrayProfesionales,
  arrayEspecialidades
} from '../data/resources.js';

//Ruta apuntando a src/data/profesionales.json
// GET /medicos (con soporte para filtros del Punto 4)
export const getAllDoctors = async (filters: {
  especialidad?: string;
  activo?: boolean;
}): Promise<Doctor[]> => {

  let doctors = [...arrayProfesionales] as Doctor[];

  if (filters.especialidad) {

    const cleanFilter = filters.especialidad
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();

    doctors = doctors.filter((d) => {

      const cleanDoctorSpec = d.especialidad
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();

      return cleanDoctorSpec === cleanFilter;
    });
  }

  if (filters.activo !== undefined) {
    doctors = doctors.filter(
      (d) => d.activo === filters.activo
    );
  }

  return doctors;
};

// GET /medicos/:id
export const getDoctorById = async (
  id: number
): Promise<Doctor> => {

  const doctor = (arrayProfesionales as Doctor[])
    .find((d) => d.medicoId === id);

  if (!doctor) {
    throw new AppError(
      404,
      `No se encontró el médico con ID ${id}`,
      'DOCTOR_NOT_FOUND'
    );
  }

  return doctor;
};

// POST /medicos
export const createDoctor = async (
  doctorData: Omit<Doctor, 'medicoId'>
): Promise<Doctor> => {

  const especialidadExiste = arrayEspecialidades.some(
    (e: any) =>
      e.activa === true &&
      e.nombreEspecialidad === doctorData.especialidad
  );

  if (!especialidadExiste) {
    throw new AppError(
      400,
      `La especialidad '${doctorData.especialidad}' no existe o está inactiva`,
      'INVALID_SPECIALTY'
    );
  }

  const doctors = arrayProfesionales as Doctor[];

  const nextId =
    doctors.length > 0
      ? Math.max(...doctors.map((d) => d.medicoId)) + 1
      : 1;

  const newDoctor: Doctor = {
    medicoId: nextId,
    ...doctorData
  };

  doctors.push(newDoctor);

  return newDoctor;
};

// PUT /medicos/:id
export const updateDoctor = async (
  id: number,
  doctorData: Omit<Doctor, 'medicoId'>
): Promise<Doctor> => {

  const doctors = arrayProfesionales as Doctor[];

  const index = doctors.findIndex(
    (d) => d.medicoId === id
  );

  if (index === -1) {
    throw new AppError(
      404,
      `No se encontró el médico con ID ${id}`,
      'DOCTOR_NOT_FOUND'
    );
  }

  const especialidadExiste = arrayEspecialidades.some(
    (e: any) =>
      e.activa === true &&
      e.nombreEspecialidad === doctorData.especialidad
  );

  if (!especialidadExiste) {
    throw new AppError(
      400,
      `La especialidad '${doctorData.especialidad}' no existe o está inactiva`,
      'INVALID_SPECIALTY'
    );
  }

  doctors[index] = {
    medicoId: id,
    ...doctorData
  };

  return doctors[index];
};

// DELETE /profesionales/:id - baja lógica

export const deleteDoctor = async (
  id: number
): Promise<void> => {

  const doctors = arrayProfesionales as Doctor[];

  const index = doctors.findIndex(
    (d) => d.medicoId === id
  );

  if (index === -1) {
    throw new AppError(
      404,
      `No se encontró el médico con ID ${id}`,
      'DOCTOR_NOT_FOUND'
    );
  }

  doctors[index].activo = false;
};