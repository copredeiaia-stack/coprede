
import React from 'react';
import { MOCK_USERS } from '../constants';

export const UserManagement: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-8">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white tracking-tight">Gerenciamento de Acesso</h1>
        <button className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center border border-primary/20 hover:bg-primary/20 transition-all">
          <span className="material-symbols-outlined">add</span>
        </button>
      </header>

      {/* Search */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
          <span className="material-symbols-outlined text-gray-500">search</span>
        </div>
        <input 
          type="text" 
          placeholder="Buscar por nome, e-mail ou matrícula"
          className="w-full bg-surface-dark border-white/5 rounded-2xl pl-14 pr-4 py-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all shadow-lg"
        />
      </div>

      {/* Filters */}
      <div className="flex gap-3 overflow-x-auto no-scrollbar py-2">
        <button className="flex-shrink-0 bg-primary px-6 py-2.5 rounded-full text-white text-sm font-bold shadow-lg shadow-primary/20 flex items-center gap-2">
          <span className="material-symbols-outlined text-base">group</span> Todos
        </button>
        <button className="flex-shrink-0 bg-surface-dark px-6 py-2.5 rounded-full text-gray-300 text-sm font-bold border border-white/5 flex items-center gap-2">
          <span className="material-symbols-outlined text-base">check_circle</span> Ativos
        </button>
        <button className="flex-shrink-0 bg-surface-dark px-6 py-2.5 rounded-full text-gray-300 text-sm font-bold border border-white/5 flex items-center gap-2">
          <span className="material-symbols-outlined text-base">cancel</span> Inativos
        </button>
        <button className="flex-shrink-0 bg-surface-dark px-6 py-2.5 rounded-full text-gray-300 text-sm font-bold border border-white/5 flex items-center gap-2">
          <span className="material-symbols-outlined text-base">security</span> Admin
        </button>
      </div>

      <div className="space-y-6">
        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest px-2">Usuários Recentes ({MOCK_USERS.length})</p>
        <div className="bg-surface-dark rounded-3xl border border-white/5 overflow-hidden shadow-xl">
          {MOCK_USERS.map((user, idx) => (
            <div 
              key={user.id}
              className={`flex items-center justify-between p-4 md:p-6 hover:bg-white/5 transition-colors cursor-pointer group ${idx !== MOCK_USERS.length - 1 ? 'border-b border-white/5' : ''} ${user.status === 'inactive' ? 'opacity-60 grayscale' : ''}`}
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                  {user.avatar ? (
                    <img src={user.avatar} className="h-12 w-12 rounded-2xl object-cover shadow-lg" alt={user.name} />
                  ) : (
                    <div className="h-12 w-12 rounded-2xl bg-primary/20 text-primary font-black flex items-center justify-center text-lg">{user.initials}</div>
                  )}
                  <div className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-surface-dark ${user.status === 'active' ? 'bg-success' : 'bg-gray-500'}`} />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-white truncate">{user.name}</p>
                    {user.role === 'Supervisor N2' && (
                      <span className="bg-blue-500/10 text-blue-400 text-[9px] font-black px-1.5 py-0.5 rounded border border-blue-500/20 uppercase tracking-tighter">Admin</span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 font-medium truncate">{user.role} • {user.email}</p>
                </div>
              </div>
              <button className="h-10 w-10 rounded-full hover:bg-white/10 flex items-center justify-center text-gray-400 group-hover:text-white transition-colors">
                <span className="material-symbols-outlined">more_vert</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-24 md:bottom-8 right-6 md:right-12 z-40">
        <button className="h-14 w-14 md:h-16 md:w-16 rounded-3xl bg-primary shadow-2xl shadow-primary/40 hover:bg-primary-dark transition-transform active:scale-90 flex items-center justify-center">
          <span className="material-symbols-outlined text-white text-3xl">person_add</span>
        </button>
      </div>
    </div>
  );
};
