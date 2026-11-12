import { LANGUAGES } from '@/data/languages';
import type { LanguageCode } from '@/types';

interface LanguageSelectorProps {
  value: LanguageCode;
  onChange: (code: LanguageCode) => void;
  label?: string;
}

export function LanguageSelector({ value, onChange, label = 'Output language' }: LanguageSelectorProps) {
  return (
    <div role="radiogroup" aria-label={label} className="inline-flex rounded-xl bg-navy-100/70 p-1">
      {LANGUAGES.map((language) => {
        const active = language.code === value;
        return (
          <button
            key={language.code}
            type="button"
            role="radio"
            aria-checked={active}
            lang={language.code}
            onClick={() => onChange(language.code)}
            className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition-all duration-200 ${
              active ? 'bg-white text-indigo-700 shadow-sm' : 'text-navy-600 hover:text-navy-900'
            }`}
          >
            {language.nativeLabel}
          </button>
        );
      })}
    </div>
  );
}
