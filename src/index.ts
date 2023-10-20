import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes";
import saldoAccumulationJob from "./jobs/saldo.accumulation.job";
import { CronJob } from 'cron';
import winston from "winston";
import passport from 'passport';
import { jwtStrategy } from './config/passport';

dotenv.config();

const app: Express = express();
const port: number = Number(process.env.PORT);

if (!process.env.PORT) {
  console.error("No port specified");
  process.exit(1);
}

app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);


winston.createLogger({
  // Log only if level is less than (meaning more severe) or equal to this
  level: "info",
  // Use timestamp and printf to create a standard log format
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(
      (info) => `${info.timestamp} ${info.level}: ${info.message}`
    )
  ),
  // Log to the console and a file
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/app.log" }),
  ],
});

let jobSaldoAccumulationAndReset = new CronJob(
  '15 * * * * *',
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
