import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import PharmacysController from '../controllers/PharmacysController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const router = Router();

const pharmacysController = new PharmacysController();

router.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required().min(5),
      whatsapp: Joi.number().positive().required(),
      city: Joi.string().required(),
      uf: Joi.string().required().length(2),
      cnpj: Joi.number().positive().required(),
      geolocation: Joi.array().length(2).required(),
    },
  }),
  pharmacysController.create,
);

export default router;
