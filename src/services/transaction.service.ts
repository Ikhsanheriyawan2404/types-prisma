import { db } from "../utils/db.server";
import { Prisma, Transaction } from "@prisma/client";
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";
import UserService from "../services/user.service";

class TransactionService {

  public url: string;
  public accessToken: string;
  public vatTransaction: number = 2_400;
  public fee: number = 30_000;

  constructor() {
    this.url = process.env.PAYMENT_GATEWAY_URL ?? "https://bigflip.id/api/v3";
    this.accessToken = process.env.ACCESS_TOKEN ?? "FSDFSDFSD";
  }

  public disbursement = async (transactionData: Transaction, userId: number) => {
    const user = await UserService.getUserById(userId);
    if (!user) return;
    transactionData.uuid = this.createUuid();
    transactionData.status = "PENDING";
    transactionData.vat = new Prisma.Decimal(this.vatTransaction);
    transactionData.user_id = userId;
    transactionData.bank_code = user.bank_account;
    transactionData.account_number = user.account_number;
    transactionData.account_holder_name = user.account_holder_name;
    transactionData.status = "PENDING";
    transactionData.profit = new Prisma.Decimal(this.fee - this.vatTransaction);
    transactionData.vat = new Prisma.Decimal(this.vatTransaction);
    transactionData.description = `Saya sebagai ${user.name} setuju atas payment terms transaksi ini.`;

    const payloads = {
      account_number: user?.account_number,
      bank_code: user?.bank_account,
      amount: transactionData.total,
      remark: "some remark",
      recipient_city: "391",
      beneficiary_email: user?.email,
      idempotency_key: transactionData.uuid,
    };


    const transaction = await db.transaction.create({
      data: {
        ...transactionData,
      },
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
    });

    console.log(transaction);

    const result = await this.sendApiTransaction(payloads);
    console.log(result);

    return transaction;
  }

  public createUuid = (): string => {
    let uuid: string = uuidv4();
    return uuid;
  }

  public sendApiTransaction = async (payloads: any): Promise<any> => {

    const auth = btoa(this.accessToken + ":");

    const headers = {
      'idempotency-key': payloads.idempotency_key,
      'Authorization': "Basic " + auth,
    };

    axios.post(this.url + '/disbursement', new URLSearchParams(payloads).toString(), {
      headers: headers,
    })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error(error.response.data);
      });
  }

  public historyTransaction = async (userId: number) => { }

  public calculateFee = async () => { }
}

export default new TransactionService();
