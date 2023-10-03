import { Request, Response } from "express";
import {
  StatusCodes,
  ReasonPhrases
} from "http-status-codes"
import Helper from "../utils/helper";
import TransactionService from "../services/transaction.service";

class TransactionController {

  public create = async (req: Request, res: Response) => {
    try {
      const transactionData = {
        ...req.body,
      };
      const transactions = await TransactionService.disbursement(transactionData);
      return Helper.response(res, StatusCodes.CREATED, `Create Transaction`, transactions);
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
