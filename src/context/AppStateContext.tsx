import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { AppStep, Category, Benefit, ActionPlan } from '../types';

interface AppState {
    step: AppStep;
    userInput: string;
    classification: Category | null;
    selectedBenefit: Benefit | null;
    actionPlan: ActionPlan | null;
    error: string | null;
    history: AppStep[];
    theme: 'light' | 'dark';
}

interface AppContextProps extends AppState {
    setUserInput: (input: string) => void;
    setClassification: (category: Category | null) => void;
    setSelectedBenefit: (benefit: Benefit | null) => void;
    setActionPlan: (plan: ActionPlan | null) => void;
    setError: (error: string | null) => void;
    setStep: (step: AppStep) => void;
    toggleTheme: () => void;
    resetApp: () => void;
    goToNextStep: () => void;
    goBack: () => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [step, setStepState] = useState<AppStep>('input');
    const [userInput, setUserInput] = useState('');
    const [classification, setClassification] = useState<Category | null>(null);
    const [selectedBenefit, setSelectedBenefit] = useState<Benefit | null>(null);
    const [actionPlan, setActionPlan] = useState<ActionPlan | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [history, setHistory] = useState<AppStep[]>([]);
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    const setStep = (newStep: AppStep) => {
        setHistory((prev) => [...prev, step]);
        setStepState(newStep);
    };

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    // Sync theme to DOM
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const goBack = () => {
        if (history.length > 0) {
            const prevStep = history[history.length - 1];
            setHistory((prev) => prev.slice(0, -1));
            setStepState(prevStep);
            setError(null); // Clear errors on back
        }
    };

    const resetApp = () => {
        setStepState('input');
        setUserInput('');
        setClassification(null);
        setSelectedBenefit(null);
        setActionPlan(null);
        setError(null);
        setHistory([]);
    };

    const goToNextStep = () => {
        // Simple convenience method if linear flow is strictly followed
        // But explicit setStep is safer
    };

    return (
        <AppContext.Provider
            value={{
                step,
                userInput,
                classification,
                selectedBenefit,
                actionPlan,
                error,
                history,
                theme,
                setUserInput,
                setClassification,
                setSelectedBenefit,
                setActionPlan,
                setError,
                setStep,
                toggleTheme,
                resetApp,
                goToNextStep,
                goBack
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useAppState = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppState must be used within an AppProvider');
    }
    return context;
};
