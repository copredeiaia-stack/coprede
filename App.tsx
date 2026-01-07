import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
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
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) setCurrentView('dashboard');
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        setCurrentView('dashboard');
      } else {
        setCurrentView('login');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (loading) {
    return (
      <div className="h-screen bg-background-dark flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!session) {
    return <Login onLogin={() => setCurrentView('dashboard')} />;
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
