# ThinkLikeYou 🧠

**ThinkLikeYou** is a privacy-first AI decision-maker and "digital twin" engine. It moves beyond generic AI responses by modeling your specific linguistic fingerprints, behavioral triggers, and core decision-making heuristics.

## ✨ Core Features

### 1. High-Fidelity Persona Modeling
*   **Voice Sample Ingestion**: Uses 6+ specific "Voice Samples" to capture sentence length, punctuation habits, rhythm, and word choice.
*   **Behavioral Scenarios**: Situational questions (lottery wins, missed deadlines, public rudeness) that reveal actual behavior rather than abstract self-perception.
*   **Likert-Scale Intensity**: 5-point scales to capture the *intensity* of traits like risk tolerance, solitude preference, and optimism.
*   **Linguistic Fingerprinting**: The AI analyzes "how" you speak (directness, sarcasm, hedging) as much as "what" you say.

### 2. The Interactive Digital Twin
*   **Persona Chat**: An immersive roleplay experience where the AI adopts your persona, biases, and flaws.
*   **Thought Reflections**: Every response includes a "Reflection" explaining *why* the AI answered that way, referencing specific traits or rules.
*   **Confidence Scoring**: A 1-10 transparency score indicating how well the response aligns with your modeled data.
*   **Output Sanitization**: Proprietary filtering to scrub AI-isms like "As an AI language model," ensuring the first-person perspective is never broken.

### 3. Dynamic Evolution ("That's Not Like Me")
*   **Active Learning**: Use the correction loop to provide feedback on specific responses.
*   **Profile Updating**: The AI updates its internal decision-making rules and traits in real-time based on your corrections.

### 4. Privacy & Security
*   **Volatile In-Memory Processing**: Raw questionnaire answers are held in memory during analysis and never saved to a database.
*   **Abstract Persona Storage**: Only the generated persona profile (traits, rules, values) is stored locally.
*   **Password-Protected Exports**: Export your persona as a JSON file encrypted using **AES-GCM 256-bit encryption** via the Web Crypto API.

## 🛠 Technical Stack
*   **AI Engine**: Google Gemini API (`gemini-2.5-flash` for generation, `gemini-flash-lite-latest` for low-latency chat).
*   **Frontend**: React 19, TypeScript, Tailwind CSS.
*   **Encryption**: Web Crypto API (PBKDF2 for key derivation).
*   **Prompt Engineering**: Advanced Few-Shot injection and Computational Linguistic analysis prompts.

## 🚀 Getting Started
1.  **Assess**: Take the Basic (5 min) or Advanced (12 min) questionnaire.
2.  **Generate**: Watch the AI synthesize your linguistic patterns.
3.  **Refine**: Chat with your twin and use the "That's not like me" feature to sharpen the model.
4.  **Secure**: Export your profile for use across devices or keep it safely stored in your browser's local storage.

---
*Built with privacy at the core. Your thinking, your rules.*