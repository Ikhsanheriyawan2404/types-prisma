import { Request, Response } from "express";
import UserService from "../service/user.service";
import Helper from "../helpers/response";

class UserController { 

  public async index(_: Request, res: Response): Promise<Response> {
    try {
      const users = await UserService.listUsers();

      return Helper.response(res, 200, "List Users", users);
    } catch (e: any) {
      return res.status(500).json({
        message: e.message,
        errors: e,
      });
    }
  }

  public async show(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      const user = await UserService.getUserById(Number(id));

      if (!user) {
        return Helper.responseErr(res, 404, "Not Found", null);
      }

      return Helper.response(res, 200, "User Details", user);
    } catch (e: any) {
      return res.status(500).json({
        message: e.message,
        errors: e,
      });
    }
  }

  public create = async (req: Request, res: Response): Promise<Response> => {
    try {
      const {
        name,
        email,
        password,
        saldo,
        salary,
        company_id,
        department_id,
      } = req.body;

      const user = await UserService.create(
        name,
        email,
        password,
        saldo,
        salary,
        company_id,
        department_id,
      );

      return Helper.response(res, 201, "User created", user);
    } catch (e: any) {
      return res.status(500).json({
        message: e.message,
        errors: e,
      });
    }
  }; 

  // SHOW & UPDATE
}

export default new UserController();
