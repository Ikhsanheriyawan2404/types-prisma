import { Router } from "express";
import DepartmentController from "../controllers/department.controller";
import { departmentValidate } from "../middleware/validators/department.validation";

const routes = Router();

routes.get('/departments', DepartmentController.index);
routes.get('/departments/:id', DepartmentController.show);
routes.post('/departments', departmentValidate, DepartmentController.create);
routes.put('/departments/:id', departmentValidate, DepartmentController.update);
routes.delete('/departments/:id', DepartmentController.destroy);

export default routes;