import { HealthLog } from "./healthChecker";
import { ServiceDefinition } from "../config/services";

export type AggregatedStatus = {
  id: string;
  name: string;
  category: string;
  description?: string;
  status: "UP" | "DEGRADED" | "DOWN" | "UNKNOWN";
  lastLatency?: number;
  lastCheckedAt?: number;
  failureRate: number;
  totalChecks: number;
};

const MAX_LOGS = 50;
const FAILURE_WINDOW_MS = 15 * 60 * 1000;

class StatusStore {
  private logs: Map<string, HealthLog[]> = new Map();

  addLog(service: ServiceDefinition, log: HealthLog) {
    const existing = this.logs.get(service.id) ?? [];
    existing.unshift(log);
    const trimmed = existing.slice(0, MAX_LOGS);
    this.logs.set(service.id, trimmed);
  }

  getLogs(serviceId: string): HealthLog[] {
    return this.logs.get(serviceId) ?? [];
  }

  getAggregatedStatus(services: ServiceDefinition[]): AggregatedStatus[] {
    return services.map((service) => this.aggregateService(service));
  }

  aggregateService(service: ServiceDefinition): AggregatedStatus {
    const serviceLogs = this.logs.get(service.id) ?? [];
    const now = Date.now();
    const recentLogs = serviceLogs.filter(
      (log) => now - log.timestamp <= FAILURE_WINDOW_MS
    );

    if (recentLogs.length === 0) {
      return {
        id: service.id,
        name: service.name,
        category: service.category,
        description: service.description,
        status: "UNKNOWN",
        failureRate: 0,
        totalChecks: 0,
      };
    }

    const failures = recentLogs.filter((log) => !log.success).length;
    const failureRate = failures / recentLogs.length;
    let status: AggregatedStatus["status"];
    if (failureRate === 0) {
      status = "UP";
    } else if (failureRate < 0.4) {
      status = "DEGRADED";
    } else {
      status = "DOWN";
    }

    const [latest] = serviceLogs;

    return {
      id: service.id,
      name: service.name,
      category: service.category,
      description: service.description,
      status,
      lastLatency: latest?.latency,
      lastCheckedAt: latest?.timestamp,
      failureRate,
      totalChecks: recentLogs.length,
    };
  }
}

export const statusStore = new StatusStore();
