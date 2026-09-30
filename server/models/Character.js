import mongoose from 'mongoose';
import { charactersStore } from '../config/jsonStore.js';

export const characterSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: [true, 'Character name is required'],
      trim: true,
    },
    role: {
      type: String,
      default: 'Protagonist',
      enum: ['Protagonist', 'Antagonist', 'Sidekick', 'Mentor', 'Supporting', 'Robot', 'AI Entity', 'Villain', 'Alien'],
    },
    description: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=400&q=80',
    },
  },
  {
    timestamps: true,
  }
);

const CharacterMongoose = mongoose.models.Character || mongoose.model('Character', characterSchema);

const Character = {
  create: async (data) =>
    mongoose.connection.readyState === 1
      ? await CharacterMongoose.create(data)
      : await charactersStore.create(data),

  find: (query) =>
    mongoose.connection.readyState === 1
      ? CharacterMongoose.find(query)
      : charactersStore.find(query),

  findById: (id) =>
    mongoose.connection.readyState === 1
      ? CharacterMongoose.findById(id)
      : charactersStore.findById(id),

  countDocuments: (query) =>
    mongoose.connection.readyState === 1
      ? CharacterMongoose.countDocuments(query)
      : charactersStore.countDocuments(query),

  schema: characterSchema,
};

export default Character;
