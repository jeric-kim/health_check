import axios from "axios";
import { ServiceDefinition } from "../config/services";

export type HealthLog = {
  serviceId: string;
  timestamp: number;
  latency: number;
  success: boolean;
  statusCode?: number;
  errorMessage?: string;
};

export const DEFAULT_TIMEOUT_MS = 5000;

export async function checkHealth(
  service: ServiceDefinition,
  timeout: number = DEFAULT_TIMEOUT_MS
): Promise<HealthLog> {
  const start = Date.now();
  try {
    const response = await axios.get(service.baseUrl, { timeout });
    const latency = Date.now() - start;
    return {
      serviceId: service.id,
      timestamp: Date.now(),
      latency,
      success: response.status >= 200 && response.status < 400,
      statusCode: response.status,
    };
  } catch (error: unknown) {
    const latency = Date.now() - start;
    if (axios.isAxiosError(error)) {
      return {
        serviceId: service.id,
        timestamp: Date.now(),
        latency,
        success: false,
        statusCode: error.response?.status,
        errorMessage: error.message,
      };
    }

    return {
      serviceId: service.id,
      timestamp: Date.now(),
      latency,
      success: false,
      errorMessage: (error as Error)?.message ?? "Unknown error",
    };
  }
}
