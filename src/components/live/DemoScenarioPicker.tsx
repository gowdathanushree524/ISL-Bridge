import { CheckCircle2, Play } from 'lucide-react';
import { SCENARIOS } from '@/data/scenarios';
import { DemoLabel } from '@/components/ui/DemoLabel';

interface DemoScenarioPickerProps {
  selectedId: string | null;
  onSelect: (id: string) => void;
  busy: boolean;
}

export function DemoScenarioPicker({ selectedId, onSelect, busy }: DemoScenarioPickerProps) {
  return (
    <section aria-labelledby="scenario-heading" className="rounded-2xl bg-white p-5 shadow-card ring-1 ring-navy-100 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 id="scenario-heading" className="text-lg font-semibold text-navy-900">
            Demonstration examples
          </h2>
          <p className="text-sm text-navy-500">Choose a predefined ISL sentence to run the full workflow.</p>
        </div>
        <DemoLabel />
      </div>

      <p className="mt-4 rounded-xl bg-navy-50 p-4 text-sm text-navy-700 ring-1 ring-inset ring-navy-100">
        These are predefined examples. They are not recognised from your camera.
      </p>

      <ul className="mt-5 grid gap-3">
        {SCENARIOS.map((scenario) => {
          const selected = scenario.id === selectedId;
          return (
            <li key={scenario.id}>
              <button
                type="button"
                onClick={() => onSelect(scenario.id)}
                disabled={busy}
                aria-pressed={selected}
                className={`group flex w-full items-start gap-4 rounded-xl p-4 text-left ring-1 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card disabled:opacity-60 ${
                  selected ? 'bg-indigo-50/60 ring-2 ring-indigo-500' : 'bg-white ring-navy-200 hover:ring-navy-300'
                }`}
              >
                <span
                  className={`mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg ${
                    selected ? 'bg-indigo-600 text-white' : 'bg-navy-100 text-navy-600 group-hover:bg-navy-200'
                  }`}
                >
                  {selected ? <CheckCircle2 className="h-5 w-5" aria-hidden="true" /> : <Play className="h-4 w-4" aria-hidden="true" />}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold text-navy-900">{scenario.title}</span>
                  <span className="mt-0.5 block text-sm text-navy-500">{scenario.summary}</span>
                  <span className="mt-2 block font-mono text-xs tracking-wide text-navy-400">
                    {scenario.gloss.join(' + ')}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      <p className="mt-4 text-xs text-navy-400">Select an example to run it. Choosing one again replays the same demonstration.</p>
    </section>
  );
}
