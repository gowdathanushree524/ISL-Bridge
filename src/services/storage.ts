import type { Conversation, Settings } from '@/types';

const CONVERSATIONS_KEY = 'isl-bridge.conversations.v1';
const SETTINGS_KEY = 'isl-bridge.settings.v1';

function readJson(key: string): unknown {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeJson(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage can be full or disabled; the in-memory state still works for this session.
  }
}

export function loadConversations(): Conversation[] {
  const data = readJson(CONVERSATIONS_KEY);
  return Array.isArray(data) ? (data as Conversation[]) : [];
}

export function saveConversations(conversations: Conversation[]) {
  writeJson(CONVERSATIONS_KEY, conversations);
}

export const DEFAULT_SETTINGS: Settings = {
  defaultLanguage: 'en',
  defaultContextMode: 'general',
  showHandLandmarks: true,
};

export function loadSettings(): Settings {
  const data = readJson(SETTINGS_KEY);
  if (!data || typeof data !== 'object') return DEFAULT_SETTINGS;
  return { ...DEFAULT_SETTINGS, ...(data as Partial<Settings>) };
}

export function saveSettings(settings: Settings) {
  writeJson(SETTINGS_KEY, settings);
}
