import express from 'express';

import cors from 'cors';
import multer from 'multer';

import {dbConnect} from "./dbConnect.js";
import {setAdmin} from "./middlewares/setAdmin.js";
import {checkAuth} from "./middlewares/checkAuth.js";

import {auth, getUserInfo} from "./controllers/AuthCtrl.js";
import {getCategories} from "./controllers/CategoriesCtrl.js";

import {authValidator} from "./validators/user-validator.js";
import handleValidationErrors from "./middlewares/handleValidationErrors.js";

import PostsRoutes from "./routes/posts-routes.js";
import User from "./models/User.js";

const app = express();

app.use(express.json());
app.use(cors());

dbConnect();

// Posts routes

app.use(PostsRoutes);

// Auth and categories

app.post('/auth', authValidator, handleValidationErrors, setAdmin, auth);

app.get('/profile', checkAuth, getUserInfo);

app.get('/categories', getCategories);

// Upload images

app.use('/uploads', express.static('uploads'));

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({storage});

// Upload route

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
  if (req?.file?.originalname) {
    return res.json({
      url: `/uploads/${req?.file?.originalname}`,
    });
  } else {
    return res.json({
      url: '',
    });
  }
})

// Main route

app.get('/', (request, result) => {
  result.send("News app backend");
});

// Start server

const PORT = process.env.PORT || 4000;

app.listen(PORT,(err) => {
  err ? console.log(`Server listening error: ${err}`) : console.log(`server is running on ${PORT}`);
});
