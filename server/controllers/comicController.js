import Comic from '../models/Comic.js';

// @desc    Create a new comic
// @route   POST /api/comics
// @access  Private
export const createComic = async (req, res, next) => {
  try {
    const { title, description, coverImage, genre, status, characters, panels } = req.body;

    if (!title || title.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Comic title is required.',
      });
    }

    const newComic = await Comic.create({
      userId: req.user._id,
      title: title.trim(),
      description: description || '',
      coverImage: coverImage || 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
      genre: genre || 'Sci-Fi',
      status: status || 'Draft',
      characters: characters || [],
      panels: panels || [],
    });

    return res.status(201).json({
      success: true,
      message: 'Comic created successfully!',
      comic: newComic,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all comics for current user with search, filter, and sorting
// @route   GET /api/comics
// @access  Private
export const getComics = async (req, res, next) => {
  try {
    const { search, genre, status, sort } = req.query;

    const query = { userId: req.user._id };

    if (search && search.trim() !== '') {
      query.$or = [
        { title: { $regex: search.trim(), $options: 'i' } },
        { description: { $regex: search.trim(), $options: 'i' } },
      ];
    }

    if (genre && genre !== 'All') {
      query.genre = genre;
    }

    if (status && status !== 'All') {
      query.status = status;
    }

    let sortOptions = { updatedAt: -1 }; // default newest updated
    if (sort === 'oldest') {
      sortOptions = { createdAt: 1 };
    } else if (sort === 'title') {
      sortOptions = { title: 1 };
    } else if (sort === 'panels') {
      sortOptions = { 'panels.length': -1 };
    }

    const comics = await Comic.find(query).sort(sortOptions);

    return res.status(200).json({
      success: true,
      count: comics.length,
      comics,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single comic by ID with ownership verification
// @route   GET /api/comics/:id
// @access  Private
export const getComicById = async (req, res, next) => {
  try {
    const comic = await Comic.findById(req.params.id);

    if (!comic) {
      return res.status(404).json({
        success: false,
        message: 'Comic not found.',
      });
    }

    // Ownership check
    if (comic.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access denied: You can only view comics in your workspace.',
      });
    }

    return res.status(200).json({
      success: true,
      comic,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update existing comic
// @route   PUT /api/comics/:id
// @access  Private
export const updateComic = async (req, res, next) => {
  try {
    const comic = await Comic.findById(req.params.id);

    if (!comic) {
      return res.status(404).json({
        success: false,
        message: 'Comic not found.',
      });
    }

    // Ownership check
    if (comic.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access denied: You do not have permission to modify this comic.',
      });
    }

    const { title, description, coverImage, genre, status, characters, panels } = req.body;

    if (title !== undefined) comic.title = title.trim();
    if (description !== undefined) comic.description = description;
    if (coverImage !== undefined) comic.coverImage = coverImage;
    if (genre !== undefined) comic.genre = genre;
    if (status !== undefined) comic.status = status;
    if (characters !== undefined) comic.characters = characters;
    if (panels !== undefined) comic.panels = panels;

    const updatedComic = await comic.save();

    return res.status(200).json({
      success: true,
      message: 'Comic saved successfully!',
      comic: updatedComic,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete comic
// @route   DELETE /api/comics/:id
// @access  Private
export const deleteComic = async (req, res, next) => {
  try {
    const comic = await Comic.findById(req.params.id);

    if (!comic) {
      return res.status(404).json({
        success: false,
        message: 'Comic not found.',
      });
    }

    // Ownership check
    if (comic.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access denied: You do not have permission to delete this comic.',
      });
    }

    await comic.deleteOne();

    return res.status(200).json({
      success: true,
      message: 'Comic deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
};
