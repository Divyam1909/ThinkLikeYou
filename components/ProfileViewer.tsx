import React from 'react';
import { Persona } from '../types';

interface ProfileViewerProps {
  persona: Persona;
  onBack: () => void;
  onChat: () => void;
}

const ProfileViewer: React.FC<ProfileViewerProps> = ({ persona, onBack, onChat }) => {
  const { profile } = persona;

  return (
    <div className="max-w-3xl mx-auto py-6">
      <button 
        onClick={onBack} 
        className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        Back to Dashboard
      </button>

      <div className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-indigo-900 to-slate-900 p-8 border-b border-slate-700">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{profile.name}</h1>
              <p className="text-indigo-300 font-medium text-lg italic">"{profile.tagline}"</p>
            </div>
            <div className="bg-slate-900/50 backdrop-blur border border-white/10 px-4 py-2 rounded-lg text-center">
              <span className="block text-xs text-slate-400 uppercase tracking-wider">Risk Level</span>
              <span className={`font-bold ${
                profile.riskTolerance === 'High' ? 'text-red-400' : 
                profile.riskTolerance === 'Low' ? 'text-green-400' : 'text-yellow-400'
              }`}>
                {profile.riskTolerance}
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 space-y-8">
          
          {/* Traits */}
          <section>
            <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">Personality Traits</h3>
            <div className="flex flex-wrap gap-3">
              {profile.traits.map((trait, i) => (
                <span key={i} className="px-4 py-2 bg-slate-900 border border-slate-700 rounded-full text-slate-200">
                  {trait}
                </span>
              ))}
            </div>
          </section>

          {/* Values */}
          <section>
             <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">Core Values</h3>
             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
               {profile.coreValues.map((value, i) => (
                 <div key={i} className="bg-indigo-900/10 border border-indigo-500/20 p-4 rounded-xl text-center">
                   <span className="text-indigo-300 font-medium">{value}</span>
                 </div>
               ))}
             </div>
          </section>

          {/* Decision Rules */}
          <section>
            <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">Decision Making Rules</h3>
            <ul className="space-y-3">
              {profile.decisionMakingRules.map((rule, i) => (
                <li key={i} className="flex gap-4 items-start bg-slate-900/50 p-4 rounded-xl">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold mt-0.5">{i + 1}</span>
                  <p className="text-slate-300 leading-relaxed">{rule}</p>
                </li>
              ))}
            </ul>
          </section>

           {/* Communication Style */}
           <section>
            <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">Communication Style</h3>
            <div className="bg-slate-900/30 p-6 rounded-xl border border-slate-700/50 italic text-slate-400">
              {profile.communicationStyle}
            </div>
          </section>

          <div className="pt-8 flex gap-4">
            <button 
              onClick={onChat}
              className="flex-1 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold shadow-lg shadow-indigo-900/20 transition-all hover:scale-[1.02]"
            >
              Talk to {profile.name}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileViewer;
