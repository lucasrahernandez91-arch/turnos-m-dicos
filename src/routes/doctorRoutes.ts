import { Router } from 'express';
import * as doctorController from '../controllers/doctorController.js';
import { validateSchema } from '../middlewares/validateSchema.js';

import {
  createDoctorSchema,
  updateDoctorSchema
} from '../schemas/doctorSchema.js';

const router = Router();

router.get('/', doctorController.getDoctors);
router.get('/:id', doctorController.getDoctorById);
router.post('/', 
    validateSchema(createDoctorSchema), 
    doctorController.createDoctor);

router.put(
  '/:id',
  validateSchema(updateDoctorSchema),
  doctorController.updateDoctor
);

router.delete('/:id', doctorController.deleteDoctor);

export default router;