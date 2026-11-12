interface ConfidenceMeterProps {
  value: number;
  threshold: number;
}

export function ConfidenceMeter({ value, threshold }: ConfidenceMeterProps) {
  const percent = Math.round(value * 100);
  const isLow = value < threshold;
  const barColor = isLow ? 'bg-amber-500' : 'bg-teal-500';
  const textColor = isLow ? 'text-amber-700' : 'text-teal-700';

  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between text-sm">
        <span className="font-semibold text-navy-700">Confidence</span>
        <span className={`font-bold tabular-nums ${textColor}`}>{percent}%</span>
      </div>
      <div
        className="relative h-2.5 overflow-hidden rounded-full bg-navy-100"
        role="meter"
        aria-label="Prediction confidence"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
      >
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${barColor}`}
          style={{ width: `${percent}%` }}
        />
        <span
          className="absolute top-0 h-full w-0.5 bg-navy-700/60"
          style={{ left: `${Math.round(threshold * 100)}%` }}
          aria-hidden="true"
        />
      </div>
      <p className="text-xs text-navy-400">
        Marker shows the {Math.round(threshold * 100)}% review threshold. Values are predefined for this demo.
      </p>
    </div>
  );
}
