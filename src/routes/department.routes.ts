import { Router } from "express";
import DepartmentController from "../controllers/department.controller";

const routes = Router();

routes.get('/departments', DepartmentController.index);
routes.post('/departments', DepartmentController.create);

export default routes;