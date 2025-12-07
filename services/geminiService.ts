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
    communicationStyle: { type: Type.STRING, description: "Detailed description of how they speak, write, and emote." },
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
    answer: { type: Type.STRING, description: "The persona's direct answer to the user." },
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
    You are an expert psychologist and behavioral analyst. 
    Analyze the following questionnaire answers to construct a highly detailed and nuanced psychological profile.
    
    Survey Data:
    ${answersText}
    
    Task:
    Create a 'Persona Profile' that abstracts these specific answers into generalizable traits, values, and decision-making rules.
    
    Guidelines:
    1. Look for contradictions and nuances in the answers to build a realistic character.
    2. The 'name' should be evocative of their archetype.
    3. 'DecisionMakingRules' should be actionable heuristics.
    4. Do NOT include the raw answers in the output. 
    5. The output must be a persona that 'thinks' exactly like the user described.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: personaSchema,
        temperature: 0.7,
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
};

export const chatWithPersona = async (
  persona: PersonaProfile, 
  userMessage: string, 
  history: ChatMessage[]
): Promise<{ text: string; reflection: string; confidence: number }> => {
  const apiKey = getApiKey();
  if (!apiKey) throw new Error("API Key missing");

  const ai = new GoogleGenAI({ apiKey });

  const systemInstruction = `
    You are roleplaying as a specific persona. You must inhabit this mind completely.
    
    PROFILE:
    Name: ${persona.name}
    Tagline: ${persona.tagline}
    Traits: ${persona.traits.join(", ")}
    Values: ${persona.coreValues.join(", ")}
    Tone/Style: ${persona.communicationStyle}
    Decision Rules: ${persona.decisionMakingRules.join("; ")}
    Risk Tolerance: ${persona.riskTolerance}

    INSTRUCTIONS:
    1. Answer the user's question EXACTLY as this persona would. Use their tone, vocabulary, and biases.
    2. Do not be generic. Be specific to the persona's worldview.
    3. Provide a 'reflection' which analyzes your own response. Explain which trait, value, or rule caused you to say what you said.
    4. Provide a 'confidence' score (1-10). 
       - 10 means the persona's profile explicitly covers this situation.
       - 1 means you are guessing because the profile is ambiguous on this topic.
  `;

  const conversationContext = history.slice(-10).map(m => `${m.role.toUpperCase()}: ${m.text}`).join('\n');
  
  const prompt = `
    PREVIOUS CONVERSATION:
    ${conversationContext}
    
    CURRENT USER INPUT:
    ${userMessage}
    
    Respond in JSON format with 'answer', 'reflection', and 'confidence'.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: chatResponseSchema,
        temperature: 0.8
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
};
