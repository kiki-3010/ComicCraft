import mongoose from 'mongoose';
import { panelSchema } from './Panel.js';
import { characterSchema } from './Character.js';
import { comicsStore } from '../config/jsonStore.js';

const comicSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Comic title is required'],
      trim: true,
      maxlength: [120, 'Title cannot exceed 120 characters'],
    },
    description: {
      type: String,
      default: '',
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },
    coverImage: {
      type: String,
      default: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
    },
    genre: {
      type: String,
      default: 'Sci-Fi',
      enum: [
        'Sci-Fi',
        'Cyberpunk',
        'Mecha',
        'Superhero',
        'Action',
        'Mystery',
        'Fantasy',
        'Horror',
        'Dystopian',
        'Other',
      ],
    },
    status: {
      type: String,
      enum: ['Draft', 'Published'],
      default: 'Draft',
    },
    characters: [characterSchema],
    panels: [panelSchema],
  },
  {
    timestamps: true,
  }
);

comicSchema.virtual('author', {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id',
  justOne: true,
});

comicSchema.set('toObject', { virtuals: true });
comicSchema.set('toJSON', { virtuals: true });

const ComicMongoose = mongoose.models.Comic || mongoose.model('Comic', comicSchema);

const Comic = {
  create: async (data) =>
    mongoose.connection.readyState === 1
      ? await ComicMongoose.create(data)
      : await comicsStore.create(data),

  find: (query) =>
    mongoose.connection.readyState === 1
      ? ComicMongoose.find(query)
      : comicsStore.find(query),

  findById: (id) =>
    mongoose.connection.readyState === 1
      ? ComicMongoose.findById(id)
      : comicsStore.findById(id),

  findOne: (query) =>
    mongoose.connection.readyState === 1
      ? ComicMongoose.findOne(query)
      : comicsStore.findOne(query),

  countDocuments: (query) =>
    mongoose.connection.readyState === 1
      ? ComicMongoose.countDocuments(query)
      : comicsStore.countDocuments(query),

  schema: comicSchema,
};

export default Comic;
