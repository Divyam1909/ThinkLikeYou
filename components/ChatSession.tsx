import React, { useState, useRef, useEffect } from 'react';
import { Persona, ChatMessage } from '../types';
import { chatWithPersona } from '../services/geminiService';

interface ChatSessionProps {
  persona: Persona;
  onBack: () => void;
}

const ChatSession: React.FC<ChatSessionProps> = ({ persona, onBack }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init',
      role: 'model',
      text: `Hello. I am ${persona.profile.name}. I'm ready to think through this with you.`,
      timestamp: Date.now(),
      confidence: 10
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await chatWithPersona(persona.profile, userMsg.text, messages);
      
      const modelMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: response.text,
        reflection: response.reflection,
        confidence: response.confidence,
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, modelMsg]);
    } catch (err) {
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: "I'm having trouble connecting to my thought process right now. Please check the API key or try again.",
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const getConfidenceColor = (score?: number) => {
    if (!score) return 'bg-slate-700';
    if (score >= 8) return 'bg-green-500/20 text-green-400 border-green-500/30';
    if (score >= 5) return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    return 'bg-red-500/20 text-red-400 border-red-500/30';
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
      {/* Header */}
      <div className="p-4 bg-slate-950 border-b border-slate-800 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <div>
            <h2 className="font-bold text-lg text-white">{persona.profile.name}</h2>
            <p className="text-xs text-indigo-400">{persona.profile.tagline}</p>
          </div>
        </div>
        <div className="flex gap-2">
           <span className="px-2 py-1 bg-slate-900 rounded border border-slate-700 text-xs text-slate-400">
             {persona.profile.riskTolerance} Risk
           </span>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] md:max-w-[75%] space-y-2`}>
              <div className={`p-4 rounded-2xl ${
                msg.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-br-none' 
                  : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-bl-none'
              }`}>
                <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
              </div>
              
              {/* Metadata Row for Model */}
              {msg.role === 'model' && (
                <div className="flex flex-wrap gap-2 items-start">
                   {/* Confidence Badge */}
                   {msg.confidence && (
                     <div className={`text-[10px] px-2 py-1 rounded border font-mono flex items-center gap-1 ${getConfidenceColor(msg.confidence)}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"/></svg>
                        Confidence: {msg.confidence}/10
                     </div>
                   )}
                   
                   {/* Reflection Card */}
                   {msg.reflection && (
                     <div className="flex-1 bg-slate-950/50 border-l-2 border-indigo-500 p-3 rounded-r-lg text-sm text-slate-400 animate-in fade-in slide-in-from-top-2">
                       <p className="font-semibold text-xs text-indigo-400 uppercase tracking-wider mb-1">
                         Thinking Process
                       </p>
                       <p className="italic leading-snug">{msg.reflection}</p>
                     </div>
                   )}
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-800 p-4 rounded-2xl rounded-bl-none border border-slate-700 flex items-center gap-2">
              <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce delay-75"></span>
              <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce delay-150"></span>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 bg-slate-950 border-t border-slate-800 shrink-0">
        <div className="relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Ask ${persona.profile.name} something...`}
            className="w-full bg-slate-900 text-white border border-slate-700 rounded-xl pl-4 pr-12 py-4 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none shadow-inner"
            rows={1}
            style={{ minHeight: '60px' }}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="absolute right-3 bottom-3 p-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-lg transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
          </button>
        </div>
        <p className="text-center text-xs text-slate-600 mt-2">
          AI may display inaccurate info. Always use your own judgment.
        </p>
      </div>
    </div>
  );
};

export default ChatSession;
