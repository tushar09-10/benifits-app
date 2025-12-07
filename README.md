# BenefitsAI – Intelligent Employee Benefits Discovery

**Created by Singh**

Welcome to **BenefitsAI**, a next-generation frontend application designed to simplify how employees discover and utilize their health benefits. This project was conceptualized and built to demonstrate a seamless, AI-driven user experience that bridges the gap between complex insurance terminology and natural human language.

---

## 🚀 Project Vision

Navigating health benefits is often confusing. Employees struggle to know "what's covered" when they are in pain or have a specific need. 

**My goal with this project was to solve that friction.** 

Instead of browsing through 50-page PDF policy documents, users can simply say, *"I have a toothache"* or *"I need new glasses."* The application uses an intelligent classification system to instantly route them to the relevant benefit, complete with a personalized action plan.

## ✨ Key Features

### 1. 🧠 AI-Powered Classification
At the heart of the app is a smart classification engine. It takes natural language input and categorizes it into key health domains:
- **Dental Care**
- **Vision Coverage**
- **Mental Health Support**
- **Out-Patient Department (OPD)**

### 2. 🌗 Dark Mode Support
I implemented a fully responsive **Dark Mode** to ensure the app is comfortable to use in any lighting environment. This isn't just a color swap—I used semantic CSS variables to ensure high contrast and readability across both themes.

### 3. ⚡ Dynamic Action Plans
The app doesn't just show you a static list. It generates a **context-aware 3-step action plan** based on your specific ailment and the chosen benefit, guiding you from "I have a problem" to "Help received."

### 4. 🎨 Premium UI/UX
Built with a focus on aesthetics and usability:
- **Glassmorphic elements** and soft shadows.
- **Smooth animations** using Framer Motion (page transitions, staggered list views).
- **Responsive design** that works perfectly on mobile and desktop.
- **Accessible Inputs** carefully tuned for visibility and ease of use.

---

## 🛠️ Tech Stack using

I chose a modern, scalable stack for this project to ensure performance and maintainability:

- **Core**: [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) (for type safety and robustness).
- **Build Tool**: [Vite](https://vitejs.dev/) (for lightning-fast development).
- **Styling**: **CSS Modules** with a global semantic variable system. No heavy CSS frameworks were used, ensuring a lightweight bundle and full control over the design system.
- **Animations**: [Framer Motion](https://www.framer.com/motion/) (for declarative, production-ready animations).
- **Icons**: [Lucide React](https://lucide.dev/) (for clean, consistent iconography).

---

## 🏗️ Architecture

I designed the codebase to be **modular** and **scalable**, mimicking a real-world enterprise application structure:

```
src/
├── components/       # Reusable UI building blocks (Buttons, Cards, Layouts)
├── context/          # efficient Global State Management (Theme, User Flow)
├── screens/          # Feature-based screen logic (Input, Classification, Details)
├── services/         # Mock AI Service layer (Clean separation of concerns)
└── types/            # Centralized TypeSript definitions
```

This structure allows for easy testing, separation of concerns, and future scalability (e.g., swapping the mock AI service with a real OpenAI API call).

---

## 🏁 Getting Started

Want to see it in action? Follow these steps to run the project locally on your machine.

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository** (if applicable)
   ```bash
   git clone <repo-url>
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Launch**
   Open your browser and navigate to `http://localhost:5173`.

---

## 🧪 How to Test the Flow

1. **Type a need:** Try entering *"I feel very stressed at work."*
2. **Watch the AI:** The system will classify this as **Mental Health**.
3. **Explore:** You'll see benefits like *"Therapy Sessions"* or *"Wellness Apps."*
4. **Get a Plan:** Click a card to see your personalized 3-step guide.
5. **Toggle Theme:** Click the Moon/Sun icon in the header to switch between Light and Dark modes.

---

## 👨‍💻 About the Author

This project was built by **Singh** as a comprehensive demonstration of modern frontend engineering skills, including React architecture, TypeScript proficiency, and UI/UX design sensibility.

*Thank you for checking out BenefitsAI!*
