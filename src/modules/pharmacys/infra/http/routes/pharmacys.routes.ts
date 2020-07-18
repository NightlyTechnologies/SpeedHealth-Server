import { Router } from 'express';

import PharmacysController from '../controllers/PharmacysController';

const router = Router();

const pharmacysController = new PharmacysController();

router.post('/', pharmacysController.create);

export default router;
