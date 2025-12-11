import { AggregatedServiceStatus } from "../types/ServiceStatus";
import StatusBadge from "./StatusBadge";

interface Props {
  service: AggregatedServiceStatus;
  onSelect: (id: string) => void;
  isSelected: boolean;
}

export default function ServiceCard({ service, onSelect, isSelected }: Props) {
  return (
    <button
      onClick={() => onSelect(service.id)}
      className={`w-full text-left border rounded-xl p-4 transition hover:border-emerald-500/70 hover:shadow-lg hover:shadow-emerald-500/10 ${
        isSelected ? "border-emerald-500/70" : "border-slate-800"
      } bg-slate-900`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-lg font-semibold text-slate-100">{service.name}</p>
          <p className="text-sm text-slate-400">{service.category}</p>
        </div>
        <StatusBadge status={service.status} />
      </div>
      <div className="mt-3 text-sm text-slate-300 space-y-1">
        <p>
          최근 체크:
          <span className="ml-2 text-slate-200">
            {service.lastCheckedAt
              ? new Date(service.lastCheckedAt).toLocaleTimeString()
              : "데이터 없음"}
          </span>
        </p>
        <p>
          최근 지연시간:
          <span className="ml-2 text-emerald-300">
            {service.lastLatency !== undefined
              ? `${service.lastLatency} ms`
              : "-"}
          </span>
        </p>
      </div>
    </button>
  );
}
