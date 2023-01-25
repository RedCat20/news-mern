import express from 'express';

import cors from 'cors';

import {dbConnect} from "./dbConnect.js";

import { PostsRoutes, UploadRoutes, UserRoutes, CategoriesRoutes } from "./routes/index.js";

// Set up

const app = express();

app.use(express.json());
app.use(cors());

dbConnect();

// Routes

app.use(PostsRoutes);
app.use(UploadRoutes);
app.use(UserRoutes);
app.use(CategoriesRoutes);


// Start server

const PORT = process.env.PORT || 4000;

app.listen(PORT,(err) => {
  err ? console.log(`Server listening error: ${err}`) : console.log(`server is running on ${PORT}`);
});
