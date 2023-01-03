import { body } from 'express-validator';

export const authValidator = [
  body('login','Not valid login')
    .isLength({min: 1}),

  body('passwordWithHash','Not valid password')
    .isLength({min: 1}),
]