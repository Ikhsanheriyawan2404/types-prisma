import { Router } from "express";
import UserRoutes from "./UserRoutes";
import CompanyRoutes from "./CompanyRoutes";

const routes = Router();

routes.use("/api/v1", UserRoutes);
routes.use("/api/v1", CompanyRoutes);

export default routes;