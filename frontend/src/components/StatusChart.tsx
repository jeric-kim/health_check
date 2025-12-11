import { HealthLog } from "../types/ServiceStatus";

interface Props {
  logs: HealthLog[];
}

export default function StatusChart({ logs }: Props) {
  const recent = logs.slice(0, 20).reverse();
  return (
    <div className="mt-4">
      <div className="flex items-end gap-1 h-24 border border-slate-800 rounded-lg p-2 bg-slate-900">
        {recent.length === 0 && (
          <p className="text-sm text-slate-400">표시할 로그가 없습니다.</p>
        )}
        {recent.map((log, idx) => (
          <div
            key={`${log.timestamp}-${idx}`}
            className={`flex-1 rounded-sm ${
              log.success ? "bg-emerald-500" : "bg-rose-500"
            }`}
            style={{ height: `${Math.min(100, Math.max(15, log.latency / 10))}%` }}
            title={`${new Date(log.timestamp).toLocaleTimeString()} - ${log.latency}ms`}
          />
        ))}
      </div>
      <p className="text-xs text-slate-500 mt-2">최근 20회 체크 기록</p>
    </div>
  );
}
