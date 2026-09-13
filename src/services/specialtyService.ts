import { Specialty } from '../models/specialty.js';
import { AppError } from '../errors/appError.js';
import { arrayEspecialidades } from '../data/resources.js';

// GET /especialidades
export const getAllSpecialties = async (): Promise<Specialty[]> => {
  return arrayEspecialidades as Specialty[];
};

// GET /especialidades/:id
export const getSpecialtyById = async (
  id: number
): Promise<Specialty> => {

  const specialty = (arrayEspecialidades as Specialty[])
    .find((e) => e.especialidadId === id);

  if (!specialty) {
    throw new AppError(
      404,
      `No se encontró la especialidad con ID ${id}`,
      'SPECIALTY_NOT_FOUND'
    );
  }

  return specialty;
};

// POST /especialidades
export const createSpecialty = async (
  specialtyData: Omit<Specialty, 'especialidadId'>
): Promise<Specialty> => {

  
  if(!specialtyData.nombreEspecialidad) {
    throw new  AppError(
      400,
      'El nombre de la especialidad es obligatorio',
      'INVALID_SPECIALTY'
    );
  }


   if (typeof specialtyData.activa !== 'boolean') {
   throw new AppError(
    400,
    'El campo activa debe ser un booleano',
    'INVALID_SPECIALTY'
    );
}

  const specialties = arrayEspecialidades as Specialty[];

  const nextId =
    specialties.length > 0
      ? Math.max(
          ...specialties.map((e) => e.especialidadId)
        ) + 1
      : 1;

  const newSpecialty: Specialty = {
    especialidadId: nextId,
    ...specialtyData
  };

  specialties.push(newSpecialty);

  return newSpecialty;
};

// DELETE /especialidades/:id - baja lógica
export const deleteSpecialty = async (
  id: number
): Promise<void> => {

  const specialties = arrayEspecialidades as Specialty[];

  const index = specialties.findIndex(
    (e) => e.especialidadId === id
  );

  if (index === -1) {
    throw new AppError(
      404,
      `No se encontró la especialidad con ID ${id}`,
      'SPECIALTY_NOT_FOUND'
    );
  }

  specialties[index].activa = false;
};
