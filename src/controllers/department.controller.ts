import { Request, Response } from "express";
import {
  ReasonPhrases,
  StatusCodes,
} from 'http-status-codes';
import DepartmentService from "../services/department.service";
import Helper from "../utils/helper";

class DepartmentController {

  public moduleName: string;

  constructor() {
    this.moduleName = "Department";
  }

  public index = async (_: Request, res: Response): Promise<Response> => {
    try {
      const users = await DepartmentService.listData();
      return Helper.response(res, StatusCodes.OK, `List ${this.moduleName}`, users);
    } catch (e: any) {
      return Helper.responseErr(
        res,
        StatusCodes.INTERNAL_SERVER_ERROR,
        ReasonPhrases.INTERNAL_SERVER_ERROR,
        e.message
      );
    }
  }

  public show = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const user = await DepartmentService.findById(Number(id));
      if (!user) return Helper.response(res, StatusCodes.NOT_FOUND, `${this.moduleName} Not Found`, null)

      return Helper.response(res, StatusCodes.OK, `Detail ${this.moduleName}`, user);
    } catch (e: any) {
      return Helper.responseErr(
        res,
        StatusCodes.INTERNAL_SERVER_ERROR,
        ReasonPhrases.INTERNAL_SERVER_ERROR,
        e.message
      );
    }
  }

  public create = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { name } = req.body;
      const data = {
        name,
        slug: name.toLowerCase().replace(/\s+/g, '-'),
      }
      const department = await DepartmentService.create(data);

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

  public update = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const data = {
        name,
        slug: name.toLowerCase().replace(/\s+/g, '-'),
      }
      const department = await DepartmentService.update(Number(id), data);

      return Helper.response(res, StatusCodes.OK, `${this.moduleName} Updated`, department);
    } catch (e: any) {
      return Helper.responseErr(
        res,
        e.name,
        ReasonPhrases.INTERNAL_SERVER_ERROR,
        e.message
      );
    }
  }

  public destroy = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;

      const department = await DepartmentService.findById(Number(id));
      if (!department) {
        const error = new Error(`${this.moduleName} Not Found`);
        // error.name = ReasonPhrases.NOT_FOUND;
        throw error;
      }

      return Helper.response(res, StatusCodes.OK, `${this.moduleName} Deleted`, null);
    } catch (e: any) {
      return Helper.responseErr(
        res,
        404,
        ReasonPhrases.INTERNAL_SERVER_ERROR,
        e.message
      );
    }
  }
}

export default new DepartmentController();
