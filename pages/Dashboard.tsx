
import React from 'react';
import { MOCK_INCIDENTS } from '../constants';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CHART_DATA = [
  { time: '00:00', val: 20 },
  { time: '04:00', val: 15 },
  { time: '08:00', val: 45 },
  { time: '12:00', val: 38 },
  { time: '16:00', val: 65 },
  { time: '20:00', val: 42 },
  { time: '23:59', val: 55 },
];

interface DashboardProps {
  onOpenIncident: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onOpenIncident }) => {
  return (
    <div className="p-4 md:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <header className="flex justify-between items-center">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Painel Operacional</p>
            <span className="bg-success/20 text-success text-[10px] font-black px-1.5 py-0.5 rounded border border-success/20 animate-pulse">LIVE</span>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Visão Geral</h1>
        </div>
        <div className="flex gap-4">
          <div className="hidden md:flex -space-x-3">
            {[1, 2, 3].map(i => (
              <img key={i} src={`https://picsum.photos/100/100?random=${i}`} className="h-10 w-10 rounded-full border-2 border-background-dark ring-2 ring-white/5" alt="user" />
            ))}
            <div className="h-10 w-10 rounded-full bg-surface-dark border-2 border-background-dark flex items-center justify-center text-[10px] font-bold text-gray-400">+14</div>
          </div>
          <button className="h-10 w-10 rounded-full bg-surface-dark flex items-center justify-center text-white border border-white/5">
            <span className="material-symbols-outlined text-2xl">search</span>
          </button>
        </div>
      </header>

      {/* Filters */}
      <div className="flex gap-3 overflow-x-auto no-scrollbar py-2">
        <button className="flex-shrink-0 bg-primary px-6 py-2.5 rounded-full text-white text-sm font-bold shadow-lg shadow-primary/20 flex items-center gap-2">
          Hoje <span className="material-symbols-outlined text-base">keyboard_arrow_down</span>
        </button>
        <button className="flex-shrink-0 bg-surface-dark px-6 py-2.5 rounded-full text-gray-300 text-sm font-bold border border-white/5 flex items-center gap-2">
          Rede: Todas <span className="material-symbols-outlined text-base">keyboard_arrow_down</span>
        </button>
        <button className="flex-shrink-0 bg-surface-dark px-6 py-2.5 rounded-full text-gray-300 text-sm font-bold border border-white/5 flex items-center gap-2">
          Status: Pendentes <span className="material-symbols-outlined text-base">keyboard_arrow_down</span>
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8 bg-surface-dark rounded-3xl p-8 border border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
            <span className="material-symbols-outlined text-[120px] text-white">analytics</span>
          </div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-bold text-gray-400">Total Ocorrências</p>
              <span className="bg-success/10 text-success text-xs font-bold px-3 py-1 rounded-full">+5.2% vs ontem</span>
            </div>
            <div className="flex items-baseline gap-4">
              <span className="text-6xl font-black text-white tracking-tighter">1,240</span>
              <span className="text-sm text-gray-500 font-medium">Atualizado há 2 min</span>
            </div>
          </div>
        </div>
        <div className="col-span-6 lg:col-span-2 bg-surface-dark rounded-3xl p-6 border border-white/5">
          <div className="flex items-center gap-2 mb-4">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse"></span>
            <p className="text-sm font-bold text-gray-400">Pendentes</p>
          </div>
          <p className="text-4xl font-black text-primary">45</p>
          <p className="text-xs text-gray-500 mt-2">+12% vs ontem</p>
        </div>
        <div className="col-span-6 lg:col-span-2 bg-surface-dark rounded-3xl p-6 border border-white/5">
          <div className="flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-success text-base filled">check_circle</span>
            <p className="text-sm font-bold text-gray-400">Tratadas</p>
          </div>
          <p className="text-4xl font-black text-white">1,195</p>
          <p className="text-xs text-gray-500 mt-2">96% eficiência</p>
        </div>
      </div>

      {/* Charts & Technology */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-7 bg-surface-dark rounded-3xl p-8 border border-white/5">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-white">Evolução Temporal</h2>
            <div className="bg-background-dark p-1 rounded-xl flex gap-1">
              <button className="px-4 py-1.5 rounded-lg bg-surface-dark text-white text-xs font-bold shadow-lg">24h</button>
              <button className="px-4 py-1.5 rounded-lg text-gray-500 text-xs font-bold">7d</button>
              <button className="px-4 py-1.5 rounded-lg text-gray-500 text-xs font-bold">30d</button>
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={CHART_DATA}>
                <defs>
                  <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#e0062e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#e0062e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
                <XAxis dataKey="time" stroke="#666" fontSize={10} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1E1E1E', border: '1px solid #333', borderRadius: '12px' }}
                  itemStyle={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="val" stroke="#e0062e" strokeWidth={3} fillOpacity={1} fill="url(#colorVal)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-5 bg-surface-dark rounded-3xl p-8 border border-white/5">
          <h2 className="text-xl font-bold text-white mb-8">Por Tecnologia</h2>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm font-bold mb-2">
                <span className="text-gray-400">HFC (Coaxial)</span>
                <span className="text-white">62%</span>
              </div>
              <div className="h-2.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full shadow-lg shadow-primary/40" style={{ width: '62%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm font-bold mb-2">
                <span className="text-gray-400">FTTH (Fibra)</span>
                <span className="text-white">28%</span>
              </div>
              <div className="h-2.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 rounded-full" style={{ width: '28%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm font-bold mb-2">
                <span className="text-gray-400">5G Standalone</span>
                <span className="text-white">10%</span>
              </div>
              <div className="h-2.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '10%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Alerts */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Alertas Recentes</h2>
          <button className="text-sm font-bold text-primary">Ver todos</button>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {MOCK_INCIDENTS.map((inc) => (
            <div 
              key={inc.id}
              onClick={onOpenIncident}
              className={`flex flex-col gap-4 bg-surface-dark p-6 rounded-3xl border border-white/5 hover:border-primary/30 transition-all cursor-pointer border-l-4 ${inc.status === 'critical' ? 'border-l-primary' : 'border-l-warning'}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <div className={`p-2 rounded-2xl ${inc.status === 'critical' ? 'bg-primary/10 text-primary' : 'bg-warning/10 text-warning'}`}>
                    <span className="material-symbols-outlined">{inc.status === 'critical' ? 'warning' : 'bolt'}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-white">{inc.title}</h3>
                    <p className="text-xs text-gray-500 font-medium">{inc.location}</p>
                    <p className={`text-[10px] font-black uppercase mt-2 tracking-widest ${inc.status === 'critical' ? 'text-primary' : 'text-warning'}`}>
                      {inc.time} • {inc.status === 'critical' ? 'Crítico' : 'Pendente'}
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-2">
                <button className="flex items-center justify-center gap-2 bg-white/5 py-3 rounded-2xl text-xs font-bold text-gray-300 hover:bg-white/10 transition-colors">
                  <span className="material-symbols-outlined text-base">visibility</span>
                  Detalhes
                </button>
                <button className="flex items-center justify-center gap-2 bg-success/10 py-3 rounded-2xl text-xs font-bold text-success hover:bg-success/20 transition-colors">
                  <span className="material-symbols-outlined text-base">chat</span>
                  WhatsApp
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
