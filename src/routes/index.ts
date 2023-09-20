import { Router } from "express";
import UserRoutes from "./UserRoutes";

const routes = Router();

routes.use("/api/v1", UserRoutes);

export default routes;