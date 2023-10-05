import { Request, Response } from "express";
import {
  StatusCodes,
  ReasonPhrases
} from "http-status-codes"
import Helper from "../utils/helper";
import TransactionService from "../services/transaction.service";

class TransactionController {

  public moduleName: string;

  constructor () {
    this.moduleName = "Transaction";
  }

  public create = async (req: Request, res: Response) => {
    try {
      const userId = Number(req.params.id);
      const transactionData = {
        ...req.body,
      };
      const transactions = await TransactionService.disbursement(transactionData, userId);
      return Helper.response(res, StatusCodes.CREATED, `Create ${this.moduleName}`, transactions);
    } catch (e: any) {
      return Helper.responseErr(
        res,
        StatusCodes.INTERNAL_SERVER_ERROR,
        ReasonPhrases.INTERNAL_SERVER_ERROR,
        e.message
        );
    }
  }

  // process disbursement, history, calculate fee, count & accumulation disbursement
}

export default new TransactionController();
