import express from 'express';
import {
  createComic,
  getComics,
  getComicById,
  updateComic,
  deleteComic,
} from '../controllers/comicController.js';
import { addPanel } from '../controllers/panelController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect); // All comic routes require authentication

router.route('/')
  .post(createComic)
  .get(getComics);

router.route('/:id')
  .get(getComicById)
  .put(updateComic)
  .delete(deleteComic);

// Panels nested subroute
router.post('/:id/panels', addPanel);

export default router;
