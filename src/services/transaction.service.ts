import { db } from "../utils/db.server";
import { Transaction } from "@prisma/client";
import { v4 as uuidv4 } from 'uuid';
class TransactionService {

  public disbursement = async (transactionData: Transaction) => {
    transactionData.uuid = this.createUuid();
    return await db.transaction.create({
      data: transactionData,
      select: {
        id: true,
        uuid: true,
        user_id: true,
        total: true,
        vat: true,
        profit: true,
        bank_code: true,
        account_number: true,
        account_holder_name: true,
        description: true,
        status: true,
        failure_code: true,
        created_at: true,
        updated_at: true,
      }
    })
  }

  public createUuid = (): string => {
    let uuid: string = uuidv4();
    return uuid;
  }

  public historyTransaction = async (userId: number) => {}

  public calculateFee = async () => {}
}

export default new TransactionService();
