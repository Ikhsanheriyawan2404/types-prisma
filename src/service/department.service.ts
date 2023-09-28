import { User } from "@prisma/client";
import { db } from "../utils/db.server";

// import { Department } from "@prisma/client";

type Department = {
    id: number,
    name: string,
    users?: User[]
}

class DepartmentService {

    public listData = async (): Promise<Department[]> => {
        return db.department.findMany({
            select: {
                id: true,
                name: true,
                users: true,
            },
        });
    }

    public create = async (name: string): Promise<Department> => {

        return db.department.create({
            data: {
                name: name,
            },
            select: {
                id: true,
                name: true,
                users: true,
            }
        })
    }
}

export default new DepartmentService();