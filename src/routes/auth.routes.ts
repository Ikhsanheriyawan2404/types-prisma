import express from 'express';
import AuthController from '../controllers/auth.controller';

const router = express.Router();

router.post('/login', AuthController.login);
// router.post('/logout', AuthController.logout);
// router.post(
//   '/refresh-tokens',
//   AuthController.refreshTokens
// );


export default router;
