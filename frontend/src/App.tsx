import { useEffect, useMemo, useState } from "react";
import {
  fetchLogs,
  fetchMeta,
  fetchStatuses,
  triggerCheck,
} from "./api/client";
import ServiceCard from "./components/ServiceCard";
import StatusBadge from "./components/StatusBadge";
import StatusChart from "./components/StatusChart";
import { AggregatedServiceStatus, HealthLog } from "./types/ServiceStatus";

function App() {
  const [statuses, setStatuses] = useState<AggregatedServiceStatus[]>([]);
  const [selectedId, setSelectedId] = useState<string>("");
  const [logs, setLogs] = useState<HealthLog[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const init = async () => {
      const [statusData] = await Promise.all([fetchStatuses(), fetchMeta()]);
      setStatuses(statusData);
      if (statusData.length > 0) {
        setSelectedId(statusData[0].id);
      }
    };
    init();
  }, []);

  useEffect(() => {
    if (!selectedId) return;
    fetchLogs(selectedId).then(setLogs);
  }, [selectedId]);

  const selectedService = useMemo(
    () => statuses.find((s) => s.id === selectedId),
    [selectedId, statuses]
  );

  const refreshAll = async () => {
    const list = await fetchStatuses();
    setStatuses(list);
    if (!selectedId && list.length > 0) {
      setSelectedId(list[0].id);
    }
  };

  const handleInstantCheck = async () => {
    if (!selectedService) return;
    setLoading(true);
    try {
      await triggerCheck(selectedService.id);
      await refreshAll();
      const newLogs = await fetchLogs(selectedService.id);
      setLogs(newLogs);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="p-6 border-b border-slate-800">
        <h1 className="text-2xl font-bold">한국 인기 서비스 상태 모니터</h1>
        <p className="text-slate-400 mt-1 text-sm">
          넷플릭스, 유튜브, 구글 검색, ChatGPT, Canva의 상태를 비공식으로 모니터링합니다.
        </p>
      </header>
      <main className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          {statuses.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onSelect={setSelectedId}
              isSelected={service.id === selectedId}
            />
          ))}
        </section>
        <section className="lg:col-span-1 border border-slate-800 rounded-xl p-5 bg-slate-900">
          {selectedService ? (
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-slate-400">현재 상태</p>
                  <h2 className="text-xl font-semibold">{selectedService.name}</h2>
                  <p className="text-slate-400 text-sm">{selectedService.category}</p>
                </div>
                <StatusBadge status={selectedService.status} />
              </div>
              <div className="bg-slate-800/60 rounded-lg p-4 space-y-2 text-sm">
                <p>
                  최근 지연시간:
                  <span className="ml-2 text-emerald-300">
                    {selectedService.lastLatency !== undefined
                      ? `${selectedService.lastLatency} ms`
                      : "-"}
                  </span>
                </p>
                <p>
                  최근 실패 비율:
                  <span className="ml-2 text-rose-300">
                    {(selectedService.failureRate * 100).toFixed(0)}%
                  </span>
                  <span className="ml-2 text-slate-400">
                    ({selectedService.totalChecks}회 / 최근 15분)
                  </span>
                </p>
                <p className="text-slate-400">
                  최근 체크 시간: {" "}
                  {selectedService.lastCheckedAt
                    ? new Date(selectedService.lastCheckedAt).toLocaleString()
                    : "데이터 없음"}
                </p>
              </div>
              <button
                onClick={handleInstantCheck}
                disabled={loading}
                className="w-full py-2 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 font-semibold"
              >
                {loading ? "확인 중..." : "지금 상태 다시 확인"}
              </button>
              <StatusChart logs={logs} />
              <p className="text-xs text-slate-500">
                본 페이지의 데이터는 비공식 모니터링 결과이며 참고용으로만 사용해 주세요.
              </p>
            </div>
          ) : (
            <p className="text-slate-400 text-sm">선택된 서비스가 없습니다.</p>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
