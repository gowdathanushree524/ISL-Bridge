import type { ReactNode } from 'react';
import type { AppRoute } from '@/hooks/useHashRoute';
import { AppNav } from '@/components/layout/AppNav';

export function AppLayout({ route, children }: { route: AppRoute; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:shadow-lg"
      >
        Skip to content
      </a>
      <AppNav current={route} />
      <main id="main-content" className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        {children}
      </main>
    </div>
  );
}
