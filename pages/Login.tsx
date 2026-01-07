
import React from 'react';

interface LoginProps {
  onLogin: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  return (
    <div className="min-h-screen bg-background-dark flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-surface-dark border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
        <div className="relative h-[240px] flex flex-col justify-end p-8">
          <div 
            className="absolute inset-0 bg-cover bg-center z-0" 
            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAuZ0LFsU2O-aaqnVh3AgctBbcg7FK_SjyhxYtibtw6-0YIx1BWIFloB08jL_6a0_Q9Mz0TKMNrftACy42I7wUFODg5bcLFM69tuSBOLYzXqSqFPHucum1o_XY8tMlttRLH7DR3BU5gNbrxWfFM64buPW4pl9TJo2TlagVbmBx_ogF1DCK0oXg13IN9DgxgPrsQs3BmAedlGY1ZPXrNoB9cbly0YNf-jr0Q59r-QE632ai9T4ClOCh-3Sr-_2IAZz5mGcu4G7YGczI")' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-dark via-surface-dark/40 to-black/20 z-10" />
          
          <div className="relative z-20">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 bg-primary rounded-full flex items-center justify-center shadow-xl shadow-primary/40">
                <span className="material-symbols-outlined text-white text-2xl">hub</span>
              </div>
              <span className="text-white font-bold text-2xl">COP Rede</span>
            </div>
            <h1 className="text-white text-3xl font-bold leading-tight">Acesso ao Dashboard</h1>
            <p className="text-white/60 text-sm mt-2 font-medium">Gestão de ocorrências em tempo real</p>
          </div>
        </div>

        <form className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-300">E-mail Corporativo</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-gray-500">mail</span>
              </div>
              <input 
                type="email" 
                placeholder="usuario@claro.com.br"
                className="w-full bg-[#1a0f10] border-white/5 rounded-2xl pl-12 pr-4 py-4 text-white placeholder-gray-600 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-gray-300">Senha</label>
              <button type="button" className="text-xs font-bold text-primary">Esqueceu a senha?</button>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-gray-500">lock</span>
              </div>
              <input 
                type="password" 
                placeholder="Digite sua senha"
                className="w-full bg-[#1a0f10] border-white/5 rounded-2xl pl-12 pr-12 py-4 text-white placeholder-gray-600 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
              />
              <button type="button" className="absolute inset-y-0 right-0 pr-4 flex items-center">
                <span className="material-symbols-outlined text-gray-500">visibility</span>
              </button>
            </div>
          </div>

          <button 
            type="button"
            onClick={onLogin}
            className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-2xl shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-3 group"
          >
            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">login</span>
            Acessar Sistema
          </button>

          <div className="relative flex items-center py-4">
            <div className="flex-grow border-t border-white/5"></div>
            <span className="flex-shrink mx-4 text-gray-500 text-xs font-semibold uppercase">Ou acesse com</span>
            <div className="flex-grow border-t border-white/5"></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button type="button" className="flex items-center justify-center gap-3 bg-white/5 border border-white/5 py-3 rounded-2xl text-sm font-bold text-gray-300 hover:bg-white/10 transition-colors">
              <span className="material-symbols-outlined text-primary">fingerprint</span>
              Touch ID
            </button>
            <button type="button" className="flex items-center justify-center gap-3 bg-white/5 border border-white/5 py-3 rounded-2xl text-sm font-bold text-gray-300 hover:bg-white/10 transition-colors">
              <span className="material-symbols-outlined text-primary">face</span>
              Face ID
            </button>
          </div>
        </form>

        <div className="p-8 text-center border-t border-white/5">
          <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">
            © 2024 COP REDE. V2.1.0 • SUPORTE RAMAL 1020
          </p>
        </div>
      </div>
    </div>
  );
};
