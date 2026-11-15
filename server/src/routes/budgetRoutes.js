import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { current, update } from '../controllers/budgetController.js';
const router = Router();
router.use(requireAuth);
router.get('/current', asyncHandler(current));
router.put('/current', asyncHandler(update));
export default router;
