# AI-Powered Benefits Discovery Flow

A production-quality React + TypeScript application that demonstrates an AI-powered flow for discovering employee health benefits.

## Project Overview

This application addresses **Problem Statement 4: AI-Powered Benefits Discovery Flow**. It simulates an intelligent assistant that takes a user's natural language health need, classifies it into a benefit category, displays relevant benefits, and generates a personalized 3-step action plan.

### Key Features
- **Natural Language Input**: Users can type symptoms like "I have a toothache".
- **AI Classification** (Mocked): Intelligent routing to categories (Dental, Vision, Mental Health, OPD).
- **Benefit Discovery**: Dynamic list of benefits based on the classified category.
- **AI Action Plans** (Mocked): Generates context-aware, 3-step guides on how to avail a specific benefit.
- **Polished UI**: Modern, accessible design with smooth transitions using Framer Motion.

## Setup & Demo

### Prerequisites
- Node.js (v16+)
- npm

### Installation
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the App
Start the development server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

## Architecture

The project follows a clean, modular structure emphasizing separation of concerns.

```
src/
├── components/
│   └── common/       # Reusable UI components (Button, Card, Loader, Layout)
├── context/
│   └── AppStateContext.tsx  # Global state management using React Context
├── screens/          # Feature screens
│   ├── InputScreen/
│   ├── ClassificationScreen/
│   ├── BenefitListScreen/
│   └── BenefitDetailsScreen/
├── services/
│   └── aiService.ts  # Centralized AI interaction layer (Mocked)
├── data/
│   └── benefits.ts   # Mock data
└── types/            # TypeScript definitions
```

### State Management
We use **React Context (`AppStateContext`)** to manage the global application state. This includes:
- `step`: Controls the navigation flow (Input -> Classifying -> List -> Details).
- `userInput`: Persists the user's initial query.
- `classification`: Stores the AI-determined category.
- `selectedBenefit`: Stores the currently viewed benefit.
- `actionPlan`: Stores the generated 3-step plan.

This approach avoids prop drilling and makes it easy to maintain the session state across the flow.

## AI Prompts & Engineering

Although the backend is mocked, the application is designed with specific prompts in mind. The `aiService` documents these prompts explicitly.

### 1. Classification Prompt
**Goal**: Classify user input into exactly one category: `Dental`, `Vision`, `Mental Health`, `OPD`.

**Refined Prompt**:
> "Return ONLY one category name from {Dental, OPD, Vision, Mental Health} that best matches this employee health need: {user_input}. Respond with just the category word and nothing else."

**Handling Malformed Output**:
- The system is designed to handle cases where the AI might fail or return invalid data by catching errors and providing a fallback "OPD" classification or a user-friendly error state with a Retry option.

### 2. Action Plan Prompt
**Goal**: Generate a structured 3-step plan.

**Prompt**:
> "Based on the following employee need: '{user_need}' and benefit details: '{benefit_title}', generate a clear 3-step action plan explaining how the employee can avail this benefit. Return 3 numbered steps in simple, friendly language."

## UI/UX Choices
- **CSS Modules**: Used for scoped, maintainable styling without the overhead of heavy CSS-in-JS libraries.
- **Design System**: Global CSS variables in `index.css` ensure consistency in colors, typography, and spacing.
- **Framer Motion**: Used for subtle entrance animations and smooth page transitions to enhance the "premium" feel.
- **Accessibility**: Semantic HTML, clear focus states, and text contrast (though full WCAG compliance would require an audit).

## Known Issues & Improvements
- **Classification Accuracy**: Since this is using a keyword-based mock, ambiguous inputs like "my head hurts" might default to OPD or Mental Health strictly based on mock logic. A real LLM would handle nuance better.
- **Persistent State**: Refreshing the page resets the flow. A future improvement would be to persist `AppState` to `localStorage`.
- **Backend Integration**: The `aiService` is ready to be swapped with a real `fetch` call to OpenAI or Anthropic API.

## Bonus
- **Animations**: Added card hover effects and page transitions.
- **Responsive**: Fully responsive layout that works on mobile.
- **Error Recovery**: Robust "Try Again" and "Back" flows.
