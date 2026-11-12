import { useEffect, useState } from 'react';
import type { Conversation } from '@/types';
import { loadConversations, saveConversations } from '@/services/storage';

export function useConversationHistory() {
  const [conversations, setConversations] = useState<Conversation[]>(loadConversations);

  useEffect(() => {
    saveConversations(conversations);
  }, [conversations]);

  const save = (conversation: Conversation) => {
    setConversations((current) =>
      [conversation, ...current.filter((item) => item.id !== conversation.id)].sort((a, b) =>
        b.updatedAt.localeCompare(a.updatedAt),
      ),
    );
  };

  const remove = (id: string) => {
    setConversations((current) => current.filter((item) => item.id !== id));
  };

  const clearAll = () => setConversations([]);

  return { conversations, save, remove, clearAll };
}
