import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Questionnaire from './components/Questionnaire';
import ChatSession from './components/ChatSession';
import PersonaList from './components/PersonaList';
import ProfileViewer from './components/ProfileViewer';
import { ViewState, Persona, PersonaProfile, EncryptedPersonaData } from './types';
import { DEMO_PERSONAS } from './constants';

const STORAGE_KEY = 'thinklikeyou_personas_v1';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>(ViewState.HOME);
  const [myPersonas, setMyPersonas] = useState<Persona[]>([]);
  const [activePersona, setActivePersona] = useState<Persona | null>(null);

  // Load from local storage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setMyPersonas(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load personas", e);
      }
    }
  }, []);

  // Save to local storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(myPersonas));
  }, [myPersonas]);

  const handleCreatePersona = (profile: PersonaProfile) => {
    const newPersona: Persona = {
      id: Date.now().toString(),
      profile,
      createdAt: Date.now(),
      author: 'User',
      isPublic: false
    };
    setMyPersonas(prev => [newPersona, ...prev]);
    setView(ViewState.DASHBOARD);
  };

  const handleDeletePersona = (id: string) => {
    if (window.confirm("Are you sure you want to delete this persona? This cannot be undone.")) {
      setMyPersonas(prev => prev.filter(p => p.id !== id));
      if (activePersona?.id === id) {
        setActivePersona(null);
        setView(ViewState.DASHBOARD);
      }
    }
  };

  const handleSelectPersona = (persona: Persona) => {
    setActivePersona(persona);
    setView(ViewState.CHAT);
  };

  const handleViewProfile = (persona: Persona) => {
    setActivePersona(persona);
    setView(ViewState.PROFILE);
  };

  // --- ENCRYPTION LOGIC ---

  const getKeyMaterial = async (password: string) => {
    const enc = new TextEncoder();
    return window.crypto.subtle.importKey(
      "raw",
      enc.encode(password),
      { name: "PBKDF2" },
      false,
      ["deriveBits", "deriveKey"]
    );
  };

  const getKey = async (keyMaterial: CryptoKey, salt: Uint8Array) => {
    return window.crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt: salt as any, // Cast to any to avoid TS ArrayBuffer/SharedArrayBuffer mismatch
        iterations: 100000,
        hash: "SHA-256"
      },
      keyMaterial,
      { name: "AES-GCM", length: 256 },
      true,
      ["encrypt", "decrypt"]
    );
  };

  const encryptData = async (data: string, password: string): Promise<EncryptedPersonaData> => {
    const salt = window.crypto.getRandomValues(new Uint8Array(16));
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const keyMaterial = await getKeyMaterial(password);
    const key = await getKey(keyMaterial, salt);
    
    const enc = new TextEncoder();
    const encodedData = enc.encode(data);
    
    const encrypted = await window.crypto.subtle.encrypt(
      { name: "AES-GCM", iv: iv as any }, // Cast to any to avoid TS mismatch
      key,
      encodedData
    );

    // Convert buffers to base64 string for storage
    const b64Data = btoa(String.fromCharCode(...new Uint8Array(encrypted)));
    const b64Iv = btoa(String.fromCharCode(...iv));
    const b64Salt = btoa(String.fromCharCode(...salt));

    return {
      data: b64Data,
      iv: b64Iv,
      salt: b64Salt
    };
  };

  const decryptData = async (encryptedData: EncryptedPersonaData, password: string): Promise<string> => {
    try {
      const salt = new Uint8Array(atob(encryptedData.salt).split("").map(c => c.charCodeAt(0)));
      const iv = new Uint8Array(atob(encryptedData.iv).split("").map(c => c.charCodeAt(0)));
      const data = new Uint8Array(atob(encryptedData.data).split("").map(c => c.charCodeAt(0)));

      const keyMaterial = await getKeyMaterial(password);
      const key = await getKey(keyMaterial, salt);

      const decrypted = await window.crypto.subtle.decrypt(
        { name: "AES-GCM", iv: iv as any }, // Cast to any to avoid TS mismatch
        key,
        data
      );

      const dec = new TextDecoder();
      return dec.decode(decrypted);
    } catch (e) {
      throw new Error("Invalid password or corrupted data");
    }
  };

  // --- END ENCRYPTION LOGIC ---

  const handleExportPersona = async (persona: Persona) => {
    const password = prompt("Set a password to encrypt this file (Optional). Leave empty for no password.");
    
    const plainData = JSON.stringify(persona.profile);
    let exportContent = plainData;
    let isEncrypted = false;

    if (password) {
      try {
        const encrypted = await encryptData(plainData, password);
        exportContent = JSON.stringify({ ...encrypted, isEncrypted: true });
        isEncrypted = true;
      } catch (e) {
        alert("Encryption failed.");
        return;
      }
    }

    const blob = new Blob([exportContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${persona.profile.name.replace(/\s+/g, '_').toLowerCase()}${isEncrypted ? '_secure' : ''}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportPersona = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const text = e.target?.result as string;
        let json = JSON.parse(text);
        let profile: PersonaProfile;

        if (json.isEncrypted) {
          const password = prompt("This persona is encrypted. Please enter the password:");
          if (!password) {
             alert("Password required to import this persona.");
             return;
          }
          try {
            const decryptedString = await decryptData(json, password);
            profile = JSON.parse(decryptedString);
          } catch (err) {
            alert("Incorrect password or corrupted file.");
            return;
          }
        } else {
          // Backward compatibility or unencrypted
          // If the file is just the profile object (old export style)
          profile = json as PersonaProfile;
        }

        // Basic validation
        if (!profile.name || !profile.traits || !profile.decisionMakingRules) {
          throw new Error("Invalid persona file format");
        }

        const newPersona: Persona = {
          id: Date.now().toString(),
          profile,
          createdAt: Date.now(),
          author: 'Imported',
          isPublic: false
        };
        setMyPersonas(prev => [newPersona, ...prev]);
        setView(ViewState.DASHBOARD);
        alert("Persona imported successfully!");
      } catch (err) {
        console.error(err);
        alert("Failed to import persona. Invalid or corrupted JSON file.");
      }
    };
    reader.readAsText(file);
    // Reset input
    event.target.value = '';
  };

  const renderContent = () => {
    switch (view) {
      case ViewState.HOME:
        return (
          <div className="flex flex-col items-start justify-center min-h-full py-12 animate-in fade-in slide-in-from-bottom-4">
            <div className="bg-indigo-900/30 border border-indigo-500/30 text-indigo-200 px-4 py-1 rounded-full text-xs font-bold tracking-wide uppercase mb-6">
              Privacy-First AI
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
              Talk to your <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                Better Self.
              </span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed">
              Create an AI persona that thinks, decides, and reflects like you (or who you want to be). 
              Your raw data stays private. Only the decision-making model is generated.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => setView(ViewState.QUESTIONNAIRE)}
                className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-lg shadow-lg shadow-indigo-900/30 transition-all hover:scale-105"
              >
                Create My Persona
              </button>
              <button 
                onClick={() => setView(ViewState.GALLERY)}
                className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold text-lg border border-slate-700 transition-all"
              >
                Browse Gallery
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 w-full">
              <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700">
                <div className="w-10 h-10 bg-indigo-500/20 text-indigo-400 rounded-lg flex items-center justify-center mb-4 text-xl">🔒</div>
                <h3 className="font-bold text-white mb-2">Private & Secure</h3>
                <p className="text-sm text-slate-400">Questionnaire answers are never stored. Export profiles with password encryption for safety.</p>
              </div>
              <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700">
                <div className="w-10 h-10 bg-cyan-500/20 text-cyan-400 rounded-lg flex items-center justify-center mb-4 text-xl">🧠</div>
                <h3 className="font-bold text-white mb-2">Deep Reflection</h3>
                <p className="text-sm text-slate-400">The AI provides a confidence score and explains <i>why</i> it answered that way.</p>
              </div>
              <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700">
                <div className="w-10 h-10 bg-pink-500/20 text-pink-400 rounded-lg flex items-center justify-center mb-4 text-xl">🧬</div>
                <h3 className="font-bold text-white mb-2">Dual Modes</h3>
                <p className="text-sm text-slate-400">Choose Basic (5 min) or Advanced (12 min) questionnaires for higher precision.</p>
              </div>
            </div>
          </div>
        );
      
      case ViewState.QUESTIONNAIRE:
        return (
          <Questionnaire 
            onComplete={handleCreatePersona} 
            onCancel={() => setView(ViewState.HOME)} 
          />
        );

      case ViewState.DASHBOARD:
        return (
          <div className="animate-in fade-in duration-300">
            <div className="flex justify-end mb-6">
               <label className="cursor-pointer px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 text-sm font-medium flex items-center gap-2 transition-colors">
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
                 Import Persona JSON
                 <input type="file" accept=".json" className="hidden" onChange={handleImportPersona} />
               </label>
            </div>
            <PersonaList 
              personas={myPersonas}
              title="My Personas"
              emptyMessage="You haven't created any personas yet. Start the questionnaire to build one!"
              onSelect={handleSelectPersona}
              onViewProfile={handleViewProfile}
              onDelete={handleDeletePersona}
              onExport={handleExportPersona}
            />
          </div>
        );
      
      case ViewState.PROFILE:
        if (!activePersona) return <div onClick={() => setView(ViewState.DASHBOARD)}>Error: No persona selected</div>;
        return (
          <ProfileViewer 
            persona={activePersona}
            onBack={() => setView(ViewState.DASHBOARD)}
            onChat={() => setView(ViewState.CHAT)}
          />
        );

      case ViewState.GALLERY:
        return (
          <div className="animate-in fade-in duration-300">
             <div className="mb-6 bg-indigo-900/20 border border-indigo-500/20 p-4 rounded-xl flex items-start gap-3">
               <div className="text-indigo-400 mt-1">
                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="16" y2="12"/><line x1="12" x2="12.01" y1="8" y2="8"/></svg>
               </div>
               <p className="text-indigo-200 text-sm">
                 These are simulated public personas. You can chat with them to see how different decision-making styles react to the same questions.
               </p>
             </div>
            <PersonaList 
              personas={DEMO_PERSONAS}
              title="Community Gallery"
              emptyMessage="No public personas available."
              onSelect={handleSelectPersona}
              onViewProfile={handleViewProfile}
              onExport={handleExportPersona}
            />
          </div>
        );

      case ViewState.CHAT:
        if (!activePersona) return <div onClick={() => setView(ViewState.DASHBOARD)}>Error: No persona selected</div>;
        return (
          <ChatSession 
            persona={activePersona} 
            onBack={() => setView(ViewState.DASHBOARD)} 
          />
        );

      default:
        return <div>View not found</div>;
    }
  };

  return (
    <Layout currentView={view} setView={setView}>
      {renderContent()}
    </Layout>
  );
};

export default App;