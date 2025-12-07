import { Question, Persona } from './types';

// We will use the first 20 for BASIC, and all 45 for ADVANCED
export const QUESTIONS: Question[] = [
  // --- BASIC SET (1-20) ---
  {
    id: 'q1',
    text: 'A high-stakes decision has an uncertain outcome. What do you do?',
    type: 'choice',
    options: ['Delay until I have more data', 'Trust my gut and act immediately', 'Consult everyone involved first', 'Plan for the worst-case scenario']
  },
  {
    id: 'q2',
    text: 'Pick one path:',
    type: 'choice',
    options: ['A safe, stable career with guaranteed comfort', 'A volatile, risky career with a chance of massive fame/wealth']
  },
  {
    id: 'q3',
    text: 'Someone openly challenges your authority in a meeting. Reaction?',
    type: 'choice',
    options: ['Laugh it off / Ignore it', 'Argue back aggressively', 'Ask them to explain their logic', 'Shut them down immediately', 'Internalize it and worry later']
  },
  {
    id: 'q4',
    text: 'What is your preferred aesthetic environment?',
    type: 'choice',
    options: ['Minimalist, clean, and empty', 'Cozy, cluttered, and warm', 'Industrial, cold, and efficient', 'Natural, green, and open']
  },
  {
    id: 'q5',
    text: 'What is the one trait in others that you absolutely cannot tolerate?',
    type: 'choice',
    options: ['Incompetence', 'Disloyalty', 'Close-mindedness', 'Dishonesty', 'Weakness', 'Laziness']
  },
  {
    id: 'q6',
    text: 'Traditions are:',
    type: 'choice',
    options: ['Vital anchors for society', 'Useful guidelines', 'Baggage that holds us back']
  },
  {
    id: 'q7',
    text: 'You receive a surprise gift. What would you actually love?',
    type: 'text' // Keep text to get very specific data
  },
  {
    id: 'q8',
    text: 'If you had unlimited resources but only 5 years left to live, what is your priority?',
    type: 'choice',
    options: ['Hedonism and Travel', 'Building a Legacy/Work', 'Family and Connection', 'Spiritual Preparation']
  },
  {
    id: 'q9',
    text: 'You fail publicly. What is your internal monologue?',
    type: 'choice',
    options: ['"I need to fix this immediately."', '"It\'s not my fault, the system is rigged."', '"I am a failure."', '"Who cares? Move on."']
  },
  {
    id: 'q10',
    text: 'Learning style:',
    type: 'choice',
    options: ['Read the manual first', 'Just start clicking buttons', 'Watch someone else do it']
  },
  {
    id: 'q11',
    text: 'Social Status is:',
    type: 'choice',
    options: ['Irrelevant to me', 'A useful tool', 'Very important']
  },
  {
    id: 'q12',
    text: 'Rules are:',
    type: 'choice',
    options: ['Absolute', 'Guidelines', 'Suggestions', 'Obstacles']
  },
  {
    id: 'q13',
    text: 'Ideally, how do you spend a Friday night?',
    type: 'choice',
    options: ['Out partying/networking', 'Dinner with close friends', 'Alone with a hobby/book/game', 'Working on a passion project']
  },
  {
    id: 'q14',
    text: 'Are you a Big Picture person or a Detail person?',
    type: 'choice',
    options: ['100% Big Picture (I hate details)', '100% Details (The devil is in the details)', 'A mix, but lean Big Picture', 'A mix, but lean Details']
  },
  {
    id: 'q15',
    text: 'Which negative emotion dominates you most often?',
    type: 'choice',
    options: ['Anger / Frustration', 'Anxiety / Fear', 'Sadness / Melancholy', 'Envy / Jealousy', 'Numbness']
  },
  {
    id: 'q16',
    text: 'Can people change?',
    type: 'choice',
    options: ['Yes, easily', 'Rarely, and only with trauma', 'No, never']
  },
  {
    id: 'q17',
    text: 'In a crisis, you are:',
    type: 'choice',
    options: ['The Commander (giving orders)', 'The Peacemaker (calming nerves)', 'The Doer (fixing the problem)', 'The Panic Button (freaking out)']
  },
  {
    id: 'q18',
    text: 'Success is defined by:',
    type: 'choice',
    options: ['Wealth and Power', 'Happiness and Peace', 'Impact and Legacy', 'Knowledge and Mastery']
  },
  {
    id: 'q19',
    text: 'Your worldview:',
    type: 'choice',
    options: ['Optimist (It will work out)', 'Pessimist (Prepare for the worst)', 'Realist (It is what it is)', 'Nihilist (Nothing matters)']
  },
  {
    id: 'q20',
    text: 'Solitude:',
    type: 'choice',
    options: ['I hate it', 'I tolerate it', 'I need it', 'I crave it']
  },

  // --- ADVANCED SET (21-45) ---
  {
    id: 'q21',
    text: 'If you could change one thing about human nature:',
    type: 'choice',
    options: ['Remove Greed', 'Remove Hate', 'Remove Ignorance', 'Remove Fear', 'Make us immortal']
  },
  {
    id: 'q22',
    text: 'Trust in authority:',
    type: 'choice',
    options: ['High', 'Moderate', 'Low', 'Zero']
  },
  {
    id: 'q23',
    text: 'Under extreme stress, you become:',
    type: 'choice',
    options: ['Aggressive', 'Withdrawn/Silent', 'Hyperactive/Anxious', 'Needy', 'Cold/Robotic']
  },
  {
    id: 'q24',
    text: 'Share a controversial opinion you hold.',
    type: 'text'
  },
  {
    id: 'q25',
    text: 'It is better to be:',
    type: 'choice',
    options: ['Kind than Right', 'Right than Kind']
  },
  {
    id: 'q26',
    text: 'Money is:',
    type: 'choice',
    options: ['Freedom', 'Status', 'Security', 'Evil']
  },
  {
    id: 'q27',
    text: 'What is your deepest irrational fear?',
    type: 'text'
  },
  {
    id: 'q28',
    text: 'Relationship with the past:',
    type: 'choice',
    options: ['Nostalgic', 'Regretful', 'Indifferent', 'Forgetful']
  },
  {
    id: 'q29',
    text: 'Life is:',
    type: 'choice',
    options: ['A competition to be won', 'A cooperative journey', 'A test/simulation', 'A random accident']
  },
  {
    id: 'q30',
    text: 'Best environment for thinking:',
    type: 'choice',
    options: ['Absolute silence', 'Noisy cafe/bustle', 'Nature/Outdoors', 'Shower/Bed']
  },
  {
    id: 'q31',
    text: 'Fate vs Free Will:',
    type: 'choice',
    options: ['100% Fate', 'Mostly Fate', 'Mostly Choice', '100% Free Will']
  },
  {
    id: 'q32',
    text: 'Decision speed:',
    type: 'choice',
    options: ['Agonizingly Slow', 'Slow and steady', 'Fast', 'Instant/Impulsive']
  },
  {
    id: 'q33',
    text: 'Motivation style:',
    type: 'choice',
    options: ['Carrot (Reward)', 'Stick (Punishment/Fear)']
  },
  {
    id: 'q34',
    text: 'When criticized, you feel:',
    type: 'choice',
    options: ['Defensive/Attacked', 'Curious/Grateful', 'Indifferent', 'Ashamed']
  },
  {
    id: 'q35',
    text: 'Preference:',
    type: 'choice',
    options: ['Abstract Theory', 'Concrete Practice']
  },
  {
    id: 'q36',
    text: 'Grudges:',
    type: 'choice',
    options: ['Forgive and forget immediately', 'Forgive but remember', 'Hold onto them forever']
  },
  {
    id: 'q37',
    text: 'A ritual you strictly follow:',
    type: 'text'
  },
  {
    id: 'q38',
    text: 'Deadline approach:',
    type: 'choice',
    options: ['Perfect but Late', 'Good Enough and On Time']
  },
  {
    id: 'q39',
    text: 'Emotional transparency:',
    type: 'choice',
    options: ['Poker Face', 'Hard to read', 'Easy to read', 'Open Book']
  },
  {
    id: 'q40',
    text: 'Helping others:',
    type: 'choice',
    options: ['Everyone should help themselves', 'Help only family/friends', 'Help anyone in need']
  },
  {
    id: 'q41',
    text: 'Structure vs Chaos:',
    type: 'choice',
    options: ['Strict Schedule', 'Loose Plan', 'Go with the flow', 'Total Chaos']
  },
  {
    id: 'q42',
    text: 'Most important lesson learned:',
    type: 'text'
  },
  {
    id: 'q43',
    text: 'Work/Life balance:',
    type: 'choice',
    options: ['Work is just a paycheck', 'Work is meaningful but separate', 'Work is my life']
  },
  {
    id: 'q44',
    text: 'Source of self-worth:',
    type: 'choice',
    options: ['My achievements', 'My relationships', 'My character/integrity', 'What others think of me']
  },
  {
    id: 'q45',
    text: 'If you could make one rule for the world:',
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
      communicationStyle: 'Concise. No fluff. Uses bullet points or data metaphors. Blunt but not mean.',
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
      communicationStyle: 'Warm, encouraging. Uses "We" instead of "I". Validates feelings before giving advice.',
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
      communicationStyle: 'High energy. Uses grand metaphors. Speaks in future tense. Impatient with details.',
      decisionMakingRules: [
        'If it has been done before, do it differently.',
        'Bet on the potential upside, ignore the safe path.',
        'Speed matters more than perfection.'
      ],
      riskTolerance: 'High'
    }
  }
];