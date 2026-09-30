import express from 'express';
import {
  createCharacter,
  getCharacters,
  updateCharacter,
  deleteCharacter,
} from '../controllers/characterController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect); // All character routes require authentication

router.route('/')
  .post(createCharacter)
  .get(getCharacters);

router.route('/:id')
  .put(updateCharacter)
  .delete(deleteCharacter);

export default router;
