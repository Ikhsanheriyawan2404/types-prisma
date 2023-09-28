import { db } from "../utils/db.server";

type User = {
    id: number;
    name?: string;
    email: string;
    company_id: number;
    created_at?: Date;
    updated_at?: Date;
}

class UserService {

    public listUsers = async (): Promise<User[]> => {
        return db.user.findMany({
            select: {
                id: true,
                name: false,
                email: true,
                company_id: true,
                company: {
                    select: {
                        name: true,
                        fee: true,
                        fee_discount: true,
                        working_days: true,
                        cutoff_date: true
                    }
                }
            }
        });
    }

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

    // public createUser = async (user: User): Promise<User> => {
    //     return db.user.create({
    //         data: user
    //     });
    // }
}

export default new UserService();