import fs from 'fs/promises';
import path from 'path';
import { Doctor } from './../models/doctor.js';
import {AppError} from '../errors/appError.js';

//Ruta apuntando a src/data/profesionales.json
const filePath = path.join(process.cwd(), 'src', 'data', 'profesionales.json');

// Función auxiliar para leer el JSON
const readDoctors = async (): Promise<Doctor[]> => {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
    } catch (error) {
      return [];
    }
};

// Función auxiliar para escribir en el JSON
const writeDoctors = async (doctors: Doctor[]): Promise<void> => {
  await fs.writeFile(filePath, JSON.stringify(doctors, null, 2));
};

// GET /medicos (con soporte para filtros del Punto 4)
export const getAllDoctors = async (filters: {
  especialidad?: string; 
  activo?: boolean;
 }): Promise<Doctor[]> => {
  let doctors = await readDoctors();

  if (filters.especialidad) {
    const cleanFilter = filters.especialidad
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
    
    doctors = doctors.filter((d) => {
      const cleanDoctorSpec = d.especialidad
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
      return cleanDoctorSpec === cleanFilter;
    });
  }

  if (filters.activo !== undefined) {
    doctors = doctors.filter((d) => d.activo === filters.activo);
  }

  return doctors;
};

// GET /medicos/:id
export const getDoctorById = async (id: number): Promise<Doctor> => {
  const doctors = await readDoctors();
  const doctor = doctors.find((d) => d.medicoId === id);

  if (!doctor) {
    throw new AppError(404, `No se encontró el médico con ID ${id}`, 'DOCTOR_NOT_FOUND');
  }

  return doctor;
};

// POST /medicos
export const createDoctor = async (doctorData: Omit<Doctor, 'medicoId'>): Promise<Doctor> => {
  const doctors = await readDoctors();
  const nextId = doctors.length > 0 ? Math.max(...doctors.map((d) => d.medicoId)) + 1 : 1;
  const newDoctor: Doctor = {
   medicoId: nextId,
    ...doctorData,
  };

  doctors.push(newDoctor);
  await writeDoctors(doctors);
  return newDoctor;
};

// PUT /medicos/:id
export const updateDoctor = async (id: number, doctorData: Partial<Doctor>): Promise<Doctor> => {
  const doctors = await readDoctors();
  const index = doctors.findIndex((d) => d.medicoId === id);

  if (index === -1) {
    throw new AppError(404, `No se encontró el médico con ID ${id}`, 'DOCTOR_NOT_FOUND');
  }

  doctors[index] = { ...doctors[index], ...doctorData };
  await writeDoctors(doctors);
  return doctors[index];
};

// DELETE /medicos/:id
export const deleteDoctor = async (id: number): Promise<void> => {
  const doctors = await readDoctors();
  const index = doctors.findIndex((d) => d.medicoId === id);

  if (index === -1) {
    throw new AppError(404, `No se encontró el médico con ID ${id}`, 'DOCTOR_NOT_FOUND');
  }

  doctors.splice(index, 1);
  await writeDoctors(doctors);
};
