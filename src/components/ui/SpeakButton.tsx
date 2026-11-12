import { Square, Volume2 } from 'lucide-react';

interface SpeakButtonProps {
  active: boolean;
  onSpeak: () => void;
  onStop: () => void;
  disabled?: boolean;
  label?: string;
}

export function SpeakButton({ active, onSpeak, onStop, disabled = false, label = 'Speak' }: SpeakButtonProps) {
  if (active) {
    return (
      <button
        type="button"
        onClick={onStop}
        className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-teal-600 px-2.5 text-xs font-semibold text-white transition hover:bg-teal-700"
      >
        <Square className="h-3 w-3 fill-current" aria-hidden="true" />
        Stop
      </button>
    );
  }
  return (
    <button
      type="button"
      onClick={onSpeak}
      disabled={disabled}
      className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-teal-50 px-2.5 text-xs font-semibold text-teal-800 ring-1 ring-inset ring-teal-200 transition hover:bg-teal-100 disabled:opacity-50"
    >
      <Volume2 className="h-3.5 w-3.5" aria-hidden="true" />
      {label}
    </button>
  );
}
