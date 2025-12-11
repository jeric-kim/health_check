import axios from "axios";
import { AggregatedServiceStatus, HealthLog } from "../types/ServiceStatus";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "http://localhost:4000",
});

export async function fetchStatuses(): Promise<AggregatedServiceStatus[]> {
  const { data } = await api.get<AggregatedServiceStatus[]>("/api/status");
  return data;
}

export async function fetchLogs(serviceId: string): Promise<HealthLog[]> {
  const { data } = await api.get<HealthLog[]>(`/api/status/${serviceId}/logs`);
  return data;
}

export async function triggerCheck(serviceId: string) {
  const { data } = await api.post(`/api/status/${serviceId}/check`);
  return data as { log: HealthLog; summary: AggregatedServiceStatus };
}

export async function fetchMeta() {
  const { data } = await api.get(`/api/status/meta/list`);
  return data as { id: string; name: string; category: string; description?: string }[];
}
