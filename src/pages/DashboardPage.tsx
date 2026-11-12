import { ArrowRight, LifeBuoy, MessageSquareText, Radio, Settings as SettingsIcon, Clock3 } from 'lucide-react';
import type { AppRoute } from '@/hooks/useHashRoute';
import { AppLayout } from '@/layouts/AppLayout';
import { getCurrentUser } from '@/services/demoUser';
import { useConversationHistory } from '@/hooks/useConversationHistory';
import { LANGUAGES, getContextMode } from '@/data/languages';
import { formatDateTime } from '@/utils/format';
import { DemoLabel } from '@/components/ui/DemoLabel';

const ACTIONS = [
  { href: '#/live', title: 'Start New Conversation', text: 'Recognise a sign sentence and reply in context.', icon: MessageSquareText, tone: 'bg-indigo-50 text-indigo-600' },
  { href: '#/live', title: 'Live ISL Recognition', text: 'Webcam hand tracking and demonstration examples.', icon: Radio, tone: 'bg-teal-50 text-teal-700' },
  { href: '#/emergency', title: 'Emergency Mode', text: 'Essential phrases in English, Hindi and Kannada.', icon: LifeBuoy, tone: 'bg-red-50 text-red-700' },
  { href: '#/settings', title: 'Settings', text: 'Default language, context mode and privacy controls.', icon: SettingsIcon, tone: 'bg-navy-100 text-navy-700' },
];

export function DashboardPage({ route }: { route: AppRoute }) {
  const user = getCurrentUser();
  const { conversations } = useConversationHistory();
  const recent = conversations.slice(0, 3);
  const firstName = user.name.split(' ')[0];

  return (
    <AppLayout route={route}>
      <div className="animate-fade-up space-y-8">
        <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold text-teal-700">Dashboard</p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight text-navy-900">Welcome back, {firstName}</h1>
            <p className="mt-2 text-sm text-navy-500">Signed in as a demo profile in {user.location}.</p>
          </div>
          <DemoLabel>Demo profile, no account needed</DemoLabel>
        </header>

        <section aria-labelledby="actions-heading">
          <h2 id="actions-heading" className="sr-only">Quick actions</h2>
          <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {ACTIONS.map((action) => (
              <li key={action.title}>
                <a
                  href={action.href}
                  className="group flex h-full flex-col rounded-2xl bg-white p-6 shadow-card ring-1 ring-navy-100 transition duration-200 hover:-translate-y-1 hover:shadow-lifted"
                >
                  <span className={`grid h-11 w-11 place-items-center rounded-xl ${action.tone}`}>
                    <action.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="mt-5 font-semibold text-navy-900">{action.title}</span>
                  <span className="mt-1.5 text-sm text-navy-500">{action.text}</span>
                  <span className="mt-auto flex items-center gap-1 pt-5 text-sm font-semibold text-indigo-600">
                    Open
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <section aria-labelledby="recent-heading" className="rounded-2xl bg-white p-6 shadow-card ring-1 ring-navy-100">
            <div className="flex items-center justify-between">
              <h2 id="recent-heading" className="text-lg font-semibold text-navy-900">Recent conversations</h2>
              <a href="#/history" className="text-sm font-semibold text-indigo-600 hover:text-indigo-800">View history</a>
            </div>
            {recent.length === 0 ? (
              <div className="mt-6 rounded-xl border border-dashed border-navy-200 p-8 text-center">
                <p className="font-semibold text-navy-800">No conversations yet</p>
                <p className="mt-1 text-sm text-navy-500">Confirm a sentence in Live ISL Recognition and it will appear here.</p>
              </div>
            ) : (
              <ul className="mt-5 divide-y divide-navy-100">
                {recent.map((conversation) => (
                  <li key={conversation.id}>
                    <a href="#/history" className="flex items-center justify-between gap-4 py-4 transition hover:text-indigo-700">
                      <span className="min-w-0">
                        <span className="block truncate font-semibold text-navy-900">{conversation.title || 'Untitled conversation'}</span>
                        <span className="mt-0.5 flex items-center gap-2 text-xs text-navy-500">
                          <Clock3 className="h-3.5 w-3.5" aria-hidden="true" />
                          {formatDateTime(conversation.updatedAt)}
                        </span>
                      </span>
                      <span className="shrink-0 rounded-full bg-navy-100 px-2.5 py-1 text-xs font-medium text-navy-700">
                        {getContextMode(conversation.contextMode).label}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section aria-labelledby="languages-heading" className="rounded-2xl bg-navy-900 p-6 text-white shadow-card">
            <h2 id="languages-heading" className="text-lg font-semibold">Supported languages</h2>
            <ul className="mt-5 space-y-3">
              {LANGUAGES.map((language) => (
                <li key={language.code} className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3 ring-1 ring-white/10">
                  <span className="text-sm text-navy-200">{language.label}</span>
                  <span lang={language.code} className="font-semibold">{language.nativeLabel}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-xs leading-relaxed text-navy-300">
              Translations for demonstration examples are predefined. Speech uses the voices installed on your device.
            </p>
          </section>
        </div>
      </div>
    </AppLayout>
  );
}
