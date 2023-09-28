import { Request, Response } from "express";
import UserService from "../service/user.service";

class UserController { 

  public async index(_: Request, res: Response): Promise<Response> {
    try {
      const users = await UserService.listUsers();

      return res.status(200).json({
        message: "All users",
        data: users,
      });
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
        res.status(404).json({
          message: "User Not Found",
          data: null,
        });
      }

      return res.status(200).json({
        message: "User by id",
        data: user,
      });
    } catch (e: any) {
      return res.status(500).json({
        message: e.message,
        errors: e,
      });
    }
  }

  // SHOW & UPDATE
}

export default new UserController();
