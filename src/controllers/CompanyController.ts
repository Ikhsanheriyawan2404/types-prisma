import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

class CompanyController { 

  public async index(_: Request, res: Response): Promise<Response> {
    try {
      const companies = await prisma.company.findMany();

      return res.status(200).json({
        message: "Companies",
        data: companies,
      });
    } catch (e: any) {
      return res.status(500).json({
        message: e.message,
        errors: e,
      });
    }
  }
}

export default new CompanyController();
