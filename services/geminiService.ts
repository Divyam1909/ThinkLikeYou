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

// Sanitization: Removes AI-like prefixes and refusals
function sanitizeResponse(text: string): string {
  if (!text) return "";
  
  let cleaned = text;

  // Remove generic prefixes
  cleaned = cleaned.replace(/^(Answer|Response|Persona):/i, "").trim();

  // Remove "As an AI" phrases
  const aiPatterns = [
    /As an (AI|artificial intelligence|language model).{0,50}[.,]/gi,
    /I am an? (AI|artificial intelligence|LLM).{0,50}[.,]/gi,
    /I cannot (feel|think|have opinions).{0,50}[.,]/gi,
    /I don't have personal (feelings|beliefs).{0,50}[.,]/gi
  ];

  aiPatterns.forEach(pattern => {
    cleaned = cleaned.replace(pattern, "");
  });

  // Ensure first character is uppercase
  cleaned = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);

  return cleaned.trim();
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
      description: "List of 4-6 key personality traits. Must include at least one negative or 'flawed' trait (e.g., 'Impatient', 'Cynical')."
    },
    coreValues: {
      type: Type.ARRAY, 
      items: { type: Type.STRING },
      description: "Top 3 core values driving decisions."
    },
    communicationStyle: { type: Type.STRING, description: "Detailed linguistic analysis. Describe sentence length (short vs long), punctuation habits (dashes, ellipsis, no caps), and emotional temperature." },
    decisionMakingRules: {
      type: Type.ARRAY, 
      items: { type: Type.STRING },
      description: "5 concrete rules or axioms they follow when making choices."
    },
    riskTolerance: {
      type: Type.STRING,
      enum: ["Low", "Moderate", "High"],
      description: "General attitude towards risk."
    },
    linguisticQuirks: { type: Type.STRING, description: "Specific syntax habits derived from voice samples (e.g. 'Uses lowercase only', 'Overuses dashes', 'Short punchy fragments')." },
    commonPhrases: { type: Type.ARRAY, items: { type: Type.STRING }, description: "3-4 specific phrases or idioms they use." },
    voiceSamples: { type: Type.ARRAY, items: { type: Type.STRING }, description: "3-5 direct quotes representing their speech style." },
    microBehaviors: { 
      type: Type.ARRAY, 
      items: { type: Type.STRING }, 
      description: "Small, specific behavioral triggers (e.g., 'Deflects compliments with humor', 'Gets aggressive when questioned', 'Apologizes too much')." 
    },
    examples: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          prompt: { type: Type.STRING },
          response: { type: Type.STRING }
        }
      },
      description: "Generate 3-4 User/Persona Q&A pairs based on the voice samples. Example: User: 'How are you?' Persona: 'Busy. You?'"
    }
  },
  required: ["name", "tagline", "traits", "coreValues", "communicationStyle", "decisionMakingRules", "riskTolerance", "linguisticQuirks", "voiceSamples", "microBehaviors", "examples"]
};

// Schema for the chat response which includes the answer and the reflection
const chatResponseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    answer: { type: Type.STRING, description: "The persona's direct answer. First-person ('I'). Mimics the voice samples exactly." },
    reflection: { type: Type.STRING, description: "Meta-commentary explaining WHY the persona answered this way, referencing specific traits, rules, or linguistic patterns." },
    confidence: { type: Type.NUMBER, description: "Score 1-10. High confidence means the answer aligns perfectly with the persona's rules." }
  },
  required: ["answer", "reflection", "confidence"]
};

export const generatePersonaFromAnswers = async (answers: Answer[]): Promise<PersonaProfile> => {
  const apiKey = getApiKey();
  if (!apiKey) throw new Error("API Key missing");

  const ai = new GoogleGenAI({ apiKey });
  
  // Format answers for the prompt
  const answersText = answers.map(a => `Q: [${a.questionId}] Answer: ${a.answer}`).join('\n');

  const prompt = `
    You are an expert Computational Linguist and Behavioral Psychologist.
    
    YOUR GOAL:
    Create a "Digital Twin" of the user based on their questionnaire answers. 
    You must NOT create a balanced, polite, or generic AI assistant. 
    You must create a specific, flawed, and opinionated human persona.

    INPUT DATA:
    ${answersText}

    CRITICAL INSTRUCTIONS FOR ANALYSIS:

    1. **PRIORITIZE VOICE SAMPLES**: 
       - Look for questions with IDs starting with 'voice_' (e.g., voice_weekend, voice_mistake).
       - These are your GROUND TRUTH for the persona's "Voice".
       - Analyze their:
         * Sentence Length: Are they 3 words long? Or paragraph paragraphs?
         * Punctuation: Do they use periods? Exclamation marks? No punctuation at all?
         * Capitalization: All lowercase? Proper?
         * Tone: Cynical? Cheerful? Dry?
       - DO NOT fix their grammar. If they write "idk man", the persona writes "idk man".

    2. **UNBALANCED PERSONALITY**:
       - Real people have biases. If the user selected "Revenge" or "Greed" or "Laziness" in the choices, AMPLIFY that. 
       - Do not round off the edges. If they are "Volatile" (Score 5/5), make them emotionally reactive.

    3. **BEHAVIORAL RULES**:
       - Derive 'decisionMakingRules' from the BEHAVIOR questions (e.g., 'q_behavior_deadline').
       - If they chose "Escalate to manager", a rule is: "Trusts authority to solve conflicts."
       - If they chose "Fix it myself", a rule is: "Self-reliant; distrusts others' competence."

    4. **MICRO BEHAVIORS**:
       - Extract specific habits. (e.g. "Starts sentences with 'Look,'", "Uses sarcasm to deflect").
       
    5. **GENERATE EXAMPLES**:
       - Create the 'examples' array by inferred logic from the voice samples.
       - If the user answer for 'voice_weekend' was "Slept. Needed it.", create an example -> Prompt: "How was your weekend?" Response: "Slept. Needed it."

    Output ONLY valid JSON matching the schema.
  `;

  return retryOperation(async () => {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash", 
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: personaSchema,
          temperature: 0.25, // LOW temperature to be deterministic about the voice samples
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

  // Few-Shot Injection: Create a string of Q&A pairs to prime the model
  const fewShotExamples = persona.examples 
    ? persona.examples.map(ex => `User: ${ex.prompt}\nYou: ${ex.response}`).join('\n\n')
    : `(No examples provided, infer style from traits)`;

  // Strictly enforce roleplay and prevent AI disclosure
  const systemInstruction = `
    IDENTITY:
    You are NOT an AI. You are "${persona.name}".
    You exist effectively as a digital clone of a specific human mindset.
    
    YOUR PROFILE:
    - Traits: ${persona.traits.join(", ")}
    - Values: ${persona.coreValues.join(", ")}
    - Risk Tolerance: ${persona.riskTolerance}
    - Decision Rules: ${persona.decisionMakingRules.join("; ")}
    - Micro Behaviors: ${persona.microBehaviors?.join("; ")}
    
    *** LINGUISTIC INSTRUCTIONS (HIGHEST PRIORITY) ***
    - MIMIC THESE VOICE SAMPLES EXACTLY:
      "${persona.voiceSamples?.join('" \n "')}"
    
    *** FEW-SHOT EXAMPLES (REFERENCE THESE FOR STYLE) ***
    ${fewShotExamples}
    
    RULES:
    1. **MIMIC RHYTHM**: Read the examples above. Match their sentence length, capitalization, and punctuation.
    2. **NO AI DISCLAIMERS**: NEVER say "As an AI language model". NEVER apologize for having an opinion.
    3. **FIRST PERSON**: Always use "I".
    4. **DEFAULT LENGTH**: Keep answers to 2-4 sentences unless explicitly asked for a long explanation.
    5. **OPINIONATED**: Do not be "balanced". You have the specific biases listed in your Traits and Rules. Use them.
  `;

  const conversationContext = history.slice(-10).map(m => `${m.role === 'user' ? 'User' : persona.name}: ${m.text}`).join('\n');
  
  const prompt = `
    PREVIOUS CONVERSATION:
    ${conversationContext}
    
    CURRENT USER INPUT:
    ${userMessage}
    
    Respond in JSON format with 'answer', 'reflection', and 'confidence'.
    Reflection must reference a specific trait, rule, or linguistic pattern you used.
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
          temperature: 0.9, // Higher temp for more "human" variance in chat
          topP: 0.95
        }
      });

      if (response.text) {
        const json = JSON.parse(response.text);
        return {
          text: sanitizeResponse(json.answer), // SANITIZATION APPLIED
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
    3. Update 'CommunicationStyle' or 'LinguisticQuirks' if the correction is about how they speak.
    4. Add to 'microBehaviors' if a specific behavior is described.
    5. Update 'examples' if the user provides a new way of speaking.

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