import React, { useState } from 'react';
import { QUESTIONS } from '../constants';
import { Answer, PersonaProfile } from '../types';
import { generatePersonaFromAnswers } from '../services/geminiService';

interface QuestionnaireProps {
  onComplete: (profile: PersonaProfile) => void;
  onCancel: () => void;
}

type Mode = 'CONSENT' | 'SELECT_MODE' | 'QUESTIONS';

const Questionnaire: React.FC<QuestionnaireProps> = ({ onComplete, onCancel }) => {
  const [step, setStep] = useState<Mode>('CONSENT');
  const [questionMode, setQuestionMode] = useState<'BASIC' | 'ADVANCED'>('BASIC');
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Filter questions based on mode
  const targetQuestions = questionMode === 'BASIC' ? QUESTIONS.slice(0, 20) : QUESTIONS;
  const currentQuestion = targetQuestions[currentQIndex];

  const handleConsent = () => {
    setStep('SELECT_MODE');
  };

  const startQuestions = (mode: 'BASIC' | 'ADVANCED') => {
    setQuestionMode(mode);
    setStep('QUESTIONS');
    setCurrentQIndex(0);
  };

  const handleAnswer = (value: string | number) => {
    const newAnswers = [...answers.filter(a => a.questionId !== currentQuestion.id), { questionId: currentQuestion.id, answer: value }];
    setAnswers(newAnswers);
  };

  const getCurrentAnswer = () => {
    return answers.find(a => a.questionId === currentQuestion.id)?.answer;
  };

  const handleNext = async () => {
    if (currentQIndex < targetQuestions.length - 1) {
      setCurrentQIndex(prev => prev + 1);
    } else {
      await finish();
    }
  };

  const handleBack = () => {
    if (currentQIndex > 0) {
      setCurrentQIndex(prev => prev - 1);
    }
  };

  const finish = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      const profile = await generatePersonaFromAnswers(answers);
      onComplete(profile);
    } catch (err) {
      setError("Failed to generate persona. Please check your API key and try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  if (isGenerating) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8 animate-in fade-in duration-500">
        <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-6"></div>
        <h2 className="text-2xl font-bold mb-2">Synthesizing Your Mindset...</h2>
        <p className="text-slate-400 max-w-md">
          The AI is analyzing your answers to extract decision-making patterns, values, and tone. 
          Your raw answers will be discarded immediately after this process.
        </p>
      </div>
    );
  }

  // --- STEP 1: CONSENT ---
  if (step === 'CONSENT') {
    return (
      <div className="max-w-xl mx-auto py-10">
        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 shadow-xl backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-white mb-6">Privacy & Consent</h2>
          <div className="space-y-4 text-slate-300 text-sm leading-relaxed mb-8">
            <p>
              Before we begin, please understand how ThinkLikeYou works:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-indigo-400">Local Processing:</strong> Your specific answers to the questionnaire are processed in memory and are NOT saved to any database.
              </li>
              <li>
                <strong className="text-indigo-400">Abstraction:</strong> We only generate and store an abstract "Persona Profile" (traits, values, rules) which contains no personally identifiable information (PII).
              </li>
              <li>
                <strong className="text-indigo-400">Control:</strong> You own your persona. You can delete it or export it at any time.
              </li>
            </ul>
            <p className="mt-4 bg-indigo-900/20 p-4 rounded-lg border border-indigo-500/30">
              By continuing, you agree to answer honestly to create the most accurate model of your thinking style.
            </p>
          </div>
          <div className="flex justify-end gap-4">
            <button onClick={onCancel} className="px-6 py-2 rounded-lg text-slate-400 hover:text-white">Cancel</button>
            <button onClick={handleConsent} className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold shadow-lg">
              I Agree & Continue
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- STEP 2: MODE SELECTION ---
  if (step === 'SELECT_MODE') {
    return (
      <div className="max-w-4xl mx-auto py-10">
        <h2 className="text-3xl font-bold text-white text-center mb-10">Select Depth Level</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Basic Card */}
          <div className="bg-slate-800 border border-slate-700 hover:border-indigo-500 rounded-2xl p-8 flex flex-col transition-all cursor-pointer hover:shadow-2xl hover:shadow-indigo-500/10" onClick={() => startQuestions('BASIC')}>
            <div className="w-12 h-12 bg-indigo-500/20 text-indigo-400 rounded-lg flex items-center justify-center mb-4 text-2xl">⚡</div>
            <h3 className="text-xl font-bold text-white mb-2">Basic Profile</h3>
            <p className="text-slate-400 mb-6 flex-1">
              A quick 20-question scan of your core values and communication style. Good for a general impression.
            </p>
            <div className="text-sm font-mono text-slate-500 mb-6">~ 5 Minutes</div>
            <button className="w-full py-3 bg-slate-700 hover:bg-indigo-600 text-white rounded-xl font-semibold transition-colors">
              Start Basic
            </button>
          </div>

          {/* Advanced Card */}
          <div className="bg-slate-800 border border-indigo-500/50 hover:border-indigo-400 rounded-2xl p-8 flex flex-col transition-all cursor-pointer hover:shadow-2xl hover:shadow-indigo-500/20 relative overflow-hidden" onClick={() => startQuestions('ADVANCED')}>
            <div className="absolute top-0 right-0 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">RECOMMENDED</div>
            <div className="w-12 h-12 bg-purple-500/20 text-purple-400 rounded-lg flex items-center justify-center mb-4 text-2xl">🧬</div>
            <h3 className="text-xl font-bold text-white mb-2">Advanced Profile</h3>
            <p className="text-slate-400 mb-6 flex-1">
              A deep dive with 45 questions covering specific scenarios, ethics, and emotional triggers. Creates a highly accurate digital twin.
            </p>
            <div className="text-sm font-mono text-slate-500 mb-6">~ 10-12 Minutes</div>
            <button className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl font-semibold transition-colors shadow-lg">
              Start Advanced
            </button>
          </div>
        </div>
        <div className="text-center mt-8">
          <button onClick={onCancel} className="text-slate-500 hover:text-slate-300">Cancel</button>
        </div>
      </div>
    );
  }

  // --- STEP 3: QUESTIONS ---
  return (
    <div className="max-w-2xl mx-auto py-10">
      <div className="mb-8">
        <div className="flex justify-between items-end mb-2">
          <h2 className="text-3xl font-bold text-white">
            {questionMode === 'BASIC' ? 'Basic' : 'Advanced'} Assessment
          </h2>
          <span className="text-slate-500 font-mono text-sm">Question {currentQIndex + 1}/{targetQuestions.length}</span>
        </div>
        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
          <div 
            className="bg-indigo-500 h-full transition-all duration-300 ease-out"
            style={{ width: `${((currentQIndex + 1) / targetQuestions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 md:p-10 shadow-xl backdrop-blur-sm min-h-[400px] flex flex-col animate-in fade-in slide-in-from-right-4 duration-300">
        <h3 className="text-xl md:text-2xl font-medium mb-8 text-slate-100 leading-relaxed">
          {currentQuestion.text}
        </h3>

        <div className="flex-1">
          {currentQuestion.type === 'text' && (
            <textarea
              className="w-full bg-slate-900 border border-slate-600 rounded-xl p-4 text-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-none h-40"
              placeholder="Type your answer here..."
              value={getCurrentAnswer() as string || ''}
              onChange={(e) => handleAnswer(e.target.value)}
            />
          )}

          {currentQuestion.type === 'choice' && (
            <div className="space-y-3">
              {currentQuestion.options?.map((option) => (
                <button
                  key={option}
                  onClick={() => handleAnswer(option)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                    getCurrentAnswer() === option
                      ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-900/20'
                      : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-500 hover:bg-slate-800'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {currentQuestion.type === 'scale' && (
            <div className="py-8">
              <input
                type="range"
                min="1"
                max="10"
                step="1"
                value={getCurrentAnswer() as number || 5}
                onChange={(e) => handleAnswer(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
              <div className="flex justify-between mt-4 text-sm text-slate-400">
                <span>{currentQuestion.minLabel}</span>
                <span>{currentQuestion.maxLabel}</span>
              </div>
              <div className="text-center mt-6 font-mono text-indigo-400 text-xl font-bold">
                {getCurrentAnswer() || 5}
              </div>
            </div>
          )}
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-900/30 border border-red-800 text-red-200 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="flex justify-between mt-8 pt-6 border-t border-slate-700">
          <button
            onClick={currentQIndex === 0 ? () => setStep('SELECT_MODE') : handleBack}
            className="px-6 py-2 rounded-lg text-slate-400 hover:text-white transition-colors"
          >
            Back
          </button>
          
          <button
            onClick={handleNext}
            disabled={!getCurrentAnswer()}
            className={`px-8 py-3 rounded-xl font-bold transition-all shadow-lg ${
              !getCurrentAnswer()
                ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-900/20 hover:scale-[1.02]'
            }`}
          >
            {currentQIndex === targetQuestions.length - 1 ? 'Generate Persona' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;
