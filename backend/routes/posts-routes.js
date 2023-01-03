import express from "express";

import {checkAuth} from "../middlewares/checkAuth.js";

import {getAllPosts, getPosts, addPost, getPostById, removePostById, updatePostById} from "../controllers/PostsCtrl.js";

const router = express.Router()

router.get('/posts', getPosts);

router.get('/posts/:id', checkAuth, getPostById);

router.post('/posts', checkAuth, addPost);

router.get('/all', checkAuth, getAllPosts);

router.delete('/posts/:id', checkAuth, removePostById);

router.patch('/posts/:id', checkAuth, updatePostById);

export default router;