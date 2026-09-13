import { Router } from 'express';

import * as specialtyController from '../controllers/specialtyController.js';

const router = Router();

router.get('/', specialtyController.getSpecialties);

router.get('/:id', specialtyController.getSpecialtyById);

router.post('/', specialtyController.createSpecialty);

router.delete('/:id', specialtyController.deleteSpecialty);

export default router;