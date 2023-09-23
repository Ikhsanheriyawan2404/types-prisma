import { Request, Response } from "express";
import { db } from "../../src/utils/db.server";

class UserController { 

  public async index(_: Request, res: Response): Promise<Response> {
    try {
      const users = await db.user.findMany();
      console.log(users)

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

  // SHOW & UPDATE
}

export default new UserController();
