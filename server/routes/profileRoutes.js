import express from 'express';
import {
  getProfile,
  updateProfile,
  updatePassword,
} from '../controllers/profileController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getProfile)
  .put(updateProfile);

router.put('/password', updatePassword);

export default router;
