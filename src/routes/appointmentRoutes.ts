import { Router } from 'express';
import * as appointmentController from '../controllers/appointmentController.js';
import { validateSchema } from '../middlewares/validateSchema.js';
import {
  createAppointmentSchema,
  updateAppointmentSchema,
} from '../schemas/appointmentSchema.js';

const router = Router();

router.get('/', appointmentController.getAppointments);
router.get('/:id', appointmentController.getAppointmentById);
router.post('/', validateSchema(createAppointmentSchema), appointmentController.createAppointment);
router.put('/:id', validateSchema(updateAppointmentSchema), appointmentController.updateAppointment);
router.delete('/:id', appointmentController.deleteAppointment);

export default router;