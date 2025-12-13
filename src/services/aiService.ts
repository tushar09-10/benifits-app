import { GoogleGenerativeAI } from '@google/generative-ai';
import type { ActionPlan, Category, Benefit } from '../types';

/**
 * AI Service Module
 * Encapsulates all interactions with the Google Gemini API.
 */

// Initialize Gemini API
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

let genAI: GoogleGenerativeAI | null = null;
if (API_KEY) {
    genAI = new GoogleGenerativeAI(API_KEY);
} else {
    console.warn("VITE_GEMINI_API_KEY is missing. AI features will not work correctly.");
}

const model = genAI ? genAI.getGenerativeModel({ model: "gemini-1.5-flash" }) : null;

export const aiService = {
    /**
     * Classifies the user's free-text need into one of the known categories using Gemini.
     */
    classifyNeed: async (userInput: string): Promise<Category> => {
        console.log(`[AI Service] Classifying with Gemini: "${userInput}"`);

        if (!model) {
            // Fallback or error if no key
            console.error("Gemini API Key missing");
            // Return a default to avoid crashing if user hasn't set env yet, or could throw.
            // For better UX let's return a default but log error.
            return 'OPD';
        }

        try {
            const prompt = `
                Analyze this employee health need: "${userInput}".
                Strictly map it to EXACTLY ONE of these categories: Dental, Vision, Mental Health, OPD.
                Return ONLY the category name. Do not add any punctuation or extra text.
            `;

            const result = await model.generateContent(prompt);
            const response = result.response;
            const text = response.text().trim();

            console.log(`[AI Service] Gemini Response: "${text}"`);

            // Validate response against allowed categories
            const validCategories: Category[] = ['Dental', 'Vision', 'Mental Health', 'OPD'];
            const matchedCategory = validCategories.find(c => c.toLowerCase() === text.toLowerCase());

            return matchedCategory || 'OPD'; // Default to OPD if unclear
        } catch (error) {
            console.error("AI Classification Failed:", error);
            return 'OPD'; // Fallback
        }
    },

    /**
     * Generates a structural 3-step action plan using Gemini.
     */
    generateActionPlan: async (userNeed: string, benefit: Benefit): Promise<ActionPlan> => {
        console.log(`[AI Service] Generating plan for: "${userNeed}" with benefit "${benefit.title}"`);

        if (!model) {
            return {
                steps: [
                    { step: 1, title: 'Configuration Error', description: 'Please set VITE_GEMINI_API_KEY in .env file.' },
                    { step: 2, title: 'Restart Server', description: 'Restart the dev server after adding the key.' },
                    { step: 3, title: 'Try Again', description: 'Refresh the page.' }
                ]
            };
        }

        try {
            const prompt = `
                Context: Employee needs help with "${userNeed}".
                Benefit available: "${benefit.title}" (Category: ${benefit.category}).
                Task: Create a friendly, clear 3-step action plan for the employee to use this benefit.
                Output Format: JSON only, with this structure:
                {
                    "steps": [
                        { "step": 1, "title": "...", "description": "..." },
                        { "step": 2, "title": "...", "description": "..." },
                        { "step": 3, "title": "...", "description": "..." }
                    ]
                }
                Do not include markdown formatting like \`\`\`json. Just the raw JSON string.
            `;

            const result = await model.generateContent(prompt);
            const response = result.response;
            let text = response.text().trim();

            // Clean up if model adds markdown
            if (text.startsWith('```json')) text = text.replace('```json', '').replace('```', '');
            if (text.startsWith('```')) text = text.replace('```', '');

            const plan: ActionPlan = JSON.parse(text);
            return plan;

        } catch (error) {
            console.error("AI Plan Generation Failed:", error);
            // Fallback static plan on error
            return {
                steps: [
                    { step: 1, title: 'Error', description: 'Could not generate AI plan.' },
                    { step: 2, title: 'Contact Support', description: 'Please reach out to HR for finding details.' },
                    { step: 3, title: 'Check internet', description: 'Ensure you are connected to the internet.' }
                ]
            };
        }
    }
};
