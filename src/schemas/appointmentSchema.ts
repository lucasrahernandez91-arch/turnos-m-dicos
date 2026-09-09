import { z } from 'zod';

export const createAppointmentSchema = z.object({
  medicoId: z.  number().positive('El medicoId debe ser un número positivo'),
  paciente: z.string().min(2, 'El nombre del paciente debe tener al menos 2 caracteres'),
  documento: z.string().min(7, 'El documento debe tener al menos 7 caracteres'),
  fecha: z.string().min(1, 'La fecha es obligatoria'),
  especialidad: z
    .string()
    .min(1, 'La especialidad es obligatoria'),
  
});

export const updateAppointmentSchema = createAppointmentSchema.partial();