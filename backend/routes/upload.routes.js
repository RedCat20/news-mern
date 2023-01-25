import express from "express";
import multer from 'multer';

import {checkAuth} from "../middlewares/checkAuth.js";

export const router = express.Router()

// Upload images logic

router.use('/uploads', express.static('uploads'));

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({storage});

// Upload images route

router.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    if (req?.file?.originalname) {
        return res.json({
            url: `/uploads/${req?.file?.originalname}`,
        });
    } else {
        return res.json({
            url: '',
        });
    }
});