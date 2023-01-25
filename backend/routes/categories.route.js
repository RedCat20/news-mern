import express from "express";

import {getCategories} from "../controllers/CategoriesCtrl.js";

export const router = express.Router();


router.get('/categories', getCategories);

