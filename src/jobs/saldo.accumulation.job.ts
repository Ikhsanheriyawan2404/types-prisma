import { db } from '../utils/db.server';
import moment from 'moment-timezone';

class SaldoAccumulationJob {

    public async start(): Promise<void> {
        console.log("Saldo Accumulation Job started.");
        
        const lastDayOfMonth = moment().endOf('month').date();
        const currentDate = moment().date();

        const users = await db.user.findMany({
            where: {
                role: "user"
            },
            select: {
                id: true,
                saldo: true,
                salary: true,
                company: {
                    select: {
                        id: true,
                        name: true,
                        cutoff_date: true,
                        working_days: true,
                    }
                },

            }
        });

        for (const user of users) {
            // ada kemungkinan kita tidak menemui tgl sprti berikut 29,30,31
            // dan kemungkinan untuk reset jadi skip. maka solusinya

            if (!user.company) return;

            let cutOffDate = user.company.cutoff_date + 1;

            if (cutOffDate > lastDayOfMonth) {
                cutOffDate = 1;
            }

            if (cutOffDate == currentDate) {
                // reset saldo 0
                await db.user.update({
                    where: {
                        id: user.id
                    },
                    data: {
                        saldo: 0
                    }
                });

                // delete saldo history
                await db.saldoHistory.deleteMany({
                    where: {
                        user_id: user.id
                    }
                });
            }
        }

        for (const user of users) {
            
            if (!user.company) return;

            let salary: number = Number(user.salary);
            let workingDays: number = user.company.working_days;
            let dailyWages: number = salary / workingDays;

            // when user finish dailyWages
            let totalDailyWages: number = await db.saldoHistory.count({
                where: {
                    user_id: user.id,
                    amount: {
                        not: 0,
                    },
                },
            });
            
            if (totalDailyWages >= workingDays) {
                dailyWages = 0;
            }

            let cutOffDate2 = user.company.cutoff_date + 1;

            if (cutOffDate2 > lastDayOfMonth) {
                cutOffDate2 = 1;
            }

            if (cutOffDate2 !== currentDate) {
                // create saldo histories.
                await db.saldoHistory.createMany({
                    data: [
                        {
                            user_id: user.id,
                            amount: dailyWages,
                        },
                    ]
                });
                // increment saldo user by dailyWages.
                await db.user.update({
                    where: {
                        id: user.id
                    },
                    data: {
                        saldo: {
                            increment: dailyWages
                        }
                    }
                });

            }
        }
    }
}

export default new SaldoAccumulationJob();