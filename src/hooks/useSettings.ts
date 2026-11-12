import { useEffect, useState } from 'react';
import type { Settings } from '@/types';
import { loadSettings, saveSettings } from '@/services/storage';

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(loadSettings);

  useEffect(() => {
    saveSettings(settings);
  }, [settings]);

  const update = (patch: Partial<Settings>) => setSettings((current) => ({ ...current, ...patch }));

  return { settings, update };
}
