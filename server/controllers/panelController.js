import Comic from '../models/Comic.js';

// @desc    Add a panel to a specific comic
// @route   POST /api/comics/:id/panels
// @access  Private
export const addPanel = async (req, res, next) => {
  try {
    const comic = await Comic.findById(req.params.id);

    if (!comic) {
      return res.status(404).json({
        success: false,
        message: 'Comic not found.',
      });
    }

    if (comic.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access denied.',
      });
    }

    const {
      image,
      dialogue,
      narration,
      character,
      scene,
      dialogueStyle,
      bubblePosition,
      soundEffect,
    } = req.body;

    const newPanelNumber = comic.panels.length + 1;

    const newPanel = {
      comicId: comic._id,
      panelNumber: newPanelNumber,
      image: image || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      dialogue: dialogue || '',
      narration: narration || '',
      character: character || '',
      scene: scene || '',
      dialogueStyle: dialogueStyle || 'speech',
      bubblePosition: bubblePosition || 'top-left',
      soundEffect: soundEffect || '',
    };

    comic.panels.push(newPanel);
    await comic.save();

    return res.status(201).json({
      success: true,
      message: 'Panel added successfully!',
      panel: comic.panels[comic.panels.length - 1],
      panels: comic.panels,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a panel
// @route   PUT /api/panels/:id
// @access  Private
export const updatePanel = async (req, res, next) => {
  try {
    // Find comic that contains this panel
    const comic = await Comic.findOne({ 'panels._id': req.params.id });

    if (!comic) {
      return res.status(404).json({
        success: false,
        message: 'Panel not found in any comic.',
      });
    }

    if (comic.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access denied.',
      });
    }

    const panel = comic.panels.id(req.params.id);
    if (!panel) {
      return res.status(404).json({
        success: false,
        message: 'Panel not found.',
      });
    }

    const {
      panelNumber,
      image,
      dialogue,
      narration,
      character,
      scene,
      dialogueStyle,
      bubblePosition,
      soundEffect,
    } = req.body;

    if (panelNumber !== undefined) panel.panelNumber = panelNumber;
    if (image !== undefined) panel.image = image;
    if (dialogue !== undefined) panel.dialogue = dialogue;
    if (narration !== undefined) panel.narration = narration;
    if (character !== undefined) panel.character = character;
    if (scene !== undefined) panel.scene = scene;
    if (dialogueStyle !== undefined) panel.dialogueStyle = dialogueStyle;
    if (bubblePosition !== undefined) panel.bubblePosition = bubblePosition;
    if (soundEffect !== undefined) panel.soundEffect = soundEffect;

    await comic.save();

    return res.status(200).json({
      success: true,
      message: 'Panel updated successfully!',
      panel,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a panel from comic
// @route   DELETE /api/panels/:id
// @access  Private
export const deletePanel = async (req, res, next) => {
  try {
    const comic = await Comic.findOne({ 'panels._id': req.params.id });

    if (!comic) {
      return res.status(404).json({
        success: false,
        message: 'Panel not found.',
      });
    }

    if (comic.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access denied.',
      });
    }

    comic.panels.pull({ _id: req.params.id });

    // Re-index remaining panels
    comic.panels.forEach((p, index) => {
      p.panelNumber = index + 1;
    });

    await comic.save();

    return res.status(200).json({
      success: true,
      message: 'Panel deleted successfully.',
      panels: comic.panels,
    });
  } catch (error) {
    next(error);
  }
};
