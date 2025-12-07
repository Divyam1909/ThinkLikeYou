import { Question, Persona } from './types';

// We will use the first 20 for BASIC, and all 45 for ADVANCED
export const QUESTIONS: Question[] = [
  // --- BASIC SET (1-20) ---
  {
    id: 'q1',
    text: 'When making a difficult decision, what is your primary driver?',
    type: 'choice',
    options: ['Logic and data', 'Gut feeling and intuition', 'Impact on others', 'Long-term strategic goals', 'Immediate efficiency']
  },
  {
    id: 'q2',
    text: 'How do you handle significant risk?',
    type: 'scale',
    minLabel: 'Avoid at all costs',
    maxLabel: 'Seek high rewards regardless'
  },
  {
    id: 'q3',
    text: 'In a conflict, your natural tendency is to:',
    type: 'choice',
    options: ['Compromise to keep peace', 'Stand firm on principles', 'Analyze objectively', 'Avoid entirely', 'Dominate to win']
  },
  {
    id: 'q4',
    text: 'Describe your communication style in a few words (e.g., direct, diplomatic, storytelling, analytical).',
    type: 'text'
  },
  {
    id: 'q5',
    text: 'What do you value most in others?',
    type: 'choice',
    options: ['Competence', 'Loyalty', 'Creativity', 'Honesty', 'Empathy']
  },
  {
    id: 'q6',
    text: 'Do you prefer established methods or novel approaches?',
    type: 'scale',
    minLabel: 'Strict tradition',
    maxLabel: 'Radical innovation'
  },
  {
    id: 'q7',
    text: 'What is a deal-breaker for you in a relationship?',
    type: 'text'
  },
  {
    id: 'q8',
    text: 'If you had unlimited resources, what would you focus on first?',
    type: 'text'
  },
  {
    id: 'q9',
    text: 'How do you react to sudden failure?',
    type: 'choice',
    options: ['Analyze what went wrong', 'Blame external factors', 'Feel overwhelmed', 'Pivot immediately', 'Seek support']
  },
  {
    id: 'q10',
    text: 'When learning something new, you prefer:',
    type: 'choice',
    options: ['Reading the manual', 'Doing it (trial and error)', 'Watching someone else', 'Discussing it']
  },
  {
    id: 'q11',
    text: 'How important is social status or recognition to you?',
    type: 'scale',
    minLabel: 'Irrelevant',
    maxLabel: 'Vital driver'
  },
  {
    id: 'q12',
    text: 'What is your stance on rules?',
    type: 'choice',
    options: ['Follow them strictly', 'Guidelines to be interpreted', 'Break them if they impede progress']
  },
  {
    id: 'q13',
    text: 'Ideally, how do you spend a free evening?',
    type: 'text'
  },
  {
    id: 'q14',
    text: 'Are you more focused on the big picture or the details?',
    type: 'scale',
    minLabel: 'Micro details',
    maxLabel: 'Macro vision'
  },
  {
    id: 'q15',
    text: 'Which emotion do you struggle to manage the most?',
    type: 'text'
  },
  {
    id: 'q16',
    text: 'Do you believe people can truly change?',
    type: 'choice',
    options: ['Yes, fundamentally', 'Only superficially', 'No, nature is fixed']
  },
  {
    id: 'q17',
    text: 'In a group project, what role do you naturally take?',
    type: 'choice',
    options: ['The Leader', 'The Mediator', 'The Specialist/Doer', 'The Critic', 'The Supporter']
  },
  {
    id: 'q18',
    text: 'How do you define success?',
    type: 'text'
  },
  {
    id: 'q19',
    text: 'Are you an optimist, pessimist, or realist?',
    type: 'choice',
    options: ['Optimist', 'Pessimist', 'Realist']
  },
  {
    id: 'q20',
    text: 'How much alone time do you need to recharge?',
    type: 'scale',
    minLabel: 'None (always social)',
    maxLabel: 'A lot (hermit mode)'
  },

  // --- ADVANCED SET (21-45) ---
  {
    id: 'q21',
    text: 'If you could change one thing about the world, what would it be?',
    type: 'text'
  },
  {
    id: 'q22',
    text: 'Do you trust authority figures?',
    type: 'scale',
    minLabel: 'Never',
    maxLabel: 'Always'
  },
  {
    id: 'q23',
    text: 'When you are stressed, you become:',
    type: 'choice',
    options: ['Aggressive/ irritable', 'Withdrawn/silent', 'Hyperactive/anxious', 'Dependent/clingy']
  },
  {
    id: 'q24',
    text: 'What is a controversial opinion you hold?',
    type: 'text'
  },
  {
    id: 'q25',
    text: 'Is it better to be kind or to be right?',
    type: 'choice',
    options: ['Kind', 'Right', 'Context dependent']
  },
  {
    id: 'q26',
    text: 'How do you handle money?',
    type: 'choice',
    options: ['Spender', 'Saver', 'Investor', 'Ignorer']
  },
  {
    id: 'q27',
    text: 'What is your biggest fear?',
    type: 'text'
  },
  {
    id: 'q28',
    text: 'How do you view the past?',
    type: 'choice',
    options: ['A source of nostalgia', 'A lesson book', 'Irrelevant baggage', 'A burden']
  },
  {
    id: 'q29',
    text: 'Are you more competitive or cooperative?',
    type: 'scale',
    minLabel: 'Purely Cooperative',
    maxLabel: 'Purely Competitive'
  },
  {
    id: 'q30',
    text: 'Describe your ideal working environment.',
    type: 'text'
  },
  {
    id: 'q31',
    text: 'Do you believe in fate or free will?',
    type: 'choice',
    options: ['Fate', 'Free Will', 'A mix']
  },
  {
    id: 'q32',
    text: 'How fast do you make decisions?',
    type: 'scale',
    minLabel: 'Agonizingly slow',
    maxLabel: 'Instant/Impulsive'
  },
  {
    id: 'q33',
    text: 'What motivates you more: praise or fear of failure?',
    type: 'choice',
    options: ['Praise/Reward', 'Fear of failure/Punishment']
  },
  {
    id: 'q34',
    text: 'How do you handle criticism?',
    type: 'text'
  },
  {
    id: 'q35',
    text: 'Are you more theoretical or practical?',
    type: 'choice',
    options: ['Theoretical', 'Practical']
  },
  {
    id: 'q36',
    text: 'Do you hold grudges?',
    type: 'scale',
    minLabel: 'Never (Forgive forget)',
    maxLabel: 'Forever'
  },
  {
    id: 'q37',
    text: 'What role does tradition play in your life?',
    type: 'text'
  },
  {
    id: 'q38',
    text: 'When brainstorming, do you prefer quality or quantity?',
    type: 'choice',
    options: ['Quality', 'Quantity']
  },
  {
    id: 'q39',
    text: 'How transparent are you with your emotions?',
    type: 'scale',
    minLabel: 'Stone faced',
    maxLabel: 'Open book'
  },
  {
    id: 'q40',
    text: 'What is your philosophy on giving charity?',
    type: 'text'
  },
  {
    id: 'q41',
    text: 'Do you prefer to plan everything or go with the flow?',
    type: 'scale',
    minLabel: 'Strict Plan',
    maxLabel: 'Total Flow'
  },
  {
    id: 'q42',
    text: 'What is the most important lesson you have learned?',
    type: 'text'
  },
  {
    id: 'q43',
    text: 'How strictly do you separate work and life?',
    type: 'choice',
    options: ['Strict separation', 'Integrated/Blended', 'Work is life']
  },
  {
    id: 'q44',
    text: 'Are you driven by internal satisfaction or external results?',
    type: 'choice',
    options: ['Internal', 'External']
  },
  {
    id: 'q45',
    text: 'Final Question: If you could leave one rule for the world to follow, what would it be?',
    type: 'text'
  }
];

export const DEMO_PERSONAS: Persona[] = [
  {
    id: 'demo-1',
    createdAt: Date.now(),
    isPublic: true,
    author: 'System',
    profile: {
      name: 'The Pragmatic Stoic',
      tagline: 'Logic over emotion, always.',
      traits: ['Analytical', 'Calm', 'Objective', 'Direct'],
      coreValues: ['Truth', 'Efficiency', 'Resilience'],
      communicationStyle: 'Concise and devoid of fluff. Gets straight to the point.',
      decisionMakingRules: [
        'Prioritize factual data over emotional appeals.',
        'Focus on what is within control.',
        'Accept the worst-case scenario before acting.'
      ],
      riskTolerance: 'Moderate'
    }
  },
  {
    id: 'demo-2',
    createdAt: Date.now(),
    isPublic: true,
    author: 'System',
    profile: {
      name: 'The Empathetic Leader',
      tagline: 'People first, results second.',
      traits: ['Warm', 'Listening', 'Collaborative', 'Protective'],
      coreValues: ['Community', 'Growth', 'Harmony'],
      communicationStyle: 'Encouraging, asks questions, validates feelings.',
      decisionMakingRules: [
        'Consider the impact on the most vulnerable person.',
        'Seek consensus where possible.',
        'Preserve relationships over winning arguments.'
      ],
      riskTolerance: 'Low'
    }
  },
  {
    id: 'demo-3',
    createdAt: Date.now(),
    isPublic: true,
    author: 'System',
    profile: {
      name: 'The Visionary Maverick',
      tagline: 'Break things to build better things.',
      traits: ['Bold', 'Creative', 'Impatient', 'Optimistic'],
      coreValues: ['Innovation', 'Freedom', 'Impact'],
      communicationStyle: 'Inspiring, metaphorical, high-energy.',
      decisionMakingRules: [
        'If it has been done before, do it differently.',
        'Bet on the potential upside, ignore the safe path.',
        'Speed matters more than perfection.'
      ],
      riskTolerance: 'High'
    }
  }
];
