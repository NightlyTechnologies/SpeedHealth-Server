import { Router } from 'express';

import pharmacysRouter from '../../../../modules/pharmacys/infra/http/routes/pharmacys.routes';

const router = Router();

router.use('/pharmacys', pharmacysRouter);

export default router;
