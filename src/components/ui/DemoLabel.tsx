import { FlaskConical } from 'lucide-react';

export function DemoLabel({ children = 'Demo mode' }: { children?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-800 ring-1 ring-inset ring-amber-200">
      <FlaskConical className="h-3.5 w-3.5" aria-hidden="true" />
      {children}
    </span>
  );
}
