import { z } from 'zod';

// Regex que exige formato Title Case / PascalCase (ej: Pediatría, Clínica Médica)
const titleCaseRegex = /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(\s[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)*$/;

export const createDoctorSchema = z.object({
  nombre: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),

  especialidad: z
    .string()
    .refine((val) => titleCaseRegex.test(val), {
      message:
        'La especialidad debe estar en formato Title Case / PascalCase (ej: Pediatría, Clínica Médica)',
    }),

  activo: z.boolean().default(true),
});

export const updateDoctorSchema = z.object({
  nombre: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),

  especialidad: z
    .string()
    .refine((val) => titleCaseRegex.test(val), {
      message:
        'La especialidad debe estar en formato Title Case / PascalCase (ej: Pediatría, Clínica Médica)',
    }),

  activo: z.boolean(),
});