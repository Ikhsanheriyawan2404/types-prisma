import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

import CompanyService from "../service/company.service";
const prisma = new PrismaClient()
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

  // public async show(req: Request, res: Response): Promise<Response> {
  //   try {
  //     const { id } = req.params;

  //     let company = await CompanyService.getCompany(Number(id));

  //     if (!company) {
  //       return res.status(404).json({
  //         message: "Company not found",
  //         data: null
  //       });
  //     }

  //     return res.status(200).json({
  //       message: "Company Detail",
  //       data: company,
  //     });
  //   } catch (e: any) {
  //     return res.status(500).json({
  //       message: e.message,
  //       errors: e,
  //     });
  //   }
  // }

  // public async create(req: Request, res: Response): Promise<Response> {
  //   try {
  //     const {
  //       name,
  //       email,
  //       working_days,
  //       cutoff_date,
  //       fee,
  //       fee_discount,
  //       join_date,
  //       end_date,
  //     } = req.body;


  //     const company = await CompanyService.create({
  //       name,
  //       email,
  //       working_days,
  //       cutoff_date,
  //       fee,
  //       fee_discount,
  //       join_date,
  //       end_date,
  //     });

  //     return res.status(201).json({
  //       message: "Company created",
  //       data: company,
  //     });
  //   } catch (e: any) {
  //     return res.status(500).json({
  //       message: e.message,
  //       errors: e,
  //     });
  //   }
  // }
}

export default new CompanyController();
