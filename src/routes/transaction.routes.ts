import { Router } from "express";
import TransactionController from "../controllers/transaction.controller";

const routes = Router();

// routes.get('/transactions', transactionController.index);
// routes.get('/transactions/:id', transactionController.show);
routes.post('/transactions', TransactionController.create);

export default routes;
