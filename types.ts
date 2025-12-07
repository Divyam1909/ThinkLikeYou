export enum ViewState {
  HOME = 'HOME',
  QUESTIONNAIRE = 'QUESTIONNAIRE',
  DASHBOARD = 'DASHBOARD',
  PROFILE = 'PROFILE',
  CHAT = 'CHAT',
  GALLERY = 'GALLERY'
}

export interface Question {
  id: string;
  text: string;
  type: 'scale' | 'text' | 'choice';
  options?: string[]; // For choice type
  minLabel?: string; // For scale type
  maxLabel?: string; // For scale type
  category?: string;
}

export interface Answer {
  questionId: string;
  answer: string | number;
}

// The core abstract persona object (Safe to share)
export interface PersonaProfile {
  name: string;
  tagline: string;
  traits: string[];
  coreValues: string[];
  communicationStyle: string;
  decisionMakingRules: string[];
  riskTolerance: 'Low' | 'Moderate' | 'High';
}

export interface Persona {
  id: string;
  profile: PersonaProfile;
  createdAt: number;
  isPublic?: boolean; // For gallery simulation
  author?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  reflection?: string; // The "why I thought this way" part
  confidence?: number; // 1-10 score
  timestamp: number;
}

export interface EncryptedPersonaData {
  data: string; // Base64 ciphertext
  iv: string;   // Base64 initialization vector
  salt: string; // Base64 salt
}
