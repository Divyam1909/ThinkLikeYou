import { Question, Persona } from './types';

// We will use the first ~20 for BASIC, and all ~45 for ADVANCED
export const QUESTIONS: Question[] = [
  // --- BASIC SET: VOICE SAMPLES & CORE VALUES (1-20) ---
  // Voice Samples are CRITICAL for sounding human, so they are in Basic.
  {
    id: 'voice_weekend',
    text: 'VOICE SAMPLE: A friend asks "How was your weekend?" Write your reply exactly as you would speak it (1-2 sentences).',
    type: 'text',
    placeholder: 'e.g., "Honestly? Slept through the whole thing. Needed it."'
  },
  {
    id: 'voice_mistake',
    text: 'VOICE SAMPLE: Someone says "You made a mistake." What is your one-line immediate reaction?',
    type: 'text',
    placeholder: 'e.g., "Oh crap, show me where." OR "I highly doubt that."'
  },
  {
    id: 'voice_plans',
    text: 'VOICE SAMPLE: Write one sentence you would send when someone cancels plans last minute.',
    type: 'text',
    placeholder: 'e.g., "No worries, catch you later." OR "Seriously? Again?"'
  },
  {
    id: 'q_decision_style',
    text: 'A high-stakes decision has an uncertain outcome. What do you do?',
    type: 'choice',
    options: ['Delay until I have more data', 'Trust my gut and act immediately', 'Consult everyone involved first', 'Plan for the worst-case scenario']
  },
  {
    id: 'q_risk_scale',
    text: 'Risk Tolerance Scale:',
    type: 'scale',
    min: 1,
    max: 5,
    minLabel: 'Play it Safe (1)',
    maxLabel: 'All In (5)'
  },
  {
    id: 'voice_advice',
    text: 'VOICE SAMPLE: Give one line of advice you genuinely believe in.',
    type: 'text',
    placeholder: 'Write it exactly how you would say it.'
  },
  {
    id: 'q_conflict',
    text: 'Someone openly challenges your authority in a meeting. Reaction?',
    type: 'choice',
    options: ['Laugh it off / Ignore it', 'Argue back aggressively', 'Ask them to explain their logic', 'Shut them down immediately', 'Internalize it and worry later']
  },
  {
    id: 'q_aesthetics',
    text: 'What is your preferred aesthetic environment?',
    type: 'choice',
    options: ['Minimalist (Clean, neutral, sparse)', 'Cozy (Warm lights, soft materials, cluttered)', 'Industrial (Metal, grey, functional, exposed)', 'Natural (Plants, sunlight, wood, open)']
  },
  {
    id: 'voice_signature',
    text: 'VOICE SAMPLE: Write one sentence that feels like something ONLY you would say (a quirk, a joke, or a deep thought).',
    type: 'text'
  },
  {
    id: 'q_social_scale',
    text: 'How important is social status to you?',
    type: 'scale',
    min: 1,
    max: 5,
    minLabel: 'Irrelevant (1)',
    maxLabel: 'Vital (5)'
  },
  {
    id: 'q_gift',
    text: 'What is a specific gift you would ACTUALLY love? (Be honest, not polite).',
    type: 'text',
    placeholder: 'e.g., A specific book, a type of tool, a day off...'
  },
  {
    id: 'q_priority',
    text: 'If you had unlimited resources but only 5 years left to live, what is your priority?',
    type: 'choice',
    options: ['Hedonism and Travel', 'Building a Legacy/Work', 'Family and Connection', 'Spiritual Preparation']
  },
  {
    id: 'q_failure_monologue',
    text: 'You fail publicly. What is your internal monologue?',
    type: 'choice',
    options: ['"I need to fix this immediately."', '"It\'s not my fault, the system is rigged."', '"I am a failure."', '"Who cares? Move on."']
  },
  {
    id: 'q_emotion_scale',
    text: 'Which end of the emotional spectrum do you lean towards?',
    type: 'scale',
    min: 1,
    max: 5,
    minLabel: 'Cold/Stoic (1)',
    maxLabel: 'Volatile/Emotional (5)'
  },
  {
    id: 'q_rules',
    text: 'Rules are:',
    type: 'choice',
    options: ['Absolute', 'Guidelines', 'Suggestions', 'Obstacles']
  },
  {
    id: 'q_friday',
    text: 'Ideally, how do you spend a Friday night?',
    type: 'choice',
    options: ['Out partying/networking', 'Dinner with close friends', 'Alone with a hobby/book/game', 'Working on a passion project']
  },
  {
    id: 'q_optimism_scale',
    text: 'Your Worldview:',
    type: 'scale',
    min: 1,
    max: 5,
    minLabel: 'Pessimist (1)',
    maxLabel: 'Optimist (5)'
  },
  {
    id: 'q_detail_focus',
    text: 'Are you a Big Picture person or a Detail person?',
    type: 'choice',
    options: ['100% Big Picture (I hate details)', '100% Details (The devil is in the details)', 'A mix, but lean Big Picture', 'A mix, but lean Details']
  },
  {
    id: 'q_crisis_role',
    text: 'In a crisis, you are:',
    type: 'choice',
    options: ['The Commander (giving orders)', 'The Peacemaker (calming nerves)', 'The Doer (fixing the problem)', 'The Panic Button (freaking out)']
  },
  {
    id: 'q_solitude_scale',
    text: 'How much do you need solitude?',
    type: 'scale',
    min: 1,
    max: 5,
    minLabel: 'Hate it (1)',
    maxLabel: 'Crave it (5)'
  },

  // --- ADVANCED SET: BEHAVIOR & NUANCE (21-45) ---
  {
    id: 'q_behavior_deadline',
    text: 'BEHAVIOR: Someone misses a deadline that affects you. What do you actually DO?',
    type: 'choice',
    options: ['Confront them calmly', 'Fix it yourself and say nothing', 'Escalate to a manager', 'Avoid conflict and let it slide', 'Make a passive-aggressive joke']
  },
  {
    id: 'q_phrases',
    text: 'List 2-3 short expressions or phrases you use often.',
    type: 'text',
    placeholder: 'e.g., "Fair enough", "Let\'s rock", "It is what it is"'
  },
  {
    id: 'q_pet_peeve',
    text: 'Name one pet peeve. Keep it short.',
    type: 'text'
  },
  {
    id: 'q_behavior_lottery',
    text: 'BEHAVIOR: If you won a massive lottery today, what is the FIRST thing you do?',
    type: 'choice',
    options: ['Invest/Save it secretly', 'Travel immediately', 'Buy a better house/car', 'Give a huge chunk away', 'Quit my job in a blaze of glory']
  },
  {
    id: 'q_behavior_rude',
    text: 'BEHAVIOR: When someone is rude to you in public, your default reaction is:',
    type: 'choice',
    options: ['Ignore them completely', 'Confront them directly', 'Make a joke at their expense', 'Withdraw/Feel bad', 'Overthink it for hours later']
  },
  {
    id: 'q_controversial',
    text: 'Share a controversial opinion you hold. (Write it casually).',
    type: 'text'
  },
  {
    id: 'q_kind_vs_right',
    text: 'It is better to be:',
    type: 'choice',
    options: ['Kind than Right', 'Right than Kind']
  },
  {
    id: 'q_money_view',
    text: 'Money is:',
    type: 'choice',
    options: ['Freedom', 'Status', 'Security', 'Evil']
  },
  {
    id: 'q_fear',
    text: 'What is your deepest irrational fear? (Be specific).',
    type: 'text'
  },
  {
    id: 'q_past_relation',
    text: 'Relationship with the past:',
    type: 'choice',
    options: ['Nostalgic', 'Regretful', 'Indifferent', 'Forgetful']
  },
  {
    id: 'q_life_meta',
    text: 'Life is:',
    type: 'choice',
    options: ['A competition to be won', 'A cooperative journey', 'A test/simulation', 'A random accident']
  },
  {
    id: 'q_thinking_spot',
    text: 'Best environment for thinking:',
    type: 'choice',
    options: ['Absolute silence', 'Noisy cafe/bustle', 'Nature/Outdoors', 'Shower/Bed']
  },
  {
    id: 'q_fate_scale',
    text: 'Fate vs Free Will:',
    type: 'scale',
    min: 1,
    max: 5,
    minLabel: '100% Fate (1)',
    maxLabel: '100% Free Will (5)'
  },
  {
    id: 'q_decision_speed',
    text: 'Decision speed:',
    type: 'choice',
    options: ['Agonizingly Slow', 'Slow and steady', 'Fast', 'Instant/Impulsive']
  },
  {
    id: 'q_motivation',
    text: 'Motivation style:',
    type: 'choice',
    options: ['Carrot (Reward)', 'Stick (Punishment/Fear)']
  },
  {
    id: 'q_criticism',
    text: 'When criticized, you feel:',
    type: 'choice',
    options: ['Defensive/Attacked', 'Curious/Grateful', 'Indifferent', 'Ashamed']
  },
  {
    id: 'q_theory_practice',
    text: 'Preference:',
    type: 'choice',
    options: ['Abstract Theory', 'Concrete Practice']
  },
  {
    id: 'q_grudges',
    text: 'Grudges:',
    type: 'choice',
    options: ['Forgive and forget immediately', 'Forgive but remember', 'Hold onto them forever']
  },
  {
    id: 'q_ritual',
    text: 'A ritual you strictly follow:',
    type: 'text'
  },
  {
    id: 'q_deadline_approach',
    text: 'Deadline approach:',
    type: 'choice',
    options: ['Perfect but Late', 'Good Enough and On Time']
  },
  {
    id: 'q_emotional_transparency',
    text: 'Emotional transparency:',
    type: 'choice',
    options: ['Poker Face', 'Hard to read', 'Easy to read', 'Open Book']
  },
  {
    id: 'q_helping',
    text: 'Helping others:',
    type: 'choice',
    options: ['Everyone should help themselves', 'Help only family/friends', 'Help anyone in need']
  },
  {
    id: 'q_structure',
    text: 'Structure vs Chaos:',
    type: 'choice',
    options: ['Strict Schedule', 'Loose Plan', 'Go with the flow', 'Total Chaos']
  },
  {
    id: 'q_self_perception',
    text: 'People close to you would describe you as... (Select one)',
    type: 'choice',
    options: ['Intense', 'Calm/Steady', 'Unpredictable', 'Warm/Nurturing', 'Blunt', 'Quiet']
  },
  {
    id: 'q_consistency_check',
    text: 'Do any of your answers NOT represent you accurately? If yes, specify which one.',
    type: 'text',
    placeholder: 'e.g., "I answered X but actually..." (Leave empty if all good)'
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
      riskTolerance: 'Moderate',
      linguisticQuirks: 'Uses short, declarative sentences. Rarely uses exclamation marks.',
      voiceSamples: [
        "That's incorrect. Here is the data.",
        "We need to focus on the solution, not the problem."
      ],
      examples: [
        { prompt: "How was your weekend?", response: "Productive. Caught up on reading. You?" },
        { prompt: "I made a mistake.", response: "Show me the logs. We'll fix it." }
      ]
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
      riskTolerance: 'Low',
      linguisticQuirks: 'Uses softening language ("I feel", "Maybe"). Asks questions back.',
      voiceSamples: [
        "How are you feeling about this decision?",
        "We can get through this together."
      ],
      examples: [
        { prompt: "How was your weekend?", response: "It was lovely, thanks for asking! Need that recharge. How was yours?" },
        { prompt: "I made a mistake.", response: "Hey, it happens to the best of us. Let's look at it together." }
      ]
    }
  }
];