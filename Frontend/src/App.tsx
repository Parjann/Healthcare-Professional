import React from 'react';
import InteractionForm from './components/InteractionForm';
import AiChat from './components/AiChat';
import { Activity } from 'lucide-react';

const App: React.FC = () => {
  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-sans text-slate-100">
      <div className="max-w-7xl mx-auto h-full flex flex-col">
        
        <header className="mb-8 text-center sm:text-left flex items-center justify-between shrink-0 animate-fade-in">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Activity className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight gradient-text">HCP Nexus</h1>
              <p className="mt-1 text-slate-400 font-medium">Intelligent CRM Platform</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-indigo-500/30">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
            <span className="text-sm font-semibold text-indigo-200">AI Active</span>
          </div>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-140px)] min-h-[600px] animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="h-full min-h-0">
            <InteractionForm />
          </div>
          <div className="h-full min-h-0">
            <AiChat />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
