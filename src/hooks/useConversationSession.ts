import { useState } from 'react';
import { generateReply } from '@/services/dialogueEngine';
import type { ChatMessage, Conversation, ContextMode, LanguageCode, Localized } from '@/types';

export interface SignedSentence {
  scenarioId: string | null;
  recognized: string;
  confirmed: Localized;
  natural: Localized;
}

interface SendOptions {
  sentence: SignedSentence;
  mode: ContextMode;
  language: LanguageCode;
}

function newId() {
  return crypto.randomUUID();
}

function newConversation(mode: ContextMode, language: LanguageCode, sentence?: SignedSentence): Conversation {
  const now = new Date().toISOString();
  return {
    id: newId(),
    title: '',
    contextMode: mode,
    language,
    scenarioId: sentence?.scenarioId ?? null,
    recognizedSentence: sentence?.recognized ?? '',
    confirmedSentence: sentence?.confirmed.en ?? '',
    naturalSentence: sentence?.natural.en ?? '',
    messages: [],
    createdAt: now,
    updatedAt: now,
  };
}

function makeTitle(text: string) {
  const trimmed = text.trim();
  return trimmed.length > 60 ? `${trimmed.slice(0, 57)}...` : trimmed;
}

export function useConversationSession(save: (conversation: Conversation) => void) {
  const [draft, setDraft] = useState<Conversation | null>(null);

  const commit = (next: Conversation) => {
    setDraft(next);
    save(next);
  };

  const sendSignedSentence = ({ sentence, mode, language }: SendOptions) => {
    const base = draft ?? newConversation(mode, language, sentence);
    const now = new Date().toISOString();
    const signerMessage: ChatMessage = {
      id: newId(),
      role: 'signer',
      text: sentence.confirmed.en,
      translations: sentence.confirmed,
      timestamp: now,
    };
    const reply = generateReply({ mode, message: sentence.confirmed.en, history: base.messages });
    const assistantMessage: ChatMessage = {
      id: newId(),
      role: 'assistant',
      text: reply.text.en,
      translations: reply.text,
      replyKey: reply.key,
      timestamp: now,
    };
    const messages = [...base.messages, signerMessage, assistantMessage];
    commit({
      ...base,
      title: base.title || makeTitle(sentence.confirmed.en),
      contextMode: mode,
      language,
      messages,
      updatedAt: now,
    });
  };

  const sendParticipantMessage = (text: string, mode: ContextMode, language: LanguageCode) => {
    const base = draft ?? newConversation(mode, language);
    const now = new Date().toISOString();
    const message: ChatMessage = { id: newId(), role: 'participant', text, timestamp: now };
    commit({
      ...base,
      title: base.title || makeTitle(text),
      messages: [...base.messages, message],
      updatedAt: now,
    });
  };

  const reset = () => setDraft(null);

  return { draft, sendSignedSentence, sendParticipantMessage, reset };
}
