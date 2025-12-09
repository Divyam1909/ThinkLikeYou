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
    <div className="max-w-3xl mx-auto py-2 md:py-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button 
        onClick={onBack} 
        className="flex items-center gap-2 text-slate-400 hover:text-white mb-4 md:mb-6 transition-colors text-sm md:text-base"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        Back to Dashboard
      </button>

      <div className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-indigo-900 to-slate-900 p-6 md:p-8 border-b border-slate-700">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{profile.name}</h1>
              <p className="text-indigo-300 font-medium text-base md:text-lg italic">"{profile.tagline}"</p>
            </div>
            <div className="bg-slate-900/50 backdrop-blur border border-white/10 px-4 py-2 rounded-lg text-center self-start md:self-auto">
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
        <div className="p-6 md:p-8 space-y-8">
          
          {/* Traits */}
          <section>
            <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500"></span> Personality Traits
            </h3>
            <div className="flex flex-wrap gap-3">
              {profile.traits.map((trait, i) => (
                <span key={i} className="px-4 py-2 bg-slate-900 border border-slate-700 rounded-full text-slate-200 text-sm md:text-base shadow-sm">
                  {trait}
                </span>
              ))}
            </div>
          </section>

          {/* Micro Behaviors & Quirks (New) */}
          {(profile.microBehaviors || profile.commonPhrases) && (
             <section className="grid md:grid-cols-2 gap-6">
               {profile.microBehaviors && profile.microBehaviors.length > 0 && (
                 <div>
                    <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-pink-500"></span> Habits & Triggers
                    </h3>
                    <ul className="space-y-2">
                      {profile.microBehaviors.map((habit, i) => (
                        <li key={i} className="text-slate-300 text-sm flex gap-2 items-start">
                          <span className="text-pink-500/50 mt-1">›</span> {habit}
                        </li>
                      ))}
                    </ul>
                 </div>
               )}
               {profile.commonPhrases && profile.commonPhrases.length > 0 && (
                  <div>
                    <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-cyan-500"></span> Signature Phrases
                    </h3>
                    <ul className="space-y-2">
                      {profile.commonPhrases.map((phrase, i) => (
                        <li key={i} className="text-slate-300 text-sm italic border-l-2 border-cyan-500/30 pl-3">
                          "{phrase}"
                        </li>
                      ))}
                    </ul>
                  </div>
               )}
             </section>
          )}

          {/* Values */}
          <section>
             <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Core Values
             </h3>
             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
               {profile.coreValues.map((value, i) => (
                 <div key={i} className="bg-slate-900/50 border border-slate-700/50 p-4 rounded-xl text-center hover:border-emerald-500/30 transition-colors">
                   <span className="text-emerald-300/90 font-medium">{value}</span>
                 </div>
               ))}
             </div>
          </section>

          {/* Decision Rules */}
          <section>
            <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span> Operating System
            </h3>
            <ul className="space-y-3">
              {profile.decisionMakingRules.map((rule, i) => (
                <li key={i} className="flex gap-4 items-start bg-slate-900 p-4 rounded-xl border border-slate-800">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-800 text-slate-400 border border-slate-600 flex items-center justify-center text-xs font-bold mt-0.5">{i + 1}</span>
                  <p className="text-slate-300 leading-relaxed text-sm md:text-base">{rule}</p>
                </li>
              ))}
            </ul>
          </section>

           {/* Communication Style */}
           <section>
            <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">Voice Analysis</h3>
            <div className="bg-slate-900/30 p-6 rounded-xl border border-slate-700/50 text-slate-400 text-sm md:text-base leading-relaxed">
              <p className="mb-2"><strong className="text-indigo-400">Style:</strong> {profile.communicationStyle}</p>
              {profile.linguisticQuirks && <p><strong className="text-pink-400">Quirks:</strong> {profile.linguisticQuirks}</p>}
            </div>
          </section>

          <div className="pt-4 md:pt-8 flex gap-4">
            <button 
              onClick={onChat}
              className="flex-1 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold shadow-lg shadow-indigo-900/20 transition-all hover:scale-[1.02]"
            >
              Start Chat Session
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileViewer;