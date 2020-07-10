import express from 'express';

import PharmacysController from '../controllers/PharmacysController';

const router = express.Router();
const pharmacysController = new PharmacysController();

router.get('/', pharmacysController.show);

export default router;
