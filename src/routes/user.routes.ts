import { Router } from "express";
import UserController from "../controllers/user.controller";

const routes = Router();

routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);
routes.post('/users', UserController.create);

export default routes;