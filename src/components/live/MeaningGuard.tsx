import { useState } from 'react';
import { AlertTriangle, CheckCircle2, RotateCcw, ShieldAlert } from 'lucide-react';
import type { Prediction } from '@/types';
import { ConfidenceMeter } from '@/components/ui/ConfidenceMeter';
import { Button } from '@/components/ui/Button';

interface MeaningGuardProps {
  predictions: Prediction[];
  threshold: number;
  onConfirm: (prediction: Prediction) => void;
  onRetry: () => void;
}

export function MeaningGuard({ predictions, threshold, onConfirm, onRetry }: MeaningGuardProps) {
  const [selectedId, setSelectedId] = useState<string | null>(predictions[0]?.id ?? null);
  const top = predictions[0];
  const selected = predictions.find((item) => item.id === selectedId) ?? null;

  return (
    <section
      aria-labelledby="meaning-guard-heading"
      className="relative overflow-hidden rounded-2xl bg-white p-5 shadow-lifted ring-2 ring-amber-400 sm:p-6"
    >
      <span className="absolute inset-y-0 left-0 w-1.5 bg-amber-400" aria-hidden="true" />

      <div className="flex items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-amber-100 text-amber-700">
          <ShieldAlert className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-amber-700">ISL MeaningGuard</p>
          <h3 id="meaning-guard-heading" className="mt-0.5 text-xl font-bold text-navy-900">
            Could you confirm what you meant?
          </h3>
        </div>
      </div>

      <div role="status" className="mt-4 flex gap-3 rounded-xl bg-amber-50 p-3.5 text-sm text-amber-900 ring-1 ring-inset ring-amber-200">
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
        <p>
          Low confidence: the top prediction is {Math.round(top.confidence * 100)}%, below the{' '}
          {Math.round(threshold * 100)}% review threshold. Choose the sentence you intended before it is sent.
        </p>
      </div>

      <div className="mt-5">
        <ConfidenceMeter value={top.confidence} threshold={threshold} />
      </div>

      <fieldset className="mt-6">
        <legend className="mb-3 text-sm font-semibold text-navy-700">Alternative predictions (demonstration values)</legend>
        <div className="grid gap-3">
          {predictions.map((prediction, index) => {
            const active = prediction.id === selectedId;
            return (
              <label
                key={prediction.id}
                className={`flex cursor-pointer items-center gap-4 rounded-xl p-4 ring-1 transition-all duration-200 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-indigo-500 ${
                  active ? 'bg-indigo-50 ring-2 ring-indigo-500' : 'bg-white ring-navy-200 hover:ring-navy-300'
                }`}
              >
                <input
                  type="radio"
                  name="meaning-guard-option"
                  value={prediction.id}
                  checked={active}
                  onChange={() => setSelectedId(prediction.id)}
                  className="h-4 w-4 accent-indigo-600"
                />
                <span className="flex-1">
                  <span className="block text-xs font-semibold text-navy-400">Option {index + 1}</span>
                  <span className="block font-semibold text-navy-900">{prediction.text}</span>
                </span>
                <span className="w-16 text-right text-sm font-bold tabular-nums text-navy-700">
                  {Math.round(prediction.confidence * 100)}%
                </span>
              </label>
            );
          })}
          <button
            type="button"
            onClick={onRetry}
            className="flex items-center gap-4 rounded-xl bg-white p-4 text-left ring-1 ring-dashed ring-navy-300 transition hover:bg-navy-50"
          >
            <span className="grid h-4 w-4 place-items-center" aria-hidden="true">
              <RotateCcw className="h-4 w-4 text-navy-500" />
            </span>
            <span className="flex-1">
              <span className="block text-xs font-semibold text-navy-400">Option {predictions.length + 1}</span>
              <span className="block font-semibold text-navy-900">Retry signing</span>
            </span>
          </button>
        </div>
      </fieldset>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Button onClick={() => selected && onConfirm(selected)} disabled={!selected} className="flex-1 sm:flex-none">
          <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
          Confirm sentence
        </Button>
        <Button variant="secondary" onClick={onRetry}>
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Retry
        </Button>
      </div>
    </section>
  );
}
