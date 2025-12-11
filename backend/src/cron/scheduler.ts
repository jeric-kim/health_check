import cron from "node-cron";
import { SERVICES } from "../config/services";
import { checkHealth } from "../utils/healthChecker";
import { statusStore } from "../utils/statusStore";

export function startScheduler() {
  cron.schedule("*/5 * * * *", async () => {
    await runFullHealthCheck();
  });
}

export async function runFullHealthCheck() {
  await Promise.all(
    SERVICES.map(async (service) => {
      const log = await checkHealth(service);
      statusStore.addLog(service, log);
    })
  );
}
