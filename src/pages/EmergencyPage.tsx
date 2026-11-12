import { useState } from 'react';
import { AlertOctagon, Maximize2, Phone, Volume2, Square, X } from 'lucide-react';
import type { AppRoute } from '@/hooks/useHashRoute';
import type { LanguageCode, Phrase } from '@/types';
import { AppLayout } from '@/layouts/AppLayout';
import { EMERGENCY_PHRASES } from '@/data/phrases';
import { getLanguage } from '@/data/languages';
import { useSpeech } from '@/hooks/useSpeech';
import { useSettings } from '@/hooks/useSettings';
import { LanguageSelector } from '@/components/ui/LanguageSelector';
import { SpeakButton } from '@/components/ui/SpeakButton';
import { Button } from '@/components/ui/Button';

export function EmergencyPage({ route }: { route: AppRoute }) {
  const { settings } = useSettings();
  const speech = useSpeech();
  const [language, setLanguage] = useState<LanguageCode>(settings.defaultLanguage);
  const [selected, setSelected] = useState<Phrase | null>(null);
  const [fullScreen, setFullScreen] = useState(false);

  const showPhrase = (phrase: Phrase) => {
    setSelected(phrase);
    speech.speak(`phrase-${phrase.id}`, phrase.translations[language], language);
  };

  return (
    <AppLayout route={route}>
      <div className="animate-fade-up space-y-8">
        <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="flex items-center gap-2 text-sm font-semibold text-red-700">
              <AlertOctagon className="h-4 w-4" aria-hidden="true" />
              Emergency mode
            </p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight text-navy-900">Essential phrases, one tap away</h1>
            <p className="mt-2 max-w-2xl text-sm text-navy-500">
              Tap a phrase to show it in large text and speak it. This app does not contact emergency services. In an emergency, call your local emergency number directly.
            </p>
          </div>
          <LanguageSelector value={language} onChange={setLanguage} />
        </header>

        <div role="note" className="flex gap-3 rounded-2xl bg-red-50 p-5 text-sm text-red-900 ring-1 ring-inset ring-red-200">
          <Phone className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
          <p>
            ISL Bridge cannot place calls or alert anyone. Use a phone to dial emergency services, or show this screen to someone nearby.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <ul className="grid gap-3 sm:grid-cols-2">
            {EMERGENCY_PHRASES.map((phrase) => {
              const active = selected?.id === phrase.id;
              return (
                <li key={phrase.id}>
                  <button
                    type="button"
                    onClick={() => showPhrase(phrase)}
                    aria-pressed={active}
                    className={`flex h-full w-full flex-col items-start gap-3 rounded-2xl p-5 text-left ring-1 transition duration-200 hover:-translate-y-0.5 hover:shadow-card ${
                      active ? 'bg-red-600 text-white ring-red-600' : 'bg-white text-navy-900 ring-navy-200 hover:ring-red-300'
                    }`}
                  >
                    <span className="text-lg font-semibold">{phrase.label}</span>
                    <span lang={language} className={`text-base ${active ? 'text-red-50' : 'text-navy-600'}`}>
                      {phrase.translations[language]}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <section aria-labelledby="display-heading" className="rounded-2xl bg-white p-6 shadow-card ring-1 ring-navy-100">
            <h2 id="display-heading" className="text-lg font-semibold text-navy-900">Show to the other person</h2>
            {selected ? (
              <div className="mt-5 space-y-5">
                <p lang={language} className="text-3xl font-bold leading-snug text-navy-900">
                  {selected.translations[language]}
                </p>
                {language !== 'en' && <p className="text-sm text-navy-500">{selected.translations.en}</p>}
                <div className="flex flex-wrap gap-3">
                  <SpeakButton
                    active={speech.activeKey === `phrase-${selected.id}`}
                    onSpeak={() => showPhrase(selected)}
                    onStop={speech.stop}
                    label={`Speak (${getLanguage(language).label})`}
                  />
                  <Button variant="secondary" size="sm" onClick={speech.stop}>
                    <Square className="h-3.5 w-3.5" aria-hidden="true" />
                    Stop
                  </Button>
                  <Button variant="secondary" size="sm" onClick={() => setFullScreen(true)}>
                    <Maximize2 className="h-4 w-4" aria-hidden="true" />
                    Full screen
                  </Button>
                </div>
              </div>
            ) : (
              <p className="mt-5 text-sm text-navy-500">Select a phrase to display it here in large text.</p>
            )}
            {speech.notice && <p role="status" className="mt-5 text-sm text-amber-800">{speech.notice}</p>}
            <div className="mt-6 flex items-center gap-2 text-xs text-navy-400">
              <Volume2 className="h-3.5 w-3.5" aria-hidden="true" />
              Speech uses voices installed on this device.
            </div>
          </section>
        </div>

        {fullScreen && selected && (
          <div role="dialog" aria-modal="true" aria-label="Full screen phrase" className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white p-8 text-center">
            <button
              type="button"
              onClick={() => setFullScreen(false)}
              className="absolute right-5 top-5 grid h-12 w-12 place-items-center rounded-xl bg-navy-100 text-navy-800 hover:bg-navy-200"
              aria-label="Close full screen"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
            <p lang={language} className="max-w-4xl text-4xl font-bold leading-tight text-navy-900 sm:text-6xl">
              {selected.translations[language]}
            </p>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
