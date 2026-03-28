import { Router } from 'express';
import { searchIcdCodes, getIcdByCode } from '../controllers/icd.controller';

const router = Router();

// GET /api/icd?q=diabetes        ← keyword or code-prefix search, max 20 results
// GET /api/icd?q=E11             ← code-prefix search
router.get('/', searchIcdCodes);

// GET /api/icd/E11.9             ← exact code lookup
router.get('/:code', getIcdByCode);

export default router;
