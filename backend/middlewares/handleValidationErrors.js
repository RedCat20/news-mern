import {validationResult} from "express-validator";

export const handleValidationErrors = (req,res,next) => {
  const errs = validationResult(req);

  if (errs?.isEmpty()) {
    return res.status(400).json(errs.array());
  }

  next();
}

export default handleValidationErrors;