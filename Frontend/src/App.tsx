import React from 'react';
import InteractionForm from './components/InteractionForm';
import AiChat from './components/AiChat';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        <header className="mb-8 text-center sm:text-left flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">HCP CRM Platform</h1>
            <p className="mt-1 text-gray-500">Seamlessly log interactions using AI or manually.</p>
          </div>
          <div className="hidden sm:block">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              AI Powered
            </span>
          </div>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-140px)] min-h-[600px]">
          <div className="h-full">
            <InteractionForm />
          </div>
          <div className="h-full">
            <AiChat />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
