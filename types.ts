export enum ContentType {
    RAW = 'RAW',
    STRUCTURED = 'STRUCTURED',
    KEY_POINTS = 'KEY_POINTS',
    QUIZ = 'QUIZ'
}

export interface A4Theme {
    id: string;
    name: string;
    fontFamilyHeading: string;
    fontFamilyBody: string;
    primaryColor: string;
    secondaryColor: string;
    layoutType: 'standard' | 'two-column' | 'cornell'; // Cornell notes style has a wide margin
    fontSizeScale: number;
}

export interface DocumentState {
    title: string;
    content: string;
    generatedSummary: string;
    generatedKeyPoints: string[];
    generatedQuiz: Question[];
    lastUpdated: number;
}

export interface Question {
    question: string;
    options: string[];
    correctAnswer: number; // Index
}

export interface AIProcessOptions {
    type: 'structure' | 'summarize' | 'quiz' | 'polish';
    content: string;
}