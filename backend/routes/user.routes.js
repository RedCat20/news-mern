import express from "express";

import {checkAuth} from "../middlewares/checkAuth.js";
import {authValidator} from "../validators/user-validator.js";
import handleValidationErrors from "../middlewares/handleValidationErrors.js";
import {setAdmin} from "../middlewares/setAdmin.js";
import {auth, getUserInfo} from "../controllers/AuthCtrl.js";

export const router = express.Router();


router.post('/auth', authValidator, handleValidationErrors, setAdmin, auth);

router.get('/profile', checkAuth, getUserInfo);


