import express from "express";
import cors from "cors";
import statusRouter from "./routes/status";
import { startScheduler, runFullHealthCheck } from "./cron/scheduler";

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.use("/api", statusRouter);

  app.listen(PORT, async () => {
    console.log(`Server started on port ${PORT}`);
    await runFullHealthCheck();
    startScheduler();
  });
}

bootstrap();
