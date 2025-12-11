import { Router } from "express";
import { SERVICES } from "../config/services";
import { checkHealth } from "../utils/healthChecker";
import { statusStore } from "../utils/statusStore";

const router = Router();

router.get("/status", (req, res) => {
  const summary = statusStore.getAggregatedStatus(SERVICES);
  res.json(summary);
});

router.post("/status/:id/check", async (req, res) => {
  const service = SERVICES.find((s) => s.id === req.params.id);
  if (!service) {
    return res.status(404).json({ message: "Service not found" });
  }

  try {
    const log = await checkHealth(service);
    statusStore.addLog(service, log);
    const summary = statusStore.aggregateService(service);
    return res.json({ log, summary });
  } catch (error) {
    return res.status(500).json({ message: "Health check failed" });
  }
});

router.get("/status/:id/logs", (req, res) => {
  const service = SERVICES.find((s) => s.id === req.params.id);
  if (!service) {
    return res.status(404).json({ message: "Service not found" });
  }
  const logs = statusStore.getLogs(service.id);
  res.json(logs.slice(0, 50));
});

router.get("/status/meta/list", (_req, res) => {
  res.json(SERVICES);
});

export default router;
