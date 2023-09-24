import { Router } from "express";
import CompanyController from "./../controllers/CompanyController";

const routes = Router();

routes.get('/companies', CompanyController.index);
routes.get('/companies/:id', CompanyController.show);

export default routes;