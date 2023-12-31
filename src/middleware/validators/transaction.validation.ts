import { body, validationResult } from 'express-validator';
import Helper from "../../helpers/response";
import { Request, Response, NextFunction } from 'express';

export const transactionValidate = [
  body('total').notEmpty().withMessage('total required'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return Helper.responseErr(res, 422, "Validation Error", errors.array());
    }
    next();
  }
];
