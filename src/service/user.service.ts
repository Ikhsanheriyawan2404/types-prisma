import { encryptPassword } from "../helpers/encryption";
import { db } from "../utils/db.server";
import { User } from "@prisma/client";

// type User = {
//     id: number;
//     name: string;
//     email: string;
//     password: string;
//     saldo: number;
//     salary: number;
//     department_id?: number;
//     company_id: number;
//     created_at?: Date;
//     updated_at?: Date;
//     // company: Company;
// }

class UserService {

    public listUsers = async <Key extends keyof User>(
        keys: Key[] = [
          'id',
          'email',
          'name',
          'password',
          'saldo',
          'salary',
          'company_id',
          'department_id',
          'created_at',
          'updated_at'
        ] as Key[]
      ): Promise<Pick<User, Key>[]> => {
        const users = await db.user.findMany({
        //   select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
        });
        return users as Pick<User, Key>[];
      };

    /**
     * Get user by id
     * @param {ObjectId} id
     * @param {Array<Key>} keys
     * @returns {Promise<Pick<User, Key> | null>}
     */
    public getUserById = async <Key extends keyof User>(
        id: number,
        keys: Key[] = [
            'id',
            'email',
            'name',
            'created_at',
            'updated_at'
        ] as Key[]
    ): Promise<Pick<User, Key> | null> => {
        return db.user.findUnique({
        where: { id },
        select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
        }) as Promise<Pick<User, Key> | null>;
    };

    // public create = async (
    //     email: string,
    //     name: string,
    //     password: string,
    //     saldo: number,
    //     salary: number,
    //     department_id: number,
    //     company_id: number,
    // ): Promise<void> => {

    //     const user = db.user.create({
    //         data: {
    //             name,
    //             email,
    //             password: await encryptPassword(password),
    //             saldo,
    //             salary,
    //             company: {
    //                 connect: { id: company_id },
    //             },
    //             department: {
    //                 connect: { id: department_id },
    //             },
    //         },
    //         select: {
    //             id: true,
    //             name: true,
    //             email: true,
    //             password: true,
    //             saldo: true,
    //             salary: true,
    //             company_id: true,
    //             department_id: true,
    //         }
    //     })

    //     // return user;
    // }
}

export default new UserService();