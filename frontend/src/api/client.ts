import axios from "axios";
import { AggregatedServiceStatus, HealthLog } from "../types/ServiceStatus";

function resolveApiBase() {
  const envBase = import.meta.env.VITE_API_BASE;

  if (typeof window === "undefined") {
    return envBase || "http://localhost:4000";
  }

  const params = new URLSearchParams(window.location.search);
  const overrideFromQuery = params.get("apiBase")?.trim();

  if (overrideFromQuery) {
    localStorage.setItem("apiBaseOverride", overrideFromQuery);
  }

  const stored = localStorage.getItem("apiBaseOverride")?.trim();

  return (
    overrideFromQuery ||
    stored ||
    envBase ||
    window.location.origin.replace(/\/$/, "") ||
    "http://localhost:4000"
  );
}

export const API_BASE = resolveApiBase();

const api = axios.create({
  baseURL: API_BASE,
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
