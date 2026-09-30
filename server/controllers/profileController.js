import User from '../models/User.js';
import Comic from '../models/Comic.js';
import Character from '../models/Character.js';

// @desc    Get user profile with stats
// @route   GET /api/profile
// @access  Private
export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    const totalComics = await Comic.countDocuments({ userId: req.user._id });
    const draftComics = await Comic.countDocuments({ userId: req.user._id, status: 'Draft' });
    const publishedComics = await Comic.countDocuments({ userId: req.user._id, status: 'Published' });
    const charactersCount = await Character.countDocuments({ userId: req.user._id });

    return res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
        bio: user.bio,
        createdAt: user.createdAt,
      },
      stats: {
        totalComics,
        draftComics,
        publishedComics,
        charactersCount,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user profile details
// @route   PUT /api/profile
// @access  Private
export const updateProfile = async (req, res, next) => {
  try {
    const { name, bio, profileImage } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    if (name) user.name = name.trim();
    if (bio !== undefined) user.bio = bio;
    if (profileImage) user.profileImage = profileImage;

    await user.save();

    return res.status(200).json({
      success: true,
      message: 'Profile updated successfully!',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
        bio: user.bio,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Change password
// @route   PUT /api/profile/password
// @access  Private
export const updatePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword, confirmNewPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both current password and new password.',
      });
    }

    if (confirmNewPassword && newPassword !== confirmNewPassword) {
      return res.status(400).json({
        success: false,
        message: 'New passwords do not match.',
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 6 characters long.',
      });
    }

    const user = await User.findById(req.user._id).select('+password');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Current password does not match our records.',
      });
    }

    user.password = newPassword;
    await user.save();

    return res.status(200).json({
      success: true,
      message: 'Password changed successfully! Please keep it secure.',
    });
  } catch (error) {
    next(error);
  }
};
