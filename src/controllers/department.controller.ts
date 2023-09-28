import { Request, Response } from "express";

import DepartmentService from "../service/department.service";
import Helper from "../helpers/response";

class DepartmentController {

    public async index(_: Request, res: Response): Promise<Response> {
        try {
            const users = await DepartmentService.listData();

            return Helper.response(res, 200, "List Users", users);
        } catch (e: any) {
            return Helper.responseErr(res, 500, "Error", e.message);
        }
    }

    public async create(req: Request, res: Response): Promise<Response> {
        try {
            const { name } = req.body;
            const department = await DepartmentService.create(name);

            return res.status(201).json({
                message: "Department created",
                data: department,
            });

        } catch (e: any) {
            return res.status(500).json({
                message: e.message,
                errors: e,
            });
        }
    }
}

export default new DepartmentController();
