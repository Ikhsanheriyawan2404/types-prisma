import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes";
import saldoAccumulationJob from "./jobs/saldo.accumulation.job";
import { CronJob } from 'cron';

dotenv.config();

const app: Express = express();
const port: number = Number(process.env.PORT);

if (!process.env.PORT) {
  console.error("No port specified");
  process.exit(1);
}
  
app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(routes);


let jobSaldoAccumulationAndReset = new CronJob(
  '0 * * * * *', // Setiap satu menit (0 detik, setiap menit)
  function() {
    saldoAccumulationJob.start();
  },
  null,
  true,
  'Asia/Jakarta'
);
jobSaldoAccumulationAndReset.start();

const start = async (): Promise<void> => {
  try {
    app.listen(port, () => {
      console.log(`Server started on http://${process.env.HOST}:${port}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
  
void start();

export default app;