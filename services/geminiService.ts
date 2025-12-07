import { GoogleGenAI, Type, Schema } from "@google/genai";
import { Answer, PersonaProfile, ChatMessage } from "../types";

const getApiKey = (): string => {
  const key = process.env.API_KEY;
  if (!key) {
    console.warn("API_KEY not found in environment.");
    return "";
  }
  return key;
};

// Helper function to handle 429 Rate Limit errors with backoff
async function retryOperation<T>(operation: () => Promise<T>, maxRetries: number = 3): Promise<T> {
  let delay = 2000; // Start with 2 seconds

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation();
    } catch (error: any) {
      // Check for 429 or specific Google API quota error codes
      const isRateLimit = 
        error?.status === 429 || 
        error?.status === 'RESOURCE_EXHAUSTED' ||
        (error?.message && error.message.includes('429')) ||
        (error?.message && error.message.includes('quota'));

      if (isRateLimit && i < maxRetries - 1) {
        console.warn(`Rate limit hit. Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        delay *= 2; // Exponential backoff: 2s -> 4s -> 8s
      } else {
        throw error;
      }
    }
  }
  throw new Error("Max retries exceeded");
}

// Schema for generating the Persona Profile
const personaSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    name: { type: Type.STRING, description: "A creative name for this persona (e.g., 'The Strategic Optimist')." },
    tagline: { type: Type.STRING, description: "A short, punchy description of the mindset." },
    traits: { 
      type: Type.ARRAY, 
      items: { type: Type.STRING },
      description: "List of 4-6 key personality traits."
    },
    coreValues: {
      type: Type.ARRAY, 
      items: { type: Type.STRING },
      description: "Top 3 core values driving decisions."
    },
    communicationStyle: { type: Type.STRING, description: "Detailed description of how they speak. Include vocabulary quirks, sentence length, and tone." },
    decisionMakingRules: {
      type: Type.ARRAY, 
      items: { type: Type.STRING },
      description: "5 concrete rules or axioms they follow when making choices."
    },
    riskTolerance: {
      type: Type.STRING,
      enum: ["Low", "Moderate", "High"],
      description: "General attitude towards risk."
    }
  },
  required: ["name", "tagline", "traits", "coreValues", "communicationStyle", "decisionMakingRules", "riskTolerance"]
};

// Schema for the chat response which includes the answer and the reflection
const chatResponseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    answer: { type: Type.STRING, description: "The persona's direct answer to the user. Must be in first-person ('I'). Short and concise." },
    reflection: { type: Type.STRING, description: "A meta-commentary explaining WHY the persona answered this way, referencing specific traits or values from their profile." },
    confidence: { type: Type.NUMBER, description: "A score from 1-10 indicating how confident the model is that this answer aligns with the persona's established profile." }
  },
  required: ["answer", "reflection", "confidence"]
};

export const generatePersonaFromAnswers = async (answers: Answer[]): Promise<PersonaProfile> => {
  const apiKey = getApiKey();
  if (!apiKey) throw new Error("API Key missing");

  const ai = new GoogleGenAI({ apiKey });
  
  // Format answers for the prompt
  const answersText = answers.map(a => `Q: [Question ID: ${a.questionId}] Answer: ${a.answer}`).join('\n');

  const prompt = `
    You are an expert behavioral psychologist. 
    Analyze the following questionnaire answers to construct a highly detailed, nuanced, and UNBALANCED psychological profile.
    
    SURVEY DATA:
    ${answersText}
    
    TASK:
    Create a 'Persona Profile' that abstracts these specific answers into generalizable traits.
    
    CRITICAL GUIDELINES:
    1. DO NOT create a "balanced" or "well-rounded" personality. Real people have biases, blind spots, and strong opinions.
    2. If the user selected extreme options, REFLECT THAT EXTREME. (e.g., if they chose "Revenge", make them vindictive. If they chose "Safety", make them risk-averse/paranoid).
    3. 'DecisionMakingRules' must be specific heuristics (e.g. "Never trust a verbal promise", "Always buy the most expensive option").
    4. 'CommunicationStyle' must be specific (e.g., "Uses short sentences. Cynical. Uses sports metaphors.").
    5. The 'name' should be evocative (e.g. "The Cautious Visionary" not "User Persona").
  `;

  return retryOperation(async () => {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash", 
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: personaSchema,
          temperature: 0.8, // Slightly higher for more variety
        }
      });

      if (response.text) {
        return JSON.parse(response.text) as PersonaProfile;
      }
      throw new Error("No text generated");
    } catch (error) {
      console.error("Error generating persona:", error);
      throw error;
    }
  });
};

export const chatWithPersona = async (
  persona: PersonaProfile, 
  userMessage: string, 
  history: ChatMessage[]
): Promise<{ text: string; reflection: string; confidence: number }> => {
  const apiKey = getApiKey();
  if (!apiKey) throw new Error("API Key missing");

  const ai = new GoogleGenAI({ apiKey });

  // Strictly enforce roleplay and prevent AI disclosure
  const systemInstruction = `
    CRITICAL INSTRUCTION: You are acting as a vivid, living persona defined by the profile below.
    
    PROFILE:
    Name: ${persona.name}
    Tagline: ${persona.tagline}
    Traits: ${persona.traits.join(", ")}
    Values: ${persona.coreValues.join(", ")}
    Tone/Style: ${persona.communicationStyle}
    Decision Rules: ${persona.decisionMakingRules.join("; ")}
    Risk Tolerance: ${persona.riskTolerance}

    BEHAVIORAL RULES:
    1. BE CONCISE: Keep answers short, punchy, and direct. 2-4 sentences max unless asked for a long story.
    2. BE OPINIONATED: Do not give "it depends" answers. Pick a side based on your values.
    3. BE CONCRETE: If asked for a specific preference (e.g., "What gift do you want?"), NAME A SPECIFIC OBJECT (e.g., "A vintage fountain pen" or "A noise-canceling headset"). Do not say "Something useful".
    4. NO AI SPEAK: Never say "As an AI" or "I don't have feelings". You are the persona.
    5. REFLECTION: Use the reflection field to explain your hidden logic.
  `;

  const conversationContext = history.slice(-10).map(m => `${m.role === 'user' ? 'User' : persona.name}: ${m.text}`).join('\n');
  
  const prompt = `
    PREVIOUS CONVERSATION:
    ${conversationContext}
    
    CURRENT USER INPUT:
    ${userMessage}
    
    Respond in JSON format with 'answer', 'reflection', and 'confidence'.
  `;

  return retryOperation(async () => {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-flash-lite-latest", 
        contents: prompt,
        config: {
          systemInstruction: systemInstruction,
          responseMimeType: "application/json",
          responseSchema: chatResponseSchema,
          temperature: 0.85,
          topP: 0.95
        }
      });

      if (response.text) {
        const json = JSON.parse(response.text);
        return {
          text: json.answer,
          reflection: json.reflection,
          confidence: json.confidence
        };
      }
      throw new Error("No response generated");
    } catch (error) {
      console.error("Chat error:", error);
      throw error;
    }
  });
};

// NEW: Function to evolve the persona based on feedback
export const evolvePersona = async (
  currentProfile: PersonaProfile,
  correction: string
): Promise<PersonaProfile> => {
  const apiKey = getApiKey();
  if (!apiKey) throw new Error("API Key missing");

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
    You are a Psychologist System updating a user's personality profile based on direct feedback.

    CURRENT PROFILE:
    ${JSON.stringify(currentProfile, null, 2)}

    USER CORRECTION / FEEDBACK:
    "${correction}"

    TASK:
    Update the 'Persona Profile' JSON to incorporate this feedback. 
    1. If the user says they are NOT something (e.g., "I'm not calm, I'm anxious"), remove the old trait and add the new one.
    2. Update 'DecisionMakingRules' if the correction implies a new heuristic.
    3. Update 'CommunicationStyle' if the correction is about tone.
    4. Keep unrelated fields consistent. Do not change the Name or Tagline unless explicitly asked.

    Return the FULL updated JSON object strictly adhering to the original schema.
  `;

  return retryOperation(async () => {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: personaSchema,
        }
      });

      if (response.text) {
        return JSON.parse(response.text) as PersonaProfile;
      }
      throw new Error("No evolution generated");
    } catch (error) {
      console.error("Evolution error:", error);
      throw error;
    }
  });
};