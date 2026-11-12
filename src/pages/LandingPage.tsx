import { ArrowRight, Brain, Globe2, Hand, Languages, Lock, MessagesSquare, ShieldCheck, Sparkles, Waves } from 'lucide-react';
import { BrandMark } from '@/components/ui/BrandMark';
import { Button } from '@/components/ui/Button';
import { LANGUAGES } from '@/data/languages';

const HERO_IMAGE =
  'https://images.pexels.com/photos/10031280/pexels-photo-10031280.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

const STEPS = [
  { icon: Hand, title: 'Sign naturally', text: 'Sign a sentence in Indian Sign Language in front of the camera or pick a demonstration example.' },
  { icon: ShieldCheck, title: 'Confirm the meaning', text: 'MeaningGuard flags uncertain predictions and asks you to confirm the sentence you intended.' },
  { icon: MessagesSquare, title: 'Converse and speak', text: 'The grammar bridge builds a natural sentence, the dialogue engine responds, and the reply is spoken aloud.' },
];

const FEATURES = [
  {
    icon: ShieldCheck,
    title: 'ISL MeaningGuard',
    text: 'Confidence-aware clarification stops a wrong prediction from reaching the other person. You confirm before anything is sent.',
  },
  {
    icon: Languages,
    title: 'ISL Grammar Bridge',
    text: 'Shows the original gloss and the natural sentence side by side, so signers and listeners can both check the meaning.',
  },
  {
    icon: Brain,
    title: 'Context-aware dialogue',
    text: 'Hospital, police, education and shopping modes keep follow-up questions relevant across multiple turns.',
  },
];

export function LandingPage() {
  const scrollToFeatures = () => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="min-h-screen bg-white text-navy-900">
      <header className="sticky top-0 z-40 border-b border-navy-100/80 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="#/" aria-label="ISL Bridge home" className="rounded-lg">
            <BrandMark />
          </a>
          <nav aria-label="Landing" className="hidden items-center gap-7 text-sm font-medium text-navy-600 md:flex">
            <a href="#how-it-works" className="hover:text-navy-900">How it works</a>
            <a href="#features" className="hover:text-navy-900">Features</a>
            <a href="#languages" className="hover:text-navy-900">Languages</a>
            <a href="#privacy" className="hover:text-navy-900">Privacy</a>
          </nav>
          <a href="#/dashboard" className="inline-flex h-10 items-center rounded-xl bg-navy-900 px-4 text-sm font-semibold text-white transition hover:bg-navy-800">
            Open demo
          </a>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-2 lg:items-center lg:px-8">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-800 ring-1 ring-inset ring-teal-200">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              Hackathon demonstration build
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-[1.15] tracking-tight text-navy-900 sm:text-5xl lg:text-6xl">
              Breaking Communication Barriers, One Sign at a Time.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-navy-600">
              An intelligent Indian Sign Language communication platform that transforms continuous signing into meaningful multilingual conversations.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#/dashboard" className="inline-flex">
                <Button size="lg" className="w-full sm:w-auto">
                  Start Communicating
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </a>
              <Button variant="secondary" size="lg" onClick={scrollToFeatures}>
                Explore Features
              </Button>
            </div>
            <p className="mt-5 text-sm text-navy-400">
              Runs fully in your browser with a demo profile. No sign-up or API keys required.
            </p>
          </div>

          <div className="relative animate-fade-up [animation-delay:120ms]">
            <div className="overflow-hidden rounded-3xl bg-navy-100 shadow-lifted ring-1 ring-navy-200">
              <img src={HERO_IMAGE} alt="A person signing with both hands in an indoor setting" className="h-[380px] w-full object-cover sm:h-[460px]" />
            </div>
            <div className="absolute -bottom-6 left-4 right-4 rounded-2xl bg-white p-4 shadow-lifted ring-1 ring-amber-300 sm:left-auto sm:right-auto sm:-left-8 sm:w-80">
              <p className="text-xs font-bold uppercase tracking-widest text-amber-700">MeaningGuard</p>
              <p className="mt-1 font-semibold text-navy-900">Could you confirm what you meant?</p>
              <p className="mt-1 text-sm text-navy-500">I need a doctor. / I need medicine.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="bg-navy-50/60 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold text-teal-700">How it works</p>
          <h2 className="mt-2 max-w-2xl text-3xl font-bold tracking-tight">From a sign to a spoken reply in three steps</h2>
          <ol className="mt-12 grid gap-6 md:grid-cols-3">
            {STEPS.map((step, index) => (
              <li key={step.title} className="rounded-2xl bg-white p-7 shadow-card ring-1 ring-navy-100 transition hover:-translate-y-1 hover:shadow-lifted">
                <div className="flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-indigo-50 text-indigo-600">
                    <step.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="text-sm font-bold text-navy-300">0{index + 1}</span>
                </div>
                <h3 className="mt-5 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-600">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="features" className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold text-indigo-600">Key differentiators</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight">Built to prevent miscommunication</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {FEATURES.map((feature) => (
              <article key={feature.title} className="group rounded-2xl border border-navy-100 bg-white p-7 transition hover:border-indigo-200 hover:shadow-card">
                <feature.icon className="h-7 w-7 text-teal-600 transition group-hover:scale-110" aria-hidden="true" />
                <h3 className="mt-5 text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-600">{feature.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="languages" className="bg-navy-900 py-20 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-sm font-semibold text-teal-300">Supported languages</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">Speak in the language your listener understands</h2>
            <p className="mt-4 max-w-md text-navy-200">
              Confirmed sentences and AI replies are shown and spoken in the language you choose. Demonstration translations are predefined and checked against the examples.
            </p>
          </div>
          <ul className="grid gap-4 sm:grid-cols-3">
            {LANGUAGES.map((language) => (
              <li key={language.code} className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
                <Globe2 className="h-5 w-5 text-teal-300" aria-hidden="true" />
                <p lang={language.code} className="mt-4 text-2xl font-semibold">{language.nativeLabel}</p>
                <p className="mt-1 text-sm text-navy-300">{language.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="privacy" className="py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.2fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold text-indigo-600">Privacy first</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">Your camera stays on your device</h2>
          </div>
          <ul className="grid gap-4">
            {[
              { icon: Lock, text: 'The camera starts only when you press Start Camera and stops when you press Stop Camera.' },
              { icon: Waves, text: 'Nothing is recorded automatically. Hand tracking runs in your browser.' },
              { icon: ShieldCheck, text: 'Conversation history is saved only in this browser as local demo storage, not a cloud database.' },
            ].map((item) => (
              <li key={item.text} className="flex gap-4 rounded-2xl bg-navy-50 p-5 ring-1 ring-navy-100">
                <item.icon className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" aria-hidden="true" />
                <p className="text-sm leading-relaxed text-navy-700">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <footer className="border-t border-navy-100 py-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 text-sm text-navy-500 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <BrandMark />
          <p className="max-w-xl">
            ISL Bridge is a hackathon demonstration. Recognition examples are predefined, and the dialogue engine is a local rule-based demo. It is not a certified medical or emergency service.
          </p>
          <a href="#/dashboard" className="font-semibold text-indigo-600 hover:text-indigo-800">Open the demo dashboard</a>
        </div>
      </footer>
    </div>
  );
}
