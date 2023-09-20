import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();
const prisma = new PrismaClient()

class UserController { 

  public async index(_: Request, res: Response): Promise<Response> {
    try {
      const users = await prisma.user.findMany();
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
}

export default new UserController();
