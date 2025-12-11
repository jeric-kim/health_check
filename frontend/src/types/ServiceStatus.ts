export type ServiceState = "UP" | "DEGRADED" | "DOWN" | "UNKNOWN";

export interface AggregatedServiceStatus {
  id: string;
  name: string;
  category: string;
  description?: string;
  status: ServiceState;
  lastLatency?: number;
  lastCheckedAt?: number;
  failureRate: number;
  totalChecks: number;
}

export interface HealthLog {
  serviceId: string;
  timestamp: number;
  latency: number;
  success: boolean;
  statusCode?: number;
  errorMessage?: string;
}
