
import React, { useEffect, useState } from 'react';
import { fetchNewMonitor, fetchSGO } from '../apiService';

interface MonitorRow {
    id: string;
    source: 'NewMonitor' | 'SGO';
    title: string;
    location: string;
    status: string;
    time: string;
}

interface MonitorTableProps {
    onSelect?: (incident: MonitorRow) => void;
}

export const MonitorTable: React.FC<MonitorTableProps> = ({ onSelect }) => {
    const [data, setData] = useState<MonitorRow[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            const isInitial = data.length === 0;
            if (isInitial) setLoading(true);
            try {
                const [newMonitorData, sgoData] = await Promise.all([
                    fetchNewMonitor(),
                    fetchSGO()
                ]);

                // Normalizing NewMonitor data (Assuming array structure based on user request)
                const normalizedNewMonitor = (Array.isArray(newMonitorData) ? newMonitorData : []).map((item: any) => ({
                    id: item.id || Math.random().toString(36).substr(2, 9),
                    source: 'NewMonitor' as const,
                    title: item.evento || item.descricao || 'Alerta NewMonitor',
                    location: item.cidade || item.uf || 'Brasil',
                    status: item.status || 'Pendente',
                    time: item.data || new Date().toLocaleTimeString()
                }));

                // Normalizing SGO data
                const normalizedSGO = (Array.isArray(sgoData) ? sgoData : []).map((item: any) => ({
                    id: item.protocolo || Math.random().toString(36).substr(2, 9),
                    source: 'SGO' as const,
                    title: item.incidente || 'Incidente SGO',
                    location: item.localidade || 'N/A',
                    status: item.estado || 'Aberto',
                    time: item.hora || new Date().toLocaleTimeString()
                }));

                setData([...normalizedNewMonitor, ...normalizedSGO]);
            } catch (error) {
                console.error('Error fetching monitor data:', error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
        const interval = setInterval(loadData, 300000); // 5 min
        return () => clearInterval(interval);
    }, []);

    if (loading && data.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-12 space-y-4 bg-surface-dark rounded-3xl border border-white/5 animate-pulse">
                <div className="h-2 w-48 bg-white/10 rounded-full" />
                <div className="h-2 w-32 bg-white/5 rounded-full" />
            </div>
        );
    }

    return (
        <div className="bg-surface-dark rounded-3xl border border-white/5 overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-white/5 bg-background-dark/50">
                            <th className="p-4 text-[10px] font-black uppercase text-gray-500 tracking-widest">Origem</th>
                            <th className="p-4 text-[10px] font-black uppercase text-gray-500 tracking-widest">Incidente</th>
                            <th className="p-4 text-[10px] font-black uppercase text-gray-500 tracking-widest">Localidade</th>
                            <th className="p-4 text-[10px] font-black uppercase text-gray-500 tracking-widest">Tempo</th>
                            <th className="p-4 text-[10px] font-black uppercase text-gray-500 tracking-widest text-right">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {data.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="p-8 text-center text-sm text-gray-500 font-medium">
                                    Nenhuma ocorrência ativa encontrada.
                                </td>
                            </tr>
                        ) : (
                            data.map((row) => (
                                <tr
                                    key={row.id}
                                    onClick={() => onSelect?.(row)}
                                    className="hover:bg-white/[0.04] transition-all group cursor-pointer active:bg-white/10"
                                >
                                    <td className="p-4">
                                        <span className={`text-[9px] font-black px-2 py-0.5 rounded border uppercase tracking-tighter ${row.source === 'NewMonitor'
                                            ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                                            : 'bg-orange-500/10 text-orange-400 border-orange-500/20'
                                            }`}>
                                            {row.source}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <p className="text-xs font-bold text-white group-hover:text-primary transition-colors truncate max-w-[200px]">
                                            {row.title}
                                        </p>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
                                            <span className="material-symbols-outlined text-[14px]">location_on</span>
                                            {row.location}
                                        </div>
                                    </td>
                                    <td className="p-4 text-xs text-gray-500 font-mono">
                                        {row.time}
                                    </td>
                                    <td className="p-4 text-right">
                                        <span className="inline-flex h-2 w-2 rounded-full bg-success animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <div className="p-3 bg-background-dark/30 border-t border-white/5 flex justify-between items-center">
                <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest">Atualizado a cada 5m</span>
                <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest underline cursor-pointer hover:text-white">Ver logs completos</span>
            </div>
        </div>
    );
};
