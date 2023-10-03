import { Router } from "express";
import AuthRoutes from "./auth.routes";
import UserRoutes from "./user.routes";
import DepartmentRoutes from "./department.routes";
import CompanyRoutes from "./company.routes";

const routes = Router();

routes.use("/api/v1/auth", AuthRoutes);
routes.use("/api/v1", UserRoutes);
routes.use("/api/v1", CompanyRoutes);
routes.use("/api/v1", DepartmentRoutes);

export default routes;
