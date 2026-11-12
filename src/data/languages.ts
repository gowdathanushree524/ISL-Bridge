import type { ContextMode, LanguageCode } from '@/types';

export const LANGUAGES: { code: LanguageCode; label: string; nativeLabel: string; locale: string }[] = [
  { code: 'en', label: 'English', nativeLabel: 'English', locale: 'en-IN' },
  { code: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी', locale: 'hi-IN' },
  { code: 'kn', label: 'Kannada', nativeLabel: 'ಕನ್ನಡ', locale: 'kn-IN' },
];

export const CONTEXT_MODES: { id: ContextMode; label: string; description: string }[] = [
  { id: 'general', label: 'General Conversation', description: 'Everyday small talk and simple questions.' },
  { id: 'hospital', label: 'Hospital Mode', description: 'Symptoms, location of pain, and duration questions.' },
  { id: 'police', label: 'Police Assistance Mode', description: 'Safety checks and short incident questions.' },
  { id: 'education', label: 'Education Mode', description: 'Classroom questions and lesson clarification.' },
  { id: 'shopping', label: 'Shopping Mode', description: 'Product requests and purchase questions.' },
];

export function getLanguage(code: LanguageCode) {
  return LANGUAGES.find((language) => language.code === code) ?? LANGUAGES[0];
}

export function getContextMode(id: ContextMode) {
  return CONTEXT_MODES.find((mode) => mode.id === id) ?? CONTEXT_MODES[0];
}
