import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { usersStore } from '../config/jsonStore.js';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
      maxlength: [50, 'Name cannot exceed 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/,
        'Please provide a valid email address',
      ],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: [6, 'Password must be at least 6 characters long'],
      select: false,
    },
    profileImage: {
      type: String,
      default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    },
    bio: {
      type: String,
      default: 'Digital Comic Creator & Storyteller on ComicCraft',
      maxlength: [200, 'Bio cannot exceed 200 characters'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const UserMongoose = mongoose.models.User || mongoose.model('User', userSchema);

// Hybrid model delegator: uses Mongoose if connected, else uses resilient JSON store
const User = {
  create: async (data) =>
    mongoose.connection.readyState === 1
      ? await UserMongoose.create(data)
      : await usersStore.create(data),

  findOne: (query) =>
    mongoose.connection.readyState === 1
      ? UserMongoose.findOne(query)
      : usersStore.findOne(query),

  findById: (id) =>
    mongoose.connection.readyState === 1
      ? UserMongoose.findById(id)
      : usersStore.findById(id),

  countDocuments: (query) =>
    mongoose.connection.readyState === 1
      ? UserMongoose.countDocuments(query)
      : usersStore.countDocuments(query),

  schema: userSchema,
};

export default User;
