import { Router } from "express";
import auth from '../middleware/auth';

import UserController from "../controllers/user.controller";
import TransactionController from "../controllers/transaction.controller";

const routes = Router();

routes.get('/users', auth(), UserController.index);
routes.get('/users/:id', auth(), UserController.show);
// routes.post('/users', UserController.create);

// Transactions
routes.post('/users/:id/disbursement', TransactionController.create);
export default routes;
