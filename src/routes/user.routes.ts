import { Router } from "express";
import auth from '../middleware/auth';

import UserController from "../controllers/user.controller";

const routes = Router();

routes.get('/users', auth(), UserController.index);
routes.get('/users/:id', auth(), UserController.show);
// routes.post('/users', UserController.create);

export default routes;
