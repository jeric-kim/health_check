import { ServiceState } from "../types/ServiceStatus";

interface Props {
  status: ServiceState;
}

const statusStyles: Record<ServiceState, string> = {
  UP: "bg-emerald-500/20 text-emerald-300 border-emerald-500/50",
  DEGRADED: "bg-amber-500/20 text-amber-300 border-amber-500/50",
  DOWN: "bg-rose-500/20 text-rose-300 border-rose-500/50",
  UNKNOWN: "bg-slate-600/30 text-slate-200 border-slate-600",
};

const labels: Record<ServiceState, string> = {
  UP: "정상",
  DEGRADED: "부분 장애",
  DOWN: "장애",
  UNKNOWN: "확인 중",
};

export function StatusBadge({ status }: Props) {
  return (
    <span
      className={`px-3 py-1 text-xs font-semibold rounded-full border ${statusStyles[status]}`}
    >
      {labels[status]}
    </span>
  );
}

export default StatusBadge;
