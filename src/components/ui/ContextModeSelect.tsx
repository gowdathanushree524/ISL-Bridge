import { CONTEXT_MODES } from '@/data/languages';
import type { ContextMode } from '@/types';

interface ContextModeSelectProps {
  value: ContextMode;
  onChange: (mode: ContextMode) => void;
}

export function ContextModeSelect({ value, onChange }: ContextModeSelectProps) {
  const active = CONTEXT_MODES.find((mode) => mode.id === value) ?? CONTEXT_MODES[0];
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      <span className="font-semibold text-navy-700">Context mode</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value as ContextMode)}
        className="h-11 rounded-xl border border-navy-200 bg-white px-3 font-medium text-navy-900 shadow-sm transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
      >
        {CONTEXT_MODES.map((mode) => (
          <option key={mode.id} value={mode.id}>
            {mode.label}
          </option>
        ))}
      </select>
      <span className="text-xs text-navy-400">{active.description}</span>
    </label>
  );
}
