import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import SessionController from '../controllers/SessionController';

const router = Router();

const sessionController = new SessionController();

router.post(
  '/create',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required().min(5),
    },
  }),
  sessionController.create,
);

export default router;
