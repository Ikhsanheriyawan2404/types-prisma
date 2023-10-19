import { User } from "@prisma/client";
import { db } from "../utils/db.server";

type Department = {
  id: number,
  name: string,
  slug: string,
  users?: User[]
}

class DepartmentService {

  public listData = async (): Promise<Department[]> => {
    return await db.department.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
      },
    });
  }

  public findById = async (id: number): Promise<Department | null> => {
    return db.department.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        slug: true,
        users: true
      }
    });
  }

  public findBySlug = async (slug: string): Promise<Department | null> => {
    return db.department.findFirst({
      where: {
        slug: slug,
      },
      select: {
        id: true,
        name: true,
        slug: true,
      }
    });
  }

  public create = async (data: Omit<Department, "id">): Promise<Department> => {
    return db.department.create({
      data: {
        name: data.name,
        slug: data.slug,
      },
      select: {
        id: true,
        name: true,
        slug: true,
      }
    })
  }

  public update = async (id: number, data: Omit<Department, "id">): Promise<Department> => {
    return db.department.update({
      where: {
        id,
      },
      data: {
        name: data.name,
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
