import { Router } from 'express';
import { getTestMessage } from '../controllers/test.controller';

const router = Router();

router.get('/test', getTestMessage);

export default router;
