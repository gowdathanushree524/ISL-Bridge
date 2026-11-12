import { useState, type FormEvent } from 'react';
import { MessageSquareText, RotateCcw, Send, Square, Volume2, Info } from 'lucide-react';
import type { ChatMessage, ContextMode, Conversation, LanguageCode } from '@/types';
import { FOLLOW_UP_SIGNS, type FollowUpSign } from '@/data/followUps';
import { getLanguage } from '@/data/languages';
import { formatTime } from '@/utils/format';
import { ContextModeSelect } from '@/components/ui/ContextModeSelect';
import { SpeakButton } from '@/components/ui/SpeakButton';
import { Button } from '@/components/ui/Button';
import { DemoLabel } from '@/components/ui/DemoLabel';
import type { useSpeech } from '@/hooks/useSpeech';

type Speech = ReturnType<typeof useSpeech>;

interface ConversationPanelProps {
  draft: Conversation | null;
  contextMode: ContextMode;
  onModeChange: (mode: ContextMode) => void;
  language: LanguageCode;
  speech: Speech;
  onSendFollowUp: (sign: FollowUpSign) => void;
  onSendParticipant: (text: string) => void;
  onReset: () => void;
}

function ChatBubble({ message, language, speech }: { message: ChatMessage; language: LanguageCode; speech: Speech }) {
  const isSigner = message.role === 'signer';
  const isParticipant = message.role === 'participant';
  const localized = message.translations?.[language] ?? message.text;
  const speakKey = `msg-${message.id}`;
  const shownOriginal = message.translations && language !== 'en' ? message.text : null;

  const label = isSigner ? 'Signer' : isParticipant ? 'Other participant' : 'AI assistant';

  return (
    <div className={`flex ${isSigner ? 'justify-end' : 'justify-start'} animate-fade-up`}>
      <div className={`max-w-[85%] sm:max-w-[72%] ${isSigner ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
        <span className="px-1 text-xs font-medium text-navy-400">{label}</span>
        <div
          className={`rounded-2xl px-4 py-3 shadow-sm ${
            isSigner
              ? 'rounded-br-md bg-indigo-600 text-white'
              : isParticipant
                ? 'rounded-bl-md bg-navy-100 text-navy-900'
                : 'rounded-bl-md bg-white text-navy-900 ring-1 ring-navy-100'
          }`}
        >
          <p lang={message.translations ? language : undefined} className="text-[15px] font-medium leading-relaxed">
            {localized}
          </p>
          {shownOriginal && (
            <p className={`mt-1 text-xs ${isSigner ? 'text-indigo-100' : 'text-navy-500'}`}>{shownOriginal}</p>
          )}
        </div>
        <div className="flex items-center gap-2 px-1">
          <time dateTime={message.timestamp} className="text-xs text-navy-400">
            {formatTime(message.timestamp)}
          </time>
          {message.translations && (
            <SpeakButton
              active={speech.activeKey === speakKey}
              onSpeak={() => speech.speak(speakKey, localized, language)}
              onStop={speech.stop}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export function ConversationPanel({
  draft,
  contextMode,
  onModeChange,
  language,
  speech,
  onSendFollowUp,
  onSendParticipant,
  onReset,
}: ConversationPanelProps) {
  const [participantText, setParticipantText] = useState('');
  const messages = draft?.messages ?? [];
  const hasConversation = messages.length > 0;

  const handleParticipantSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const text = participantText.trim();
    if (!text) return;
    onSendParticipant(text);
    setParticipantText('');
  };

  return (
    <section aria-labelledby="conversation-heading" className="rounded-2xl bg-white shadow-card ring-1 ring-navy-100">
      <header className="flex flex-col gap-4 border-b border-navy-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div>
          <h2 id="conversation-heading" className="flex items-center gap-2 text-lg font-semibold text-navy-900">
            <MessageSquareText className="h-5 w-5 text-teal-600" aria-hidden="true" />
            Context-aware dialogue
          </h2>
          <p className="mt-1 flex flex-wrap items-center gap-2 text-sm text-navy-500">
            Replies come from the local demo dialogue engine
            <DemoLabel>Local demo engine</DemoLabel>
          </p>
        </div>
        <div className="flex flex-wrap items-end gap-3">
          <div className="min-w-[220px]">
            <ContextModeSelect value={contextMode} onChange={onModeChange} />
          </div>
          <Button variant="secondary" size="sm" onClick={speech.replay} disabled={!speech.supported}>
            <Volume2 className="h-4 w-4" aria-hidden="true" />
            Replay
          </Button>
          <Button variant="secondary" size="sm" onClick={speech.stop} disabled={!speech.supported}>
            <Square className="h-3.5 w-3.5" aria-hidden="true" />
            Stop
          </Button>
          <Button variant="ghost" size="sm" onClick={onReset} disabled={!hasConversation}>
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Reset conversation
          </Button>
        </div>
      </header>

      {speech.notice && (
        <p role="status" className="mx-5 mt-4 flex gap-2 rounded-xl bg-amber-50 p-3 text-sm text-amber-900 ring-1 ring-inset ring-amber-200 sm:mx-6">
          <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          {speech.notice}
        </p>
      )}

      <div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-[1fr_280px]">
        <div className="flex min-h-[320px] flex-col">
          <div
            role="log"
            aria-live="polite"
            aria-label="Conversation messages"
            className="flex flex-1 flex-col gap-5 rounded-xl bg-navy-50/50 p-4 sm:p-5"
          >
            {hasConversation ? (
              messages.map((message) => (
                <ChatBubble key={message.id} message={message} language={language} speech={speech} />
              ))
            ) : (
              <div className="grid flex-1 place-items-center py-10 text-center">
                <div className="max-w-sm space-y-2">
                  <p className="font-semibold text-navy-800">No messages yet</p>
                  <p className="text-sm text-navy-500">
                    Confirm a sentence above and send it to the AI, or start with a follow-up sign on the right.
                  </p>
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleParticipantSubmit} className="mt-4 flex flex-col gap-2 sm:flex-row">
            <label htmlFor="participant-input" className="sr-only">
              Type a reply for the other participant
            </label>
            <input
              id="participant-input"
              value={participantText}
              onChange={(event) => setParticipantText(event.target.value)}
              placeholder="Other participant types a reply (shown in the language typed)"
              maxLength={300}
              className="h-11 flex-1 rounded-xl border border-navy-200 bg-white px-4 text-sm text-navy-900 placeholder:text-navy-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
            <Button type="submit" disabled={!participantText.trim()}>
              <Send className="h-4 w-4" aria-hidden="true" />
              Send
            </Button>
          </form>
          <p className="mt-2 text-xs text-navy-400">Typed replies are not translated automatically in this demo.</p>
        </div>

        <aside aria-label="Demonstration signer replies" className="space-y-3">
          <div>
            <p className="text-sm font-semibold text-navy-800">Demo signer replies</p>
            <p className="text-xs text-navy-500">Predefined follow-up signs to continue the conversation.</p>
          </div>
          <div className="grid gap-2">
            {FOLLOW_UP_SIGNS.map((sign) => (
              <button
                key={sign.id}
                type="button"
                onClick={() => onSendFollowUp(sign)}
                className="rounded-xl bg-white px-3.5 py-2.5 text-left text-sm font-medium text-navy-800 ring-1 ring-navy-200 transition hover:-translate-y-0.5 hover:bg-indigo-50 hover:ring-indigo-300"
              >
                <span className="block">{sign.translations[language]}</span>
                <span className="block text-xs text-navy-400">
                  {language === 'en' ? sign.text : `${sign.text} (${getLanguage('en').label})`}
                </span>
              </button>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
