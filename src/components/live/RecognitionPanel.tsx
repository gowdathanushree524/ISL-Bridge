import { CheckCircle2, Loader2, RotateCcw, Send } from 'lucide-react';
import type { LanguageCode, Prediction, Scenario, Localized } from '@/types';
import { LOW_CONFIDENCE_THRESHOLD } from '@/data/scenarios';
import type { RecognitionPhase } from '@/hooks/useDemoRecognition';
import type { useSpeech } from '@/hooks/useSpeech';
import { Button } from '@/components/ui/Button';
import { ConfidenceMeter } from '@/components/ui/ConfidenceMeter';
import { DemoLabel } from '@/components/ui/DemoLabel';
import { MeaningGuard } from '@/components/live/MeaningGuard';
import { GrammarBridge } from '@/components/live/GrammarBridge';

type Speech = ReturnType<typeof useSpeech>;

interface RecognitionPanelProps {
  scenario: Scenario | null;
  phase: RecognitionPhase;
  visibleGloss: string[];
  predictions: Prediction[];
  attempt: number;
  confirmed: Prediction | null;
  sent: boolean;
  language: LanguageCode;
  speech: Speech;
  onConfirm: (prediction: Prediction) => void;
  onRetry: () => void;
  onSend: () => void;
}

function EmptyState() {
  return (
    <div className="grid place-items-center rounded-xl border border-dashed border-navy-200 bg-navy-50/50 p-8 text-center">
      <p className="font-semibold text-navy-800">Choose an example to begin</p>
      <p className="mt-1.5 max-w-sm text-sm text-navy-500">
        Select one of the demonstration examples to see its gloss, confidence and confirmation steps.
      </p>
    </div>
  );
}

function localizedPair(localized: Localized, language: LanguageCode) {
  return { primary: localized[language], english: language !== 'en' ? localized.en : null };
}

export function RecognitionPanel(props: RecognitionPanelProps) {
  const { scenario, phase, visibleGloss, predictions, attempt, confirmed, sent, language, speech, onConfirm, onRetry, onSend } = props;

  if (!scenario || phase === 'idle') {
    return (
      <section aria-labelledby="result-heading" className="rounded-2xl bg-white p-5 shadow-card ring-1 ring-navy-100 sm:p-6">
        <ResultHeader />
        <div className="mt-5">
          <EmptyState />
        </div>
      </section>
    );
  }

  const top = predictions[0];
  const isLow = top.confidence < LOW_CONFIDENCE_THRESHOLD;
  const sentence = confirmed ? localizedPair(confirmed.translations, language) : null;

  return (
    <section aria-labelledby="result-heading" className="rounded-2xl bg-white p-5 shadow-card ring-1 ring-navy-100 sm:p-6">
      <ResultHeader />

      {phase === 'analysing' ? (
        <div role="status" className="mt-5 space-y-4">
          <p className="flex items-center gap-2 text-sm font-medium text-navy-700">
            <Loader2 className="h-4 w-4 animate-spin text-indigo-600" aria-hidden="true" />
            Analysing predefined sign sequence (attempt {attempt})...
          </p>
          <GlossChips tokens={visibleGloss} />
        </div>
      ) : (
        <div className="mt-5 space-y-6">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-navy-400">Recognised ISL gloss</p>
            <GlossChips tokens={scenario.gloss} />
            <p className="text-xs font-semibold uppercase tracking-widest text-navy-400">Predicted sentence</p>
            <p className="text-2xl font-bold leading-tight text-navy-900">{top.text}</p>
            <p className="text-xs text-navy-400">Demonstration example, not recognised from your camera.</p>
          </div>

          {!confirmed && isLow && (
            <MeaningGuard
              key={`${scenario.id}-${attempt}`}
              predictions={predictions}
              threshold={LOW_CONFIDENCE_THRESHOLD}
              onConfirm={onConfirm}
              onRetry={onRetry}
            />
          )}

          {!confirmed && !isLow && (
            <div className="space-y-5">
              <ConfidenceMeter value={top.confidence} threshold={LOW_CONFIDENCE_THRESHOLD} />
              <div className="flex flex-wrap gap-3">
                <Button onClick={() => onConfirm(top)}>
                  <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                  Confirm sentence
                </Button>
                <Button variant="secondary" onClick={onRetry}>
                  <RotateCcw className="h-4 w-4" aria-hidden="true" />
                  Retry
                </Button>
              </div>
            </div>
          )}

          {confirmed && sentence && (
            <div className="space-y-5">
              <div role="status" className="rounded-xl bg-teal-50 p-4 ring-1 ring-inset ring-teal-200">
                <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-teal-800">
                  <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                  Confirmed by you
                </p>
                <p lang={language} className="mt-2 text-xl font-bold text-navy-900">
                  {sentence.primary}
                </p>
                {sentence.english && <p className="mt-1 text-sm text-navy-600">{sentence.english}</p>}
              </div>

              <GrammarBridge
                gloss={scenario.gloss}
                natural={confirmed.naturalSentence}
                language={language}
                speechActiveKey={speech.activeKey}
                onSpeak={speech.speak}
                onStop={speech.stop}
              />

              <Button onClick={onSend} disabled={sent} className="w-full sm:w-auto">
                <Send className="h-4 w-4" aria-hidden="true" />
                {sent ? 'Sent to AI' : 'Send to AI'}
              </Button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

function ResultHeader() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <h2 id="result-heading" className="text-lg font-semibold text-navy-900">
        Recognition result
      </h2>
      <DemoLabel>Demo predictions</DemoLabel>
    </div>
  );
}

function GlossChips({ tokens }: { tokens: string[] }) {
  if (tokens.length === 0) return null;
  return (
    <ul className="flex flex-wrap gap-2" aria-label="ISL gloss sequence">
      {tokens.map((token, index) => (
        <li
          key={`${token}-${index}`}
          className="animate-fade-up rounded-lg bg-navy-900 px-3 py-1.5 font-mono text-xs font-semibold tracking-wide text-white"
        >
          {token}
        </li>
      ))}
    </ul>
  );
}
