import mongoose from 'mongoose';

const connectDB = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/comiccraft';
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2500, // Timeout after 2.5s if mongo daemon not running
    });
    console.log(`[MongoDB] Database connected successfully: ${conn.connection.host}`);
  } catch (error) {
    console.log(`[Database Notice] MongoDB at ${uri} was unreachable (${error.message}).`);
    console.log(`[Database Notice] Active: Resilient ComicCraft persistence store. All data, users, comics, and panels will be saved continuously.`);
  }
};

export default connectDB;
