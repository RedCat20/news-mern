import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true,
      // immutable: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Category', CategorySchema);