import { Request, Response, NextFunction } from 'express';
import { validationResult, check } from 'express-validator';

const validateEnv = [
  check('NODE_ENV')
    .isIn(['production', 'development', 'test'])
    .withMessage('NODE_ENV harus salah satu dari: production, development, test'),
  check('PORT')
    .isInt({ min: 1, max: 65535 })
    .withMessage('PORT harus berupa bilangan bulat antara 1 dan 65535'),
  check('JWT_SECRET').notEmpty().withMessage('JWT_SECRET tidak boleh kosong'),
  check('JWT_ACCESS_EXPIRATION_MINUTES')
    .isInt({ min: 1 })
    .withMessage('JWT_ACCESS_EXPIRATION_MINUTES harus bilangan bulat positif'),
  check('JWT_REFRESH_EXPIRATION_DAYS')
    .isInt({ min: 1 })
    .withMessage('JWT_REFRESH_EXPIRATION_DAYS harus bilangan bulat positif'),
  check('JWT_RESET_PASSWORD_EXPIRATION_MINUTES')
    .isInt({ min: 1 })
    .withMessage('JWT_RESET_PASSWORD_EXPIRATION_MINUTES harus bilangan bulat positif'),
  check('JWT_VERIFY_EMAIL_EXPIRATION_MINUTES')
    .isInt({ min: 1 })
    .withMessage('JWT_VERIFY_EMAIL_EXPIRATION_MINUTES harus bilangan bulat positif'),
  check('SMTP_HOST').notEmpty().withMessage('SMTP_HOST tidak boleh kosong'),
  check('SMTP_PORT')
    .isInt({ min: 1 })
    .withMessage('SMTP_PORT harus bilangan bulat positif'),
  check('SMTP_USERNAME').notEmpty().withMessage('SMTP_USERNAME tidak boleh kosong'),
  check('SMTP_PASSWORD').notEmpty().withMessage('SMTP_PASSWORD tidak boleh kosong'),
  check('EMAIL_FROM').notEmpty().withMessage('EMAIL_FROM tidak boleh kosong'),
];

const validateEnvMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};

export { validateEnv, validateEnvMiddleware };
