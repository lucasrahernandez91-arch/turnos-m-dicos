import { Router } from 'express';
import * as doctorController from '../controllers/doctorController.js';

const router = Router();

router.get('/', doctorController.getDoctors);
router.get('/:id', doctorController.getDoctorById);
router.post('/', doctorController.createDoctor);
router.put('/:id', doctorController.updateDoctor);

router.delete('/:id', doctorController.deleteDoctor);

export default router;
