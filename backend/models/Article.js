import mongoose from 'mongoose';
import User from "./User.js";

const ArticleSchema = new mongoose.Schema({

    title: {
      type: String,
      required: true,
      unique: true,
    },

    description: {
      type: String,
      required: true,
    },

    pubDate: {
      type: String,
      required: false,
      immutable: true,
    },

    link: {
      type: String,
      required: false,
    },

    categories: [String],

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },

    author: {
      type: String,
      required: false,
      default: 'Unknown'
    },
    imageURL: {
      type: String,
      required: false,
    }
  },

  {
    timestamps: true,
  }
);

export default mongoose.model('Article', ArticleSchema);