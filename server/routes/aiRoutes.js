import express from 'express';
import { generateComicSuggestion, COMIC_PRESETS } from '../services/aiService.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

// @desc    Get preset backgrounds and characters
// @route   GET /api/ai/presets
// @access  Private
router.get('/presets', (req, res) => {
  res.status(200).json({
    success: true,
    presets: COMIC_PRESETS,
  });
});

// @desc    Generate AI story/scene/dialogue suggestions
// @route   POST /api/ai/suggest
// @access  Private
router.post('/suggest', (req, res) => {
  const { genre } = req.body;
  const suggestion = generateComicSuggestion(genre || 'Sci-Fi');

  res.status(200).json({
    success: true,
    suggestion,
  });
});

export default router;
