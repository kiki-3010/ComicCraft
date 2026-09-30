import express from 'express';
import { updatePanel, deletePanel } from '../controllers/panelController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect); // All panel routes require authentication

router.route('/:id')
  .put(updatePanel)
  .delete(deletePanel);

export default router;
