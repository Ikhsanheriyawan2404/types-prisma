import { body, validationResult } from 'express-validator';
import Helper from "../../utils/helper";
import { Request, Response, NextFunction } from 'express';
import DepartmentService from '../../services/department.service';

export const departmentStoreValidate = [
  body('name').notEmpty().withMessage('nama wajib diisi')
    .custom(async value => {
      value = value.toLowerCase().replace(/\s+/g, '-');
      const existingData = await DepartmentService.findBySlug(value);
      if (existingData) {
        throw new Error('Departement sudah ada');
      }
    }),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return Helper.responseErr(res, 422, "Validation Error", errors.array());
    }
    next();
  }
];

export const departmentUpdateValidate = [
  body('name').notEmpty().withMessage('nama wajib diisi')
  .custom(async (value, { req }) => {
    value = value.toLowerCase().replace(/\s+/g, '-');
    const existingData = await DepartmentService.findBySlug(value);
    if (existingData && existingData.id !== req.params?.id) {
      throw new Error('Departement sudah ada');
    }
  }),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return Helper.responseErr(res, 422, "Validation Error", errors.array());
    }
    next();
  }
];
