import { useMemo, useState } from 'react';
import { Search, Trash2, X, HardDrive } from 'lucide-react';
import type { AppRoute } from '@/hooks/useHashRoute';
import type { Conversation } from '@/types';
import { AppLayout } from '@/layouts/AppLayout';
import { useConversationHistory } from '@/hooks/useConversationHistory';
import { getContextMode, getLanguage } from '@/data/languages';
import { formatDateTime, formatTime } from '@/utils/format';
import { Button } from '@/components/ui/Button';
import { DemoLabel } from '@/components/ui/DemoLabel';

function matches(conversation: Conversation, query: string) {
  const haystack = [
    conversation.title,
    conversation.recognizedSentence,
    conversation.confirmedSentence,
    conversation.naturalSentence,
    getContextMode(conversation.contextMode).label,
    ...conversation.messages.map((message) => message.text),
  ]
    .join(' ')
    .toLowerCase();
  return haystack.includes(query);
}

export function HistoryPage({ route }: { route: AppRoute }) {
  const { conversations, remove, clearAll } = useConversationHistory();
  const [query, setQuery] = useState('');
  const [openId, setOpenId] = useState<string | null>(null);
  const [confirmingClear, setConfirmingClear] = useState(false);

  const normalized = query.trim().toLowerCase();
  const visible = useMemo(
    () => (normalized ? conversations.filter((item) => matches(item, normalized)) : conversations),
    [conversations, normalized],
  );
  const open = conversations.find((item) => item.id === openId) ?? null;

  const handleDelete = (id: string) => {
    remove(id);
    if (openId === id) setOpenId(null);
  };

  const handleClearAll = () => {
    clearAll();
    setOpenId(null);
    setConfirmingClear(false);
  };

  return (
    <AppLayout route={route}>
      <div className="animate-fade-up space-y-6">
        <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold text-teal-700">Conversation history</p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight text-navy-900">Your saved conversations</h1>
            <p className="mt-2 flex items-start gap-2 text-sm text-navy-500">
              <HardDrive className="mt-0.5 h-4 w-4 shrink-0 text-navy-400" aria-hidden="true" />
              Stored only in this browser as local demo storage. This is not a cloud database.
            </p>
          </div>
          {conversations.length > 0 && (
            confirmingClear ? (
              <div className="flex items-center gap-2 rounded-xl bg-red-50 p-2 ring-1 ring-red-200">
                <span className="px-2 text-sm font-medium text-red-800">Delete all conversations?</span>
                <Button variant="danger" size="sm" onClick={handleClearAll}>Yes, clear all</Button>
                <Button variant="ghost" size="sm" onClick={() => setConfirmingClear(false)}>Cancel</Button>
              </div>
            ) : (
              <Button variant="danger" onClick={() => setConfirmingClear(true)}>
                <Trash2 className="h-4 w-4" aria-hidden="true" />
                Clear all history
              </Button>
            )
          )}
        </header>

        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <section aria-label="Conversation list" className="rounded-2xl bg-white p-5 shadow-card ring-1 ring-navy-100">
            <label className="relative block">
              <span className="sr-only">Search conversations</span>
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" aria-hidden="true" />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search sentences, replies or modes"
                className="h-11 w-full rounded-xl border border-navy-200 bg-white pl-10 pr-4 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </label>

            {conversations.length === 0 ? (
              <div className="mt-6 rounded-xl border border-dashed border-navy-200 p-8 text-center">
                <p className="font-semibold text-navy-800">No history yet</p>
                <p className="mt-1 text-sm text-navy-500">Conversations you send to the AI are saved here automatically.</p>
              </div>
            ) : visible.length === 0 ? (
              <p className="mt-6 text-center text-sm text-navy-500">No conversations match "{query}".</p>
            ) : (
              <ul className="mt-5 space-y-2">
                {visible.map((conversation) => {
                  const active = conversation.id === openId;
                  return (
                    <li key={conversation.id} className={`flex items-center gap-2 rounded-xl ring-1 transition ${active ? 'bg-indigo-50 ring-indigo-300' : 'ring-navy-100 hover:bg-navy-50'}`}>
                      <button
                        type="button"
                        onClick={() => setOpenId(conversation.id)}
                        aria-current={active ? 'true' : undefined}
                        className="min-w-0 flex-1 p-4 text-left"
                      >
                        <span className="block truncate font-semibold text-navy-900">{conversation.title || 'Untitled conversation'}</span>
                        <span className="mt-1 flex flex-wrap items-center gap-2 text-xs text-navy-500">
                          <span>{getContextMode(conversation.contextMode).label}</span>
                          <span aria-hidden="true">-</span>
                          <time dateTime={conversation.updatedAt}>{formatDateTime(conversation.updatedAt)}</time>
                        </span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(conversation.id)}
                        aria-label={`Delete conversation ${conversation.title || ''}`}
                        className="mr-3 grid h-9 w-9 shrink-0 place-items-center rounded-lg text-navy-400 transition hover:bg-red-50 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>

          <section aria-label="Conversation detail" className="min-h-[360px] rounded-2xl bg-white p-5 shadow-card ring-1 ring-navy-100 sm:p-6">
            {open ? (
              <div className="space-y-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h2 className="truncate text-lg font-semibold text-navy-900">{open.title || 'Untitled conversation'}</h2>
                    <p className="mt-1 text-sm text-navy-500">
                      {getContextMode(open.contextMode).label} - saved in {getLanguage(open.language).label}
                    </p>
                  </div>
                  <button type="button" onClick={() => setOpenId(null)} aria-label="Close conversation" className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-navy-500 hover:bg-navy-100">
                    <X className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>

                {open.recognizedSentence && (
                  <dl className="grid gap-3 rounded-xl bg-navy-50 p-4 text-sm ring-1 ring-navy-100">
                    <div>
                      <dt className="text-xs font-semibold text-navy-400">Recognised sentence</dt>
                      <dd className="font-medium text-navy-900">{open.recognizedSentence} <DemoLabel>Demo</DemoLabel></dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold text-navy-400">Confirmed sentence</dt>
                      <dd className="font-medium text-navy-900">{open.confirmedSentence}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold text-navy-400">Natural sentence</dt>
                      <dd className="font-medium text-navy-900">{open.naturalSentence}</dd>
                    </div>
                  </dl>
                )}

                <ol className="space-y-3">
                  {open.messages.map((message) => {
                    const text = message.translations?.[open.language] ?? message.text;
                    return (
                      <li key={message.id} className={`rounded-xl p-3.5 text-sm ${message.role === 'signer' ? 'ml-8 bg-indigo-50 text-indigo-950' : message.role === 'assistant' ? 'mr-8 bg-white ring-1 ring-navy-100' : 'mr-8 bg-navy-100/60'}`}>
                        <p className="text-xs font-semibold text-navy-500">
                          {message.role === 'signer' ? 'Signer' : message.role === 'assistant' ? 'AI assistant' : 'Other participant'} - {formatTime(message.timestamp)}
                        </p>
                        <p lang={message.translations ? open.language : undefined} className="mt-1 font-medium">{text}</p>
                      </li>
                    );
                  })}
                </ol>
              </div>
            ) : (
              <div className="grid h-full min-h-[300px] place-items-center text-center">
                <div>
                  <p className="font-semibold text-navy-800">Select a conversation</p>
                  <p className="mt-1 text-sm text-navy-500">Its signed sentences and replies will appear here.</p>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </AppLayout>
  );
}
