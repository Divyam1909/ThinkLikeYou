import React from 'react';
import { ViewState } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentView, setView }) => {
  const navItems = [
    { label: 'Home', view: ViewState.HOME },
    { label: 'My Personas', view: ViewState.DASHBOARD },
    { label: 'Gallery', view: ViewState.GALLERY },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden bg-slate-800 p-4 flex justify-between items-center border-b border-slate-700 sticky top-0 z-50">
        <h1 className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
          ThinkLikeYou
        </h1>
        <div className="flex gap-2">
           {/* Simple mobile nav implementation */}
           <button 
             onClick={() => setView(ViewState.DASHBOARD)}
             className="text-xs px-3 py-1 rounded bg-slate-700"
           >
             Menu
           </button>
        </div>
      </div>

      {/* Sidebar Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-950 border-r border-slate-800 p-6 sticky top-0 h-screen">
        <div className="mb-10">
          <h1 
            onClick={() => setView(ViewState.HOME)}
            className="text-2xl font-extrabold cursor-pointer bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400 tracking-tight"
          >
            ThinkLikeYou
          </h1>
          <p className="text-slate-500 text-xs mt-2">Personalized AI Decision Maker</p>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setView(item.view)}
              className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                currentView === item.view 
                  ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-600/20' 
                  : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-4 mt-4 border-t border-slate-800">
            <button
               onClick={() => setView(ViewState.QUESTIONNAIRE)}
               className="w-full text-center px-4 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-colors shadow-lg shadow-indigo-900/20"
            >
              + New Persona
            </button>
          </div>
        </nav>

        <div className="mt-auto pt-6 text-xs text-slate-600">
          <p>Privacy First.</p>
          <p>Answers never leave your device.</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto h-[calc(100vh-60px)] md:h-screen p-4 md:p-8">
        <div className="max-w-4xl mx-auto h-full">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 w-full bg-slate-950 border-t border-slate-800 flex justify-around p-3 z-50">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => setView(item.view)}
            className={`text-xs font-medium px-4 py-2 rounded-lg ${
              currentView === item.view ? 'text-indigo-400 bg-indigo-900/20' : 'text-slate-500'
            }`}
          >
            {item.label}
          </button>
        ))}
        <button
          onClick={() => setView(ViewState.QUESTIONNAIRE)}
          className="text-xs font-bold px-4 py-2 rounded-lg bg-indigo-600 text-white"
        >
          New
        </button>
      </div>
    </div>
  );
};

export default Layout;
