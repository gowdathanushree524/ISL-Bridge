import { Eraser, Hand, Info, Plus, Send, Undo2 } from 'lucide-react';
import type { LanguageCode } from '@/types';
import { SUPPORTED_GESTURES, type IslGesture } from '@/data/islGestures';
import { getLanguage } from '@/data/languages';
import type { GestureReading } from '@/hooks/useGestureRecognition';
import { Button } from '@/components/ui/Button';

interface GestureSentencePanelProps {
  reading: GestureReading;
  words: IslGesture[];
  language: LanguageCode;
  onAddWord: () => void;
  onRemoveLastWord: () => void;
  onClearWords: () => void;
  onSend: () => void;
}

const READING_COPY: Record<Exclude<GestureReading['status'], 'recognised'>, { title: string; body: string }> = {
  idle: { title: 'Waiting for the camera', body: 'Start the camera and show one hand to begin recognition.' },
  'no-hand': { title: 'No hand detected', body: 'Bring one hand into the frame.' },
  'multiple-hands': { title: 'Show one hand at a time', body: 'Two hands in view cannot be classified yet.' },
  unknown: {
    title: 'Unknown gesture',
    body: 'This handshape is not a supported sign, or the match is not confident enough. No word has been added.',
  },
};

function CurrentReading({ reading, language, onAddWord }: Pick<GestureSentencePanelProps, 'language' | 'onAddWord'> & { reading: GestureReading }) {
  if (reading.status !== 'recognised') {
    const copy = READING_COPY[reading.status];
    return (
      <div className="rounded-xl border border-dashed border-navy-200 bg-navy-50/50 p-5">
        <p className="font-semibold text-navy-800">{copy.title}</p>
        <p className="mt-1 text-sm text-navy-500">{copy.body}</p>
      </div>
    );
  }

  const percent = Math.round(reading.confidence * 100);
  return (
    <div className="animate-fade-up rounded-xl bg-teal-50 p-5 ring-1 ring-inset ring-teal-200">
      <p className="text-xs font-semibold uppercase tracking-wide text-teal-800">Recognised handshape</p>
      <p lang={language} className="mt-1 text-3xl font-bold text-navy-900">
        {reading.gesture.translations[language]}
      </p>
      <p className="mt-1 text-sm text-navy-600">{reading.gesture.handShape}</p>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-[160px] flex-1">
          <div className="flex items-center justify-between text-xs font-medium text-navy-600">
            <span>Live confidence</span>
            <span>{percent}%</span>
          </div>
          <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-white" role="meter" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100} aria-label="Recognition confidence">
            <div className="h-full rounded-full bg-teal-600 transition-all duration-300" style={{ width: `${percent}%` }} />
          </div>
        </div>
        <Button onClick={onAddWord}>
          <Plus className="h-4 w-4" aria-hidden="true" />
          Add word
        </Button>
      </div>
    </div>
  );
}

export function GestureSentencePanel({
  reading,
  words,
  language,
  onAddWord,
  onRemoveLastWord,
  onClearWords,
  onSend,
}: GestureSentencePanelProps) {
  const sentence = words.map((word) => word.translations[language]).join(' ');

  return (
    <section aria-labelledby="gesture-heading" className="space-y-5 rounded-2xl bg-white p-5 shadow-card ring-1 ring-navy-100 sm:p-6">
      <header>
        <h2 id="gesture-heading" className="flex items-center gap-2 text-lg font-semibold text-navy-900">
          <Hand className="h-5 w-5 text-teal-600" aria-hidden="true" />
          Handshape recognition
        </h2>
        <p className="mt-1 text-sm text-navy-500">
          Recognises {SUPPORTED_GESTURES.length} static handshapes from your camera. Each word is added only when you press Add word.
        </p>
      </header>

      <div aria-live="polite">
        <CurrentReading reading={reading} language={language} onAddWord={onAddWord} />
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-sm font-semibold text-navy-800">Sentence so far</h3>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={onRemoveLastWord} disabled={words.length === 0}>
              <Undo2 className="h-4 w-4" aria-hidden="true" />
              Undo
            </Button>
            <Button variant="ghost" size="sm" onClick={onClearWords} disabled={words.length === 0}>
              <Eraser className="h-4 w-4" aria-hidden="true" />
              Clear
            </Button>
          </div>
        </div>
        <div className="flex min-h-[56px] flex-wrap items-center gap-2 rounded-xl bg-navy-50/60 p-3">
          {words.length === 0 ? (
            <p className="text-sm text-navy-400">No words yet.</p>
          ) : (
            words.map((word, index) => (
              <span
                key={`${word.id}-${index}`}
                lang={language}
                className="rounded-lg bg-white px-3 py-1.5 text-sm font-semibold text-navy-900 shadow-sm ring-1 ring-navy-200"
              >
                {word.translations[language]}
              </span>
            ))
          )}
        </div>
        <Button onClick={onSend} disabled={words.length === 0} className="w-full sm:w-auto">
          <Send className="h-4 w-4" aria-hidden="true" />
          Send to conversation
        </Button>
        {words.length > 0 && (
          <p className="text-xs text-navy-500">
            Sent in {getLanguage(language).label}: <span lang={language}>{sentence}</span>
          </p>
        )}
      </div>

      <details className="group rounded-xl ring-1 ring-navy-100">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-navy-800 hover:bg-navy-50">
          Supported handshapes ({SUPPORTED_GESTURES.length})
          <Info className="h-4 w-4 text-navy-400 transition group-open:rotate-180" aria-hidden="true" />
        </summary>
        <ul className="divide-y divide-navy-100 border-t border-navy-100">
          {SUPPORTED_GESTURES.map((gesture) => (
            <li key={gesture.id} className="flex flex-col gap-0.5 px-4 py-3">
              <span className="text-sm font-semibold text-navy-900">{gesture.translations.en}</span>
              <span className="text-xs text-navy-500">{gesture.handShape}</span>
            </li>
          ))}
        </ul>
        <p className="border-t border-navy-100 px-4 py-3 text-xs text-navy-500">
          Only these shapes are recognised. Signs that need movement, facial expression or two hands are not recognised yet, and the
          handshape-to-word mapping is a prototype to be reviewed by Deaf ISL signers.
        </p>
      </details>
    </section>
  );
}
