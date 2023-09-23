import { db } from "../../utils/db.server";

type Company = {
    id: number;
    name: string;
}

class CompanyService {
        
    public listCompanies = async (): Promise<Company[]> => {
        return db.company.findMany({
            select: {
                id: true,
                name: true,
            }
        });
    }
}

export default new CompanyService();