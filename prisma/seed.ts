import { Company, PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
    await prisma.company.deleteMany({}); // use with caution.

    const totalData = 100;

    // const companies: Company[] = [];

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
            update_at: faker.date.recent(),
        };

        // companies.push(company);
        await prisma.company.create({
            data: company,
        });
    }

    // const addCompanies = async () => await prisma.company.createMany({ data: companies });

    // addCompanies();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });