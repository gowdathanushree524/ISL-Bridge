import type { AppRoute } from '@/hooks/useHashRoute';
import { AppLayout } from '@/layouts/AppLayout';
import { CONTEXT_MODES, LANGUAGES } from '@/data/languages';
import { useSettings } from '@/hooks/useSettings';
import { getCurrentUser } from '@/services/demoUser';
import type { ContextMode, LanguageCode } from '@/types';
import { DemoLabel } from '@/components/ui/DemoLabel';

export function SettingsPage({ route }: { route: AppRoute }) {
  const { settings, update } = useSettings();
  const user = getCurrentUser();

  return (
    <AppLayout route={route}>
      <div className="animate-fade-up space-y-8">
        <header>
          <p className="text-sm font-semibold text-teal-700">Settings</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-navy-900">Preferences and privacy</h1>
          <p className="mt-2 text-sm text-navy-500">Preferences are saved in this browser.</p>
        </header>

        <div className="grid gap-6 lg:grid-cols-2">
          <section aria-labelledby="prefs-heading" className="space-y-6 rounded-2xl bg-white p-6 shadow-card ring-1 ring-navy-100">
            <h2 id="prefs-heading" className="text-lg font-semibold text-navy-900">Defaults</h2>

            <div className="space-y-2">
              <span className="text-sm font-semibold text-navy-700">Default output language</span>
              <div role="radiogroup" aria-label="Default output language" className="grid gap-2 sm:grid-cols-3">
                {LANGUAGES.map((language) => {
                  const active = settings.defaultLanguage === language.code;
                  return (
                    <button
                      key={language.code}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      lang={language.code}
                      onClick={() => update({ defaultLanguage: language.code as LanguageCode })}
                      className={`rounded-xl px-4 py-3 text-sm font-semibold ring-1 transition ${active ? 'bg-indigo-50 text-indigo-700 ring-2 ring-indigo-500' : 'bg-white text-navy-700 ring-navy-200 hover:ring-navy-300'}`}
                    >
                      {language.nativeLabel}
                    </button>
                  );
                })}
              </div>
            </div>

            <label className="block space-y-2">
              <span className="text-sm font-semibold text-navy-700">Default context mode</span>
              <select
                value={settings.defaultContextMode}
                onChange={(event) => update({ defaultContextMode: event.target.value as ContextMode })}
                className="h-11 w-full rounded-xl border border-navy-200 bg-white px-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              >
                {CONTEXT_MODES.map((mode) => (
                  <option key={mode.id} value={mode.id}>{mode.label}</option>
                ))}
              </select>
            </label>

            <label className="flex items-start justify-between gap-4 rounded-xl bg-navy-50 p-4 ring-1 ring-navy-100">
              <span>
                <span className="block text-sm font-semibold text-navy-900">Draw hand landmarks</span>
                <span className="mt-0.5 block text-xs text-navy-500">Overlay tracked hand points on the webcam preview.</span>
              </span>
              <input
                type="checkbox"
                checked={settings.showHandLandmarks}
                onChange={(event) => update({ showHandLandmarks: event.target.checked })}
                className="mt-1 h-5 w-5 accent-indigo-600"
              />
            </label>
          </section>

          <section aria-labelledby="profile-heading" className="space-y-5 rounded-2xl bg-white p-6 shadow-card ring-1 ring-navy-100">
            <div className="flex items-center justify-between">
              <h2 id="profile-heading" className="text-lg font-semibold text-navy-900">Demo profile</h2>
              <DemoLabel />
            </div>
            <dl className="grid gap-3 text-sm">
              <div className="flex justify-between gap-4 rounded-xl bg-navy-50 px-4 py-3"><dt className="text-navy-500">Name</dt><dd className="font-medium text-navy-900">{user.name}</dd></div>
              <div className="flex justify-between gap-4 rounded-xl bg-navy-50 px-4 py-3"><dt className="text-navy-500">Email</dt><dd className="font-medium text-navy-900">{user.email}</dd></div>
              <div className="flex justify-between gap-4 rounded-xl bg-navy-50 px-4 py-3"><dt className="text-navy-500">Location</dt><dd className="font-medium text-navy-900">{user.location}</dd></div>
            </dl>
            <div className="rounded-xl bg-teal-50 p-4 text-sm text-teal-900 ring-1 ring-inset ring-teal-200">
              <p className="font-semibold">Privacy</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-teal-900/90">
                <li>The camera runs only after you press Start Camera.</li>
                <li>Nothing is recorded automatically.</li>
                <li>History is stored only in this browser as local demo storage.</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </AppLayout>
  );
}
