import { useEffect, useState } from 'react';

export const ROUTES = ['/', '/dashboard', '/live', '/emergency', '/history', '/settings'] as const;
export type AppRoute = (typeof ROUTES)[number];

function readRoute(): AppRoute {
  const path = window.location.hash.replace(/^#/, '') || '/';
  return (ROUTES as readonly string[]).includes(path) ? (path as AppRoute) : '/';
}

export function useHashRoute() {
  const [route, setRoute] = useState<AppRoute>(readRoute);

  useEffect(() => {
    const handleChange = () => {
      setRoute(readRoute());
      window.scrollTo({ top: 0 });
    };
    window.addEventListener('hashchange', handleChange);
    return () => window.removeEventListener('hashchange', handleChange);
  }, []);

  return route;
}
