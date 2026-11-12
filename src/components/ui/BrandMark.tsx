import { Hand } from 'lucide-react';

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-indigo-600 to-teal-500 text-white shadow-sm">
        <Hand className="h-5 w-5" aria-hidden="true" />
      </span>
      {!compact && (
        <span className="text-lg font-bold tracking-tight text-navy-900">
          ISL<span className="text-indigo-600">Bridge</span>
        </span>
      )}
    </span>
  );
}
