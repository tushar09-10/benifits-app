export type Category = 'Dental' | 'Vision' | 'Mental Health' | 'OPD';

export type Benefit = {
    id: string;
    category: Category;
    title: string;
    coverage: string;
    description: string;
};

export type ActionPlanStep = {
    step: number;
    title: string;
    description: string;
};

export type ActionPlan = {
    steps: ActionPlanStep[];
};

export type MessageType = 'user' | 'bot' | 'system';

export type AppStep = 'input' | 'classifying' | 'list' | 'details';
