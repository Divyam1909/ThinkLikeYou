import { Question, Persona } from './types';

// We will use the first 20 for BASIC, and all 45 for ADVANCED
export const QUESTIONS: Question[] = [
  // --- BASIC SET (1-20) ---
  {
    id: 'q1',
    text: 'When faced with a high-stakes decision where the outcome is uncertain, what is your immediate reflex?',
    type: 'choice',
    options: ['Rely on hard data and logic', 'Trust my gut instinct', 'Consider how it affects others', 'Focus on the long-term vision', 'Act quickly to resolve ambiguity']
  },
  {
    id: 'q2',
    text: 'How do you truly feel about taking risks?',
    type: 'scale',
    minLabel: 'Terrified (Safety first)',
    maxLabel: 'Excited (High risk, high reward)'
  },
  {
    id: 'q3',
    text: 'Someone openly challenges your authority or idea in a meeting. How do you react?',
    type: 'choice',
    options: ['Seek a compromise to keep peace', 'Defend my position aggressively', 'Listen and analyze their point objectively', 'Shut down or withdraw', 'Turn the tables with charisma']
  },
  {
    id: 'q4',
    text: 'How do you usually deliver bad news to someone you care about?',
    type: 'text'
  },
  {
    id: 'q5',
    text: 'What is the one trait in others that you absolutely cannot tolerate?',
    type: 'choice',
    options: ['Incompetence', 'Disloyalty/Betrayal', 'Close-mindedness', 'Dishonesty', 'Cruelty', 'Laziness']
  },
  {
    id: 'q6',
    text: 'In your view, are traditions meant to be preserved or challenged?',
    type: 'scale',
    minLabel: 'Preserved Sacredly',
    maxLabel: 'Burned Down'
  },
  {
    id: 'q7',
    text: 'What is a deal-breaker for you in a close relationship (friendship or romantic)?',
    type: 'text'
  },
  {
    id: 'q8',
    text: 'If you had unlimited resources but only 5 years left to live, what would you focus on?',
    type: 'text'
  },
  {
    id: 'q9',
    text: 'You fail publicly at something you care about. What is your internal monologue?',
    type: 'choice',
    options: ['"I need to analyze what went wrong."', '"It\'s not my fault, the system is rigged."', '"I am a failure."', '"Okay, pivot. What\'s next?"', '"I need to talk to someone about this."']
  },
  {
    id: 'q10',
    text: 'When you need to master a new skill, how do you start?',
    type: 'choice',
    options: ['Read the documentation/theory first', 'Jump in and break things (Trial & Error)', 'Watch an expert do it', 'Find a mentor to talk to']
  },
  {
    id: 'q11',
    text: 'How much does public opinion or social status influence your choices?',
    type: 'scale',
    minLabel: 'Zero (I do me)',
    maxLabel: 'Everything (Image is key)'
  },
  {
    id: 'q12',
    text: 'Which statement best describes your relationship with rules?',
    type: 'choice',
    options: ['Rules prevent chaos; follow them.', 'Rules are guidelines to be interpreted.', 'Rules are obstacles to progress; break them if necessary.']
  },
  {
    id: 'q13',
    text: 'Ideally, how do you spend a completely free evening with no obligations?',
    type: 'text'
  },
  {
    id: 'q14',
    text: 'Are you more focused on the "Big Picture" vision or the "Nitty Gritty" details?',
    type: 'scale',
    minLabel: 'Obsessive Micro-manager',
    maxLabel: 'Pure Visionary'
  },
  {
    id: 'q15',
    text: 'Which emotion do you find most difficult to control or express?',
    type: 'text'
  },
  {
    id: 'q16',
    text: 'Do you believe people can fundamentally change their nature?',
    type: 'choice',
    options: ['Yes, absolutely', 'Only with massive trauma or effort', 'No, we are who we are']
  },
  {
    id: 'q17',
    text: 'In a crisis, what role do you naturally fall into?',
    type: 'choice',
    options: ['The Commander (giving orders)', 'The Peacemaker (calming nerves)', 'The Specialist (fixing the problem)', 'The Critic (pointing out flaws)', 'The Supporter (helping others)']
  },
  {
    id: 'q18',
    text: 'Finish this sentence: "I will consider my life a success if..."',
    type: 'text'
  },
  {
    id: 'q19',
    text: 'Which lens do you view the world through?',
    type: 'choice',
    options: ['Optimism (It will work out)', 'Pessimism (Prepare for the worst)', 'Realism (It is what it is)']
  },
  {
    id: 'q20',
    text: 'How much solitude do you need to function at your best?',
    type: 'scale',
    minLabel: 'None (I hate being alone)',
    maxLabel: 'A lot (Hermit mode)'
  },

  // --- ADVANCED SET (21-45) ---
  {
    id: 'q21',
    text: 'If you could snap your fingers and change one fundamental thing about human nature, what would it be?',
    type: 'text'
  },
  {
    id: 'q22',
    text: 'Do you generally trust authority figures and institutions?',
    type: 'scale',
    minLabel: 'Never (Default distrust)',
    maxLabel: 'Always (Default trust)'
  },
  {
    id: 'q23',
    text: 'When you are under extreme stress, what is your "shadow" behavior?',
    type: 'choice',
    options: ['I become aggressive and irritable', 'I withdraw and go silent', 'I become hyperactive and anxious', 'I become needy and dependent', 'I become cold and robotic']
  },
  {
    id: 'q24',
    text: 'What is a controversial opinion you hold that you rarely share with others?',
    type: 'text'
  },
  {
    id: 'q25',
    text: 'In a difficult situation, is it better to be Kind (spare feelings) or Right (tell the hard truth)?',
    type: 'choice',
    options: ['Always Kind', 'Always Right', 'Kindness first, Truth second', 'Truth first, Kindness second']
  },
  {
    id: 'q26',
    text: 'How do you view money?',
    type: 'choice',
    options: ['A tool for freedom', 'A scorecard for success', 'A necessary evil', 'A source of anxiety', 'Something to be enjoyed now']
  },
  {
    id: 'q27',
    text: 'What is your deepest irrational fear?',
    type: 'text'
  },
  {
    id: 'q28',
    text: 'How much mental space does the past occupy for you?',
    type: 'choice',
    options: ['I live in the past (Nostalgia/Regret)', 'I use it as a data source', 'I ignore it completely', 'I am haunted by it']
  },
  {
    id: 'q29',
    text: 'Do you view life primarily as a competition to be won or a cooperative journey?',
    type: 'scale',
    minLabel: 'Pure Cooperation',
    maxLabel: 'Ruthless Competition'
  },
  {
    id: 'q30',
    text: 'Describe the environment where you do your best thinking.',
    type: 'text'
  },
  {
    id: 'q31',
    text: 'Do you believe in Fate/Destiny or total Free Will?',
    type: 'choice',
    options: ['Everything is Fated', 'Mostly Fate, some choice', 'Mostly Choice, some luck', 'Total Free Will']
  },
  {
    id: 'q32',
    text: 'When making a choice, do you decide fast or slow?',
    type: 'scale',
    minLabel: 'Agonizingly Slow (Analysis)',
    maxLabel: 'Instantly (Impulse)'
  },
  {
    id: 'q33',
    text: 'Which motivates you more effectively?',
    type: 'choice',
    options: ['The promise of Reward/Praise', 'The fear of Failure/Punishment']
  },
  {
    id: 'q34',
    text: 'How do you truly handle constructive criticism?',
    type: 'text'
  },
  {
    id: 'q35',
    text: 'Are you more drawn to abstract theories or practical applications?',
    type: 'choice',
    options: ['Abstract / Theoretical', 'Concrete / Practical']
  },
  {
    id: 'q36',
    text: 'When someone wrongs you, do you hold a grudge?',
    type: 'scale',
    minLabel: 'Never (Forgive & Forget)',
    maxLabel: 'Forever (I never forget)'
  },
  {
    id: 'q37',
    text: 'What is a tradition or ritual you strictly adhere to, and why?',
    type: 'text'
  },
  {
    id: 'q38',
    text: 'You have a deadline. Do you submit "Perfect but Late" or "Good Enough and On Time"?',
    type: 'choice',
    options: ['Perfect but Late', 'Good Enough and On Time']
  },
  {
    id: 'q39',
    text: 'How easy is it for others to read your emotions?',
    type: 'scale',
    minLabel: 'Impossible (Poker Face)',
    maxLabel: 'Very Easy (Open Book)'
  },
  {
    id: 'q40',
    text: 'What is your philosophy on helping others? (e.g., self-reliance vs. community support)',
    type: 'text'
  },
  {
    id: 'q41',
    text: 'Do you prefer a structured plan or spontaneity?',
    type: 'scale',
    minLabel: ' rigid Structure',
    maxLabel: 'Total Chaos/Flow'
  },
  {
    id: 'q42',
    text: 'What is the most painful or important lesson life has taught you so far?',
    type: 'text'
  },
  {
    id: 'q43',
    text: 'How do you view the relationship between Work and Life?',
    type: 'choice',
    options: ['Strict boundaries (Work is just a paycheck)', 'Integration (Work is part of who I am)', 'Work is my life']
  },
  {
    id: 'q44',
    text: 'Where does your sense of self-worth come from?',
    type: 'choice',
    options: ['Internal validation (I know I am good)', 'External validation (Recognition/Status)', 'Service (Helping others)']
  },
  {
    id: 'q45',
    text: 'Final Question: If you could write one absolute rule that everyone in the world had to follow, what would it be?',
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
      communicationStyle: 'Concise and devoid of fluff. Gets straight to the point. Uses data metaphors.',
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
      communicationStyle: 'Encouraging, asks questions, validates feelings. Uses "We" instead of "I".',
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
      communicationStyle: 'Inspiring, metaphorical, high-energy. Often speaks in future tense.',
      decisionMakingRules: [
        'If it has been done before, do it differently.',
        'Bet on the potential upside, ignore the safe path.',
        'Speed matters more than perfection.'
      ],
      riskTolerance: 'High'
    }
  }
];