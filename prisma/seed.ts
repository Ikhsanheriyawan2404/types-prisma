import { Company, User, PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

function companiesRandomId(companies: Company[]): number {
  const randomIndex = Math.floor(Math.random() * companies.length);
  const randomCompany = companies[randomIndex];
  return randomCompany.id;
}

async function main() {
  await prisma.user.deleteMany({}); // use with caution.
  await prisma.company.deleteMany({}); // use with caution.

  const totalData = 100;
  let companies = [];

  for (let i = 0; i < totalData; i++) {

    const company: Omit<Company, 'id'> = {
      name: faker.company.name(),
      email: faker.internet.email(),
      cutoff_date: 21,
      working_days: 14,
      fee: 30_000,
      fee_discount: 10_000,
      join_date: null,
      end_date: null,
      created_at: faker.date.past(),
      updated_at: faker.date.recent(),
    };

    companies.push(await prisma.company.create({
      data: company,
    }));
  }

  for (let i = 0; i < totalData; i++) {
    const user: Omit<User, 'id'> = {
      name: faker.company.name(),
      email: faker.internet.email(),
      company_id: companiesRandomId(companies),
      created_at: faker.date.past(),
      updated_at: faker.date.recent(),
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