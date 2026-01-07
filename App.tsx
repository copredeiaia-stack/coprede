
import React, { useState, useEffect } from 'react';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { IncidentDetail } from './pages/IncidentDetail';
import { UserManagement } from './pages/UserManagement';
import { Alerts } from './pages/Alerts';
import { Reports } from './pages/Reports';
import { Navigation } from './components/Navigation';

type View = 'login' | 'dashboard' | 'incident' | 'users' | 'alerts' | 'reports';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView('login');
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="flex flex-col md:flex-row h-screen bg-background-dark overflow-hidden">
      {/* Sidebar / Bottom Nav Wrapper */}
      <Navigation currentView={currentView} setView={setCurrentView} onLogout={handleLogout} />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto no-scrollbar pb-20 md:pb-0">
        {currentView === 'dashboard' && <Dashboard onOpenIncident={() => setCurrentView('incident')} />}
        {currentView === 'incident' && <IncidentDetail onBack={() => setCurrentView('dashboard')} />}
        {currentView === 'users' && <UserManagement />}
        {currentView === 'alerts' && <Alerts />}
        {currentView === 'reports' && <Reports />}
      </main>
    </div>
  );
};

export default App;
