import ArticleSchema from "../models/Article.js";
import {handleServerError} from "../errors/serverError.js";

import {setupPosts, setupCategories} from './postsSetupData.js';

import {Worker} from "worker_threads";

export const getAllPosts = async (req, res) => {
  await ArticleSchema
    .find()
    .sort({title: 1})
    .then(posts => res.status(200).json(posts))
    .catch((err) => {
      console.log(err);
      return res.status(200).json({ success: false, err: err });
    });
}

export const getPosts = async (req, res) => {

  try {
    const worker = new Worker('./controllers/parser-worker.js');

    worker.on('message', msgData => {

      setupPosts(req.query, res, msgData).then(r => console.log('Good post set up'));

      setupCategories(msgData); // pushed only unique
    });
  }

  catch(err) {
    handleServerError(res, err, 'Get posts server error');
  }
}

export const addPost = async (req, res) => {
  try {
    let { title, description, author, link, imageURL, pubDate } = req.body;

    let categories = req.body.categories.split(',');

    let reg = new RegExp('(\\<(/?[^\\>]+)\\>)');

    let descr = reg.test(description) ? description : `\<p\>${description}\<p\>`;

    let newDoc = {
      title, link, categories, author, pubDate, imageURL,
      description: descr,
      user: req.userId,
    };

    const doc = new ArticleSchema(newDoc);
    const newPost = await doc.save();
    return res.status(200).json(newPost);

  } catch (err) {
    handleServerError(res, err, 'Adding product server error');
  }
}


export const getPostById = async (req, res) => {
  try {
    const postId = req.params.id;

    const post = await ArticleSchema.findById(postId);

    if (post) {
      return res.status(200).json(post);
    } else {
      return res.status(404).json({message: 'Post not found'});
    }
  }
  catch(err) {
    handleServerError(res, err, 'Can not get this product info');
  }
}


export const removePostById = async (req, res) => {
  try {
    const postId = req.params.id;

    const post = await ArticleSchema.findByIdAndDelete(postId);

    if (post) {
      return res.status(200).json(post);
    } else {
      return res.status(404).json({message: 'Post can not be removed'});
    }
  }
  catch(err) {
    handleServerError(res, err, 'Removing product server error');
  }
}


export const updatePostById = async (req, res) => {
  try {
    const postId = req.params.id;

    let { title, description, author, link, imageURL, pubDate } = req.body;

    let categories = req.body.categories.split(',');

    let reg = new RegExp('(\\<(/?[^\\>]+)\\>)');

    let descr = reg.test(description) ? description : `\<p\>${description}\<p\>`;

    const updatedObject = {
      _id: postId,
      title, link, categories, author, imageURL,
      pubDate: pubDate ?? Date.now().toString(),
      description: descr,
      user: req.userId,
    }

    const post = await ArticleSchema.findByIdAndUpdate(postId, updatedObject);

    console.log('post: ', post)


    if (post) {
      return res.status(200).json(post);
    } else {
      return res.status(404).json({message: 'Post can not be updated'});
    }
  }
  catch(err) {
    handleServerError(res, err, 'Updating product server error');
  }
}