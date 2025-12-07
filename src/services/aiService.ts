import type { ActionPlan, Category, Benefit } from '../types';

/**
 * AI Service Module
 * Encapsulates all interactions with the AI (mocked for now).
 * Designed to be easily swappable with a real API like OpenAI.
 */

// Delays to simulate network latency
const CLASSIFICATION_DELAY_MS = 1500;
const ACTION_PLAN_DELAY_MS = 2500;

export const aiService = {
    /**
     * Classifies the user's free-text need into one of the known categories.
     * 
     * PROMPT DESIGN:
     * "Return ONLY one category name from {Dental, OPD, Vision, Mental Health} that best matches this employee health need: {user_input}. Respond with just the category word and nothing else."
     */
    classifyNeed: async (userInput: string): Promise<Category> => {
        console.log(`[AI Service] Classifying: "${userInput}"`);

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const lowerInput = userInput.toLowerCase();

                // Mock Logic: Simple keyword matching
                if (lowerInput.includes('tooth') || lowerInput.includes('dental') || lowerInput.includes('cavity') || lowerInput.includes('gum')) {
                    resolve('Dental');
                } else if (lowerInput.includes('eye') || lowerInput.includes('vision') || lowerInput.includes('glasses') || lowerInput.includes('blur')) {
                    resolve('Vision');
                } else if (lowerInput.includes('sad') || lowerInput.includes('stress') || lowerInput.includes('depress') || lowerInput.includes('mental') || lowerInput.includes('anxiety')) {
                    resolve('Mental Health');
                } else if (lowerInput.includes('fever') || lowerInput.includes('pain') || lowerInput.includes('doctor') || lowerInput.includes('sick')) {
                    resolve('OPD');
                } else {
                    // Fallback for vague inputs, as requested
                    // In a real system, we might ask for clarification or default to OPD.
                    // Randomly picking OPD or rejecting if empty? 
                    if (userInput.trim().length === 0) reject(new Error("Input cannot be empty"));
                    else resolve('OPD'); // Default catch-all
                }
            }, CLASSIFICATION_DELAY_MS);
        });
    },

    /**
     * Generates a structural 3-step action plan.
     * 
     * PROMPT DESIGN:
     * "Based on the following employee need: '{user_need}' and benefit details: '{benefit_title}', generate a clear 3-step action plan explaining how the employee can avail this benefit. Return 3 numbered steps in simple, friendly language."
     */
    generateActionPlan: async (userNeed: string, benefit: Benefit): Promise<ActionPlan> => {
        console.log(`[AI Service] Generating plan for: "${userNeed}" with benefit "${benefit.title}"`);

        return new Promise((resolve) => {
            setTimeout(() => {
                // Mock Response Generation based on benefit category
                const plan: ActionPlan = {
                    steps: []
                };

                switch (benefit.category) {
                    case 'Dental':
                        plan.steps = [
                            { step: 1, title: 'Find a Clinic', description: `Log in to the portal to find a network dental clinic near you.` },
                            { step: 2, title: 'Book Appointment', description: `Call the clinic and mention your corporate plan ID: PLUM-CORP-01.` },
                            { step: 3, title: 'Walk-in & Treat', description: `Show your e-card at the reception. No cash needed for covered procedures.` }
                        ];
                        break;
                    case 'Vision':
                        plan.steps = [
                            { step: 1, title: 'Check Allowance', description: `Verify your remaining vision allowance on the dashboard.` },
                            { step: 2, title: 'Visit Optician', description: `Visit any partner optical store (e.g., Lenskart) for an eye exam.` },
                            { step: 3, title: 'Claim Reimbursement', description: `Upload the invoice in the claims section to get reimbursed up to limit.` }
                        ];
                        break;
                    case 'Mental Health':
                        plan.steps = [
                            { step: 1, title: 'Browse Therapists', description: `Filter therapists by specialization (Anxiety, Stress, etc.) in the app.` },
                            { step: 2, title: 'Schedule Session', description: `Book a slot that works for you. First 5 sessions are free.` },
                            { step: 3, title: 'Join Video Call', description: `Click the meeting link 5 minutes before your session starts.` }
                        ];
                        break;
                    case 'OPD':
                    default:
                        plan.steps = [
                            { step: 1, title: 'Locate Doctor', description: `Use the "Find Doctors" feature to spot a GP nearby.` },
                            { step: 2, title: 'Consultation', description: `Visit the doctor and pay via the corporate wellness card.` },
                            { step: 3, title: 'Upload Prescription', description: `For medicine delivery, upload the prescription to the pharmacy tab.` }
                        ];
                        break;
                }

                resolve(plan);
            }, ACTION_PLAN_DELAY_MS);
        });
    }
};
