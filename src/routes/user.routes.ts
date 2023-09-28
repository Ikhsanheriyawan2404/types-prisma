import { Router } from "express";
import UserController from "../controllers/user.controller";

const routes = Router();

routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);

export default routes;