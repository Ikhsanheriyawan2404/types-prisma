import { User } from "@prisma/client";
import { db } from "../utils/db.server";
import { log } from "winston";

// import { Department } from "@prisma/client";

type Department = {
    id: bigint,
    name: string,
    users?: User[]
}

class DepartmentService {

    public listData = async (): Promise<Department[]> => {
        const departments = await db.department.findMany({
            select: {
              id: true,
              name: true,
            },
        });
        
        const newData = JSON.stringify(departments,
            (key, value) => (typeof value === 'bigint' ? value.toString() : value) // return everything else unchanged
            )
        console.log(newData);
        
            return departments
        // return newData;
    }

    public findById = async (id: number): Promise<Department | null> => {
        return db.department.findFirst({
            where: {
                id,
            },
            select: {
                id: true,
                name: true,
                users: true
            }
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

    public update = async (id: number, name: string): Promise<Department> => {
        return db.department.update({
            where: {
                id,
            },
            data: {
                name,
            },
        });
    }

    public delete = async (id: number): Promise<Department> => {
        return db.department.delete({
            where: {
                id,
            },
        });
    }
}

export default new DepartmentService();