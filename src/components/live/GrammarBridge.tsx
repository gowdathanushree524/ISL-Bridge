import { ArrowRight, Languages } from 'lucide-react';
import type { LanguageCode, Localized } from '@/types';
import { getLanguage } from '@/data/languages';
import { SpeakButton } from '@/components/ui/SpeakButton';

interface GrammarBridgeProps {
  gloss: string[];
  natural: Localized;
  language: LanguageCode;
  speechActiveKey: string | null;
  onSpeak: (key: string, text: string, code: LanguageCode) => void;
  onStop: () => void;
}

export function GrammarBridge({ gloss, natural, language, speechActiveKey, onSpeak, onStop }: GrammarBridgeProps) {
  const localized = natural[language];
  const speakKey = 'grammar-natural';
  const showEnglishBelow = language !== 'en';

  return (
    <section aria-labelledby="grammar-heading" className="rounded-2xl bg-navy-50/60 p-5 ring-1 ring-navy-100">
      <div className="flex items-center justify-between gap-3">
        <h3 id="grammar-heading" className="text-sm font-bold uppercase tracking-widest text-navy-500">
          ISL Grammar Bridge
        </h3>
        <span className="text-xs font-medium text-navy-400">Predefined mapping</span>
      </div>

      <ol className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto_1fr_auto_1.4fr] sm:items-stretch">
        <li className="rounded-xl bg-white p-3.5 ring-1 ring-navy-100">
          <p className="text-xs font-semibold text-navy-400">1. Recognised gloss</p>
          <p className="mt-1.5 font-mono text-sm font-semibold text-navy-800">{gloss.join(' + ')}</p>
        </li>
        <ArrowRight className="hidden h-5 w-5 self-center text-navy-300 sm:block" aria-hidden="true" />
        <li className="rounded-xl bg-white p-3.5 ring-1 ring-navy-100">
          <p className="text-xs font-semibold text-navy-400">2. Grammar processing</p>
          <p className="mt-1.5 text-sm text-navy-600">Word order, missing function words and tense mapped.</p>
        </li>
        <ArrowRight className="hidden h-5 w-5 self-center text-navy-300 sm:block" aria-hidden="true" />
        <li className="rounded-xl bg-white p-3.5 ring-1 ring-indigo-200">
          <p className="text-xs font-semibold text-indigo-600">3. Natural sentence</p>
          <p lang={language} className="mt-1.5 text-base font-semibold leading-snug text-navy-900">
            {localized}
          </p>
          {showEnglishBelow && <p className="mt-1 text-xs text-navy-500">{natural.en}</p>}
          <div className="mt-3 flex items-center gap-2">
            <SpeakButton
              active={speechActiveKey === speakKey}
              onSpeak={() => onSpeak(speakKey, localized, language)}
              onStop={onStop}
              label={`Speak (${getLanguage(language).label})`}
            />
            <Languages className="h-4 w-4 text-navy-300" aria-hidden="true" />
          </div>
        </li>
      </ol>
    </section>
  );
}
