import mongoose from 'mongoose';

export const panelSchema = new mongoose.Schema(
  {
    comicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comic',
    },
    panelNumber: {
      type: Number,
      required: true,
      default: 1,
    },
    image: {
      type: String,
      default: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    },
    dialogue: {
      type: String,
      default: '',
    },
    narration: {
      type: String,
      default: '',
    },
    character: {
      type: String,
      default: '',
    },
    scene: {
      type: String,
      default: '',
    },
    dialogueStyle: {
      type: String,
      enum: ['speech', 'thought', 'shout', 'whisper', 'radio'],
      default: 'speech',
    },
    bubblePosition: {
      type: String,
      enum: ['top-left', 'top-right', 'bottom-left', 'bottom-right', 'top-center', 'bottom-center'],
      default: 'top-left',
    },
    soundEffect: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

const Panel = mongoose.model('Panel', panelSchema);
export default Panel;
