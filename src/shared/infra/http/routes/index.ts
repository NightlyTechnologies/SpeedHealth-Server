import { Router } from 'express';

import pharmacysRouter from '@modules/pharmacys/infra/http/routes/pharmacys.routes';
import sessionRouter from '@modules/pharmacys/infra/http/routes/session.routes';

const router = Router();

router.use('/pharmacys', pharmacysRouter);
router.use('/session', sessionRouter);

export default router;
