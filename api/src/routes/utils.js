import { Router } from 'express';
const router = Router();

import { authentication, registrerUser } from '../controllers/utils.controlelr';

//-> api/utils/
router.post('/authentication', authentication)
router.post('/register', registrerUser)

export default router

