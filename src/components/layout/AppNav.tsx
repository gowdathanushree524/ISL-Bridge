import { useState } from 'react';
import { History, LayoutDashboard, LifeBuoy, Menu, Radio, Settings, X } from 'lucide-react';
import type { AppRoute } from '@/hooks/useHashRoute';
import { BrandMark } from '@/components/ui/BrandMark';
import { getCurrentUser } from '@/services/demoUser';

const NAV_ITEMS: { route: AppRoute; label: string; icon: typeof LayoutDashboard }[] = [
  { route: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { route: '/live', label: 'Live ISL', icon: Radio },
  { route: '/emergency', label: 'Emergency', icon: LifeBuoy },
  { route: '/history', label: 'History', icon: History },
  { route: '/settings', label: 'Settings', icon: Settings },
];

export function AppNav({ current }: { current: AppRoute }) {
  const [open, setOpen] = useState(false);
  const user = getCurrentUser();
  const initials = user.name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2);

  return (
    <header className="sticky top-0 z-40 border-b border-navy-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <a href="#/" className="rounded-lg" aria-label="ISL Bridge home">
          <BrandMark />
        </a>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => {
            const active = item.route === current;
            const Icon = item.icon;
            return (
              <a
                key={item.route}
                href={`#${item.route}`}
                aria-current={active ? 'page' : undefined}
                className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  active ? 'bg-indigo-50 text-indigo-700' : 'text-navy-600 hover:bg-navy-100 hover:text-navy-900'
                }`}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2.5 rounded-full bg-navy-50 py-1 pl-1 pr-3 sm:flex">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-teal-600 text-xs font-bold text-white">
              {initials}
            </span>
            <span className="text-sm font-medium text-navy-800">{user.name}</span>
          </div>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="grid h-10 w-10 place-items-center rounded-lg text-navy-700 hover:bg-navy-100 md:hidden"
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-navy-100 bg-white px-4 py-3 md:hidden">
          <ul className="grid gap-1">
            {NAV_ITEMS.map((item) => {
              const active = item.route === current;
              const Icon = item.icon;
              return (
                <li key={item.route}>
                  <a
                    href={`#${item.route}`}
                    onClick={() => setOpen(false)}
                    aria-current={active ? 'page' : undefined}
                    className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium ${
                      active ? 'bg-indigo-50 text-indigo-700' : 'text-navy-700 hover:bg-navy-100'
                    }`}
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
}
