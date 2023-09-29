import { User, Company } from "@prisma/client";
import { db } from "../../utils/db.server";

class CompanyService {

    public listCompanies = async <Key extends keyof User>(
        keys: Key[] = [
            'id',
            'name',
            'fee',
            'fee_discount',
            'working_days',
            'created_at',
            'updated_at'
          ] as Key[]
    ): Promise<Pick<User, Key>[]> => {
        const companies = await db.company.findMany({
            select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
        });
        return companies as Pick<User, Key>[];
    }

    // public getCompany = async (id: number): Promise<Company | null> => {
    //     return db.company.findFirst({
    //         where: {
    //             id,
    //         },
    //         select: {
    //             id: true,
    //             name: true,
    //             fee: true,
    //             fee_discount: true,
    //             working_days: true,
    //             cutoff_date: true,
    //             users: true
    //         }
    //     });
    // }

    // public create = async (company: Omit<Company, "id">): Promise<Company> => {
    //     const {
    //         name,
    //         email,
    //         working_days,
    //         cutoff_date,
    //         fee,
    //         fee_discount,
    //         join_date,
    //         end_date,
    //     } = company;

    //     return db.company.create({
    //         data: {
    //             name,
    //             email,
    //             working_days,
    //             cutoff_date,
    //             fee,
    //             fee_discount,
    //             join_date,
    //             end_date,
    //         },
    //         select: {
    //             id: true,
    //             name: true,
    //             fee: true,
    //             fee_discount: true,
    //             working_days: true,
    //             cutoff_date: true
    //         }
    //     });
    // }
}

export default new CompanyService();