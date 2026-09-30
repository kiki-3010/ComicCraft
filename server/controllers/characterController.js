import Character from '../models/Character.js';

// @desc    Create a new character
// @route   POST /api/characters
// @access  Private
export const createCharacter = async (req, res, next) => {
  try {
    const { name, role, description, image } = req.body;

    if (!name || name.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Character name is required.',
      });
    }

    const character = await Character.create({
      userId: req.user._id,
      name: name.trim(),
      role: role || 'Protagonist',
      description: description || '',
      image: image || 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=400&q=80',
    });

    return res.status(201).json({
      success: true,
      message: 'Character added successfully!',
      character,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all characters for user
// @route   GET /api/characters
// @access  Private
export const getCharacters = async (req, res, next) => {
  try {
    const characters = await Character.find({ userId: req.user._id }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: characters.length,
      characters,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a character
// @route   PUT /api/characters/:id
// @access  Private
export const updateCharacter = async (req, res, next) => {
  try {
    const character = await Character.findById(req.params.id);

    if (!character) {
      return res.status(404).json({
        success: false,
        message: 'Character not found.',
      });
    }

    if (character.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access denied: You cannot edit characters created by other authors.',
      });
    }

    const { name, role, description, image } = req.body;

    if (name) character.name = name.trim();
    if (role) character.role = role;
    if (description !== undefined) character.description = description;
    if (image) character.image = image;

    const updatedCharacter = await character.save();

    return res.status(200).json({
      success: true,
      message: 'Character updated successfully!',
      character: updatedCharacter,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a character
// @route   DELETE /api/characters/:id
// @access  Private
export const deleteCharacter = async (req, res, next) => {
  try {
    const character = await Character.findById(req.params.id);

    if (!character) {
      return res.status(404).json({
        success: false,
        message: 'Character not found.',
      });
    }

    if (character.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access denied: You cannot delete characters created by other authors.',
      });
    }

    await character.deleteOne();

    return res.status(200).json({
      success: true,
      message: 'Character removed successfully.',
    });
  } catch (error) {
    next(error);
  }
};
