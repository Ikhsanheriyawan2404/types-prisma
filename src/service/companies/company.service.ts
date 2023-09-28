import { User } from "@prisma/client";
import { db } from "../../utils/db.server";

export type Company = {
    id: number;
    name: string;
    email?: string;
    working_days: number;
    cutoff_date: number;
    fee: number;
    fee_discount: number;
    join_date?: Date,
    end_date?: Date,
    users?: User[]
}

class CompanyService {

    public listCompanies = async (): Promise<Company[]> => {
        return db.company.findMany({
            select: {
                id: true,
                name: true,
                fee: true,
                fee_discount: true,
                working_days: true,
                cutoff_date: true,
                users: true
            }
        });
    }

    public getCompany = async (id: number): Promise<Company | null> => {
        return db.company.findFirst({
            where: {
                id,
            },
            select: {
                id: true,
                name: true,
                fee: true,
                fee_discount: true,
                working_days: true,
                cutoff_date: true,
                users: true
            }
        });
    }

    public create = async (company: Omit<Company, "id">): Promise<Company> => {
        const {
            name,
            email,
            working_days,
            cutoff_date,
            fee,
            fee_discount,
            join_date,
            end_date,
        } = company;

        return db.company.create({
            data: {
                name,
                email,
                working_days,
                cutoff_date,
                fee,
                fee_discount,
                join_date,
                end_date,
            },
            select: {
                id: true,
                name: true,
                fee: true,
                fee_discount: true,
                working_days: true,
                cutoff_date: true
            }
        });
    }
}

export default new CompanyService();