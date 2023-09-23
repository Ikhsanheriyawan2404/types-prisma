import { Request, Response } from "express";
import { Company, PrismaClient } from "@prisma/client";
import { db } from "../../src/utils/db.server";

import CompanyService from "../../src/service/companies/company.service";
const prisma = new PrismaClient()

type ICompany = {
  id: number;
  name: string;
  email: string;
}
class CompanyController {
  public async index(_: Request, res: Response): Promise<Response> {
    try {
      let companies = await CompanyService.listCompanies();

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

  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const {
        name,
        email,
        working_days,
        cutoff_date,
        fee,
        fee_discount,
        join_date,
        end_date,
      } = req.body;

      const company = await prisma.company.create({
        data: {
          name,
          email,
          working_days,
          cutoff_date,
          fee,
          fee_discount,
          join_date,
          end_date,
        },
      });

      return res.status(201).json({
        message: "Company created",
        data: company,
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
