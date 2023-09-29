import { Request, Response } from "express";
import {
	ReasonPhrases,
	StatusCodes,
} from 'http-status-codes';

import DepartmentService from "../service/department.service";
import Helper from "../utils/helper";

class DepartmentController {

    public async index(_: Request, res: Response): Promise<Response> {
        try {
            const users = await DepartmentService.listData();
            return Helper.response(res, StatusCodes.OK, `List Department`, users);
        } catch (e: any) {
            return Helper.responseErr(
                res,
                StatusCodes.INTERNAL_SERVER_ERROR, 
                ReasonPhrases.INTERNAL_SERVER_ERROR,
                e.message
            );
        }
    }

    public async show(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const user = await DepartmentService.findById(Number(id));
            if (!user) return Helper.response(res, StatusCodes.NOT_FOUND, "Department Not Found", null)

            return Helper.response(res, StatusCodes.OK, `Detail Department`, user);
        } catch (e: any) {
            return Helper.responseErr(
                res,
                StatusCodes.INTERNAL_SERVER_ERROR, 
                ReasonPhrases.INTERNAL_SERVER_ERROR,
                e.message
            );
        }
    }

    public async create(req: Request, res: Response): Promise<Response> {
        try {
            const { name } = req.body;
            const department = await DepartmentService.create(name);

            return Helper.response(res, StatusCodes.CREATED, "Department Created", department);
        } catch (e: any) {
            return Helper.responseErr(
                res,
                StatusCodes.INTERNAL_SERVER_ERROR, 
                ReasonPhrases.INTERNAL_SERVER_ERROR,
                e.message
            );
        }
    }
    
    public async update(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const { name } = req.body;
            const department = await DepartmentService.update(Number(id), name);

            return Helper.response(res, StatusCodes.OK, "Department Updated", department);
        } catch (e: any) {
            return Helper.responseErr(
                res,
                StatusCodes.INTERNAL_SERVER_ERROR, 
                ReasonPhrases.INTERNAL_SERVER_ERROR,
                e.message
            );
        }
    }

    public async destroy(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const department = await DepartmentService.delete(Number(id))

            if (!department) {
                return Helper.responseErr(res, StatusCodes.NOT_FOUND, "Department Not Found", null);
            }

            return Helper.response(res, StatusCodes.OK, "Department Deleted", null);
        } catch (e: any) {
            return Helper.responseErr(
                res,
                StatusCodes.INTERNAL_SERVER_ERROR, 
                ReasonPhrases.INTERNAL_SERVER_ERROR,
                e.message
            );
        }
    }
}

export default new DepartmentController();
