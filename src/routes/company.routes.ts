import { Router } from "express";
import CompanyController from "../controllers/company.controller";
import { companyStoreValidate } from "../middleware/validators/company.validation";

const routes = Router();

routes.get('/companies', CompanyController.index);
routes.get('/companies/:id', CompanyController.show);
routes.post('/companies', companyStoreValidate, CompanyController.create);

export default routes;