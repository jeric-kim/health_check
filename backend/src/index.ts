import express from "express";
import cors from "cors";
import statusRouter from "./routes/status";
import { startScheduler, runFullHealthCheck } from "./cron/scheduler";

const PORT = process.env.PORT || 4000;
const allowedOrigins = process.env.CORS_ORIGINS
  ?.split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

async function bootstrap() {
  const app = express();
  app.use(cors(allowedOrigins?.length ? { origin: allowedOrigins } : undefined));
  app.use(express.json());

  app.use("/api", statusRouter);

  app.listen(PORT, async () => {
    console.log(`Server started on port ${PORT}`);
    await runFullHealthCheck();
    startScheduler();
  });
}

bootstrap();
