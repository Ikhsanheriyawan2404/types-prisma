import { Company, User, Department, PrismaClient, Prisma } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { encryptPassword } from "../src/helpers/encryption";

const prisma = new PrismaClient();

function companiesRandomId(companies: Company[]): bigint {
  const randomIndex = Math.floor(Math.random() * companies.length);
  const randomCompany = companies[randomIndex];
  return randomCompany.id;
}

async function main() {
  // use with caution. this will delete all data in the database
  await prisma.saldoHistory.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.department.deleteMany({});
  await prisma.company.deleteMany({});

  const totalData = 100;
  let companies = [];

  const department: Omit<Department, 'id'> = {
    name: 'Officer',
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

  for (let i = 0; i < totalData; i++) {
    const user: Omit<User,
      'id' |
      'email_verified_at' |
      'remember_token' |
      'employee_id' |
      'phone_number' |
      'phone_number' |
      'created_at' |
      'deleted_at' |
      'updated_at'
    > = {
      name: faker.company.name(),
      email: faker.internet.email(),
      password: await encryptPassword("password123"),
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

    await prisma.user.create({
      data: user,
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