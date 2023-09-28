import { body } from 'express-validator';

export const companyStoreValidate = [
    body('name').notEmpty().withMessage('nama wajib diisi'),
] 