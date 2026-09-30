import express from 'express';
import { upload } from '../middleware/uploadMiddleware.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc    Upload an image file
// @route   POST /api/upload
// @access  Private
router.post('/', protect, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: 'No image file uploaded. Please select a valid image file.',
    });
  }

  // Construct accessible URL path
  const filePath = `/uploads/${req.file.filename}`;

  return res.status(200).json({
    success: true,
    message: 'Image uploaded successfully!',
    url: filePath,
    filename: req.file.filename,
    mimetype: req.file.mimetype,
    size: req.file.size,
  });
});

export default router;
