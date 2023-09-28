import { Router } from "express";
import UserRoutes from "./user.routes";
import CompanyRoutes from "./company.routes";

const routes = Router();

routes.use("/api/v1", UserRoutes);
routes.use("/api/v1", CompanyRoutes);

export default routes;