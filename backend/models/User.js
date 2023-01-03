import mongoose from 'mongoose';

export const UserModel = new mongoose.Schema({
    login: {
      unique: true,
      type: String,
      required: true,
    },
    passwordWithHash: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true
  }
);

export default mongoose.model('User', UserModel);