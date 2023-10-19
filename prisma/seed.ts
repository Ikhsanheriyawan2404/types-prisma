import { Company, User, Department, PrismaClient, Prisma, Transaction } from "@prisma/client";
import { faker } from "@faker-js/faker";
import Helper from "../src/utils/helper";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

async function resetAutoIncrementTable(tableNames: Array<string>): Promise<void> {
  tableNames.forEach(async (table) => {
    await prisma.$queryRaw`ALTER TABLE "${table}" AUTO_INCREMENT = 1`
  })
}
function companiesRandomId(companies: Company[]): number {
  const randomIndex = Math.floor(Math.random() * companies.length);
  const randomCompany = companies[randomIndex];
  return randomCompany.id;
}

function usersRandomId(users: User[]) {
  const randomIndex = Math.floor(Math.random() * users.length);
  return users[randomIndex];
}

function generateUuid(): string {
  let uuid: string = uuidv4();
  return uuid;
}

async function generateBank() {
  const result = await axios.get('https://bigflip.id/big_sandbox_api/v2/general/banks', {
    headers: {
      Authorization: "Basic " + btoa(process.env.ACCESS_TOKEN + ":")
    },
  })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error(error.response.data);
    });

  result.forEach(async (bank: any) => {
    console.time("Bank " + bank.name + " created");
    await prisma.bank.create({
      data: {
        bank_code: bank.bank_code,
        name: bank.name,
        fee: bank.fee,
      }
    })
    console.timeEnd("Bank " + bank.name + " created");
  });
}

async function main() {
  // use with caution. this will delete all data in the database
  await prisma.token.deleteMany({});
  await prisma.transaction.deleteMany({});
  await prisma.saldoHistory.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.department.deleteMany({});
  await prisma.company.deleteMany({});
  await prisma.bank.deleteMany({});

  // resetAutoIncrementTable([
  //   'tokens',
  //   'transactions',
  //   'saldo_histories',
  //   'users',
  //   'departments',
  //   'companies',
  //   'banks',
  // ]);

  await generateBank();

  const totalData = 1000;
  let companies = [];
  let users = [];

  const department: Omit<Department, 'id'> = {
    name: 'Officer',
    slug: 'officer',
    created_at: faker.date.past(),
    updated_at: faker.date.recent(),
  };

  const departmentData = await prisma.department.create({
    data: department,
  });

  for (let i = 0; i < totalData; i++) {

    const company: Omit<Company,
      'id' |
      'phone_pic' |
      'name_pic' |
      'nib' |
      'npwp' |
      'join_date' |
      'end_date' |
      'payroll_date' |
      'created_at' |
      'updated_at'
    > = {
      name: faker.company.name(),
      email_pic: faker.internet.email(),
      cutoff_date: 21,
      working_days: 14,
      fee: new Prisma.Decimal(30_000),
      fee_discount: new Prisma.Decimal(10_000),
      active: "1",
      disbursement_dates: "25,26,27",
      batch: 1,
    };

    companies.push(await prisma.company.create({
      data: company,
    }));
  }

  const user1: Omit<User,
      'id' |
      'email_verified_at' |
      'remember_token' |
      'employee_id' |
      'phone_number' |
      'created_at' |
      'deleted_at' |
      'updated_at'
    > = {
      name: "Ikhsan Heriyawan",
      email: "ikhsan123@gmail.com",
      password: await Helper.encryptPassword("admin123"),
      saldo: new Prisma.Decimal(2000_000),
      department_id: departmentData.id,
      salary: new Prisma.Decimal(4_900_000), // UMK Kota Jakarta 2022
      role: "user",
      active: "1",
      bank_account: "mandiri",
      account_number: "123456789010",
      account_holder_name: "Anonymus",
      company_id: companiesRandomId(companies),
    };

  await prisma.user.create({
    data: user1
  })

  for (let i = 0; i < totalData; i++) {
    const user: Omit<User,
      'id' |
      'email_verified_at' |
      'remember_token' |
      'employee_id' |
      'phone_number' |
      'created_at' |
      'deleted_at' |
      'updated_at'
    > = {
      name: faker.internet.userName(),
      email: faker.internet.email(),
      password: await Helper.encryptPassword("password123"),
      saldo: new Prisma.Decimal(0),
      department_id: departmentData.id,
      salary: new Prisma.Decimal(4_900_000), // UMK Kota Jakarta 2022
      role: "user",
      active: "1",
      bank_account: "BRI",
      account_number: "1234567890",
      account_holder_name: "Anonymus",
      company_id: companiesRandomId(companies),
    };

    users.push(await prisma.user.create({
      data: user,
    }));
  }

  for (let i = 0; i < totalData; i++) {
    let user = usersRandomId(users)

    console.time("Transaction " + user.name + " created")
    const transaction: Omit<Transaction,
      'id' |
      'created_at' |
      'updated_at'
    > = {
      uuid: generateUuid(),
      user_id: user.id,
      total: new Prisma.Decimal(300_000),
      vat: new Prisma.Decimal(2_400),
      profit: new Prisma.Decimal(27_600),
      bank_code: user.bank_account,
      account_number: user.account_number,
      account_holder_name: user.account_holder_name,
      description: null,
      status: "COMPLETED",
      failure_code: null,
    };

    console.timeEnd("Transaction " + user.name + " created")

    await prisma.transaction.create({
      data: transaction,
    })
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
