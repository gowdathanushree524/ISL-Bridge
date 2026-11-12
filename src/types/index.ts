export type LanguageCode = 'en' | 'hi' | 'kn';

export type Localized = Record<LanguageCode, string>;

export type ContextMode = 'general' | 'hospital' | 'police' | 'education' | 'shopping';

export interface Prediction {
  id: string;
  text: string;
  confidence: number;
  translations: Localized;
  naturalSentence: Localized;
}

export interface Scenario {
  id: string;
  title: string;
  summary: string;
  contextMode: ContextMode;
  gloss: string[];
  predictions: Prediction[];
  retryPredictions?: Prediction[];
}

export interface ChatMessage {
  id: string;
  role: 'signer' | 'assistant' | 'participant';
  text: string;
  translations?: Localized;
  replyKey?: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  title: string;
  contextMode: ContextMode;
  language: LanguageCode;
  scenarioId: string | null;
  recognizedSentence: string;
  confirmedSentence: string;
  naturalSentence: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
}

export interface Phrase {
  id: string;
  label: string;
  translations: Localized;
}

export interface DemoUser {
  id: string;
  name: string;
  email: string;
  location: string;
}

export interface Settings {
  defaultLanguage: LanguageCode;
  defaultContextMode: ContextMode;
  showHandLandmarks: boolean;
}
