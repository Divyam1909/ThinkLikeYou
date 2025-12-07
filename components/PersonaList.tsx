import React from 'react';
import { Persona } from '../types';

interface PersonaListProps {
  personas: Persona[];
  onSelect: (persona: Persona) => void;
  onViewProfile?: (persona: Persona) => void;
  onDelete?: (id: string) => void; // Optional, gallery won't have delete
  onExport?: (persona: Persona) => void;
  title: string;
  emptyMessage: string;
}

const PersonaList: React.FC<PersonaListProps> = ({ 
  personas, 
  onSelect, 
  onViewProfile,
  onDelete, 
  onExport,
  title, 
  emptyMessage 
}) => {
  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-6 text-white border-l-4 border-indigo-500 pl-4">{title}</h2>
      
      {personas.length === 0 ? (
        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-12 text-center">
          <p className="text-slate-400 text-lg">{emptyMessage}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {personas.map((persona) => (
            <div 
              key={persona.id} 
              className="group bg-slate-800 border border-slate-700 hover:border-indigo-500/50 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1 relative flex flex-col h-full"
            >
              <div className="mb-4 cursor-pointer" onClick={() => onViewProfile ? onViewProfile(persona) : onSelect(persona)}>
                <div className="flex justify-between items-start mb-2">
                   <h3 className="font-bold text-xl text-white group-hover:text-indigo-400 transition-colors">
                    {persona.profile.name}
                  </h3>
                  {persona.isPublic && (
                    <span className="bg-slate-700 text-slate-300 text-[10px] px-2 py-1 rounded-full uppercase tracking-wider font-semibold">
                      Public
                    </span>
                  )}
                </div>
                <p className="text-slate-400 text-sm italic">{persona.profile.tagline}</p>
              </div>
              
              <div className="space-y-3 mb-6 flex-1 cursor-pointer" onClick={() => onViewProfile ? onViewProfile(persona) : onSelect(persona)}>
                <div className="flex flex-wrap gap-2">
                  {persona.profile.traits.slice(0, 3).map((trait, i) => (
                    <span key={i} className="text-xs bg-slate-900 border border-slate-700 text-slate-300 px-2 py-1 rounded">
                      {trait}
                    </span>
                  ))}
                </div>
                <div className="text-xs text-slate-500">
                  <span className="block mb-1 font-semibold text-slate-400">Core Values:</span>
                  {persona.profile.coreValues.join(', ')}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-700 flex gap-2">
                <button
                  onClick={() => onSelect(persona)}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold py-2 rounded-lg transition-colors"
                >
                  Chat
                </button>
                
                {onViewProfile && (
                   <button
                   onClick={() => onViewProfile(persona)}
                   className="p-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg transition-colors"
                   title="View Full Profile"
                 >
                   <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                 </button>
                )}

                {onExport && (
                  <button
                    onClick={(e) => { e.stopPropagation(); onExport(persona); }}
                    className="p-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg transition-colors"
                    title="Export JSON"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                  </button>
                )}

                {onDelete && !persona.isPublic && (
                   <button
                   onClick={(e) => { e.stopPropagation(); onDelete(persona.id); }}
                   className="p-2 bg-red-900/20 hover:bg-red-900/40 text-red-400 border border-red-900/30 rounded-lg transition-colors"
                   title="Delete"
                 >
                   <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                 </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PersonaList;
