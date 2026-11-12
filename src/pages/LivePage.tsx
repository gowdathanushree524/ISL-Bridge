import { useRef, useState } from 'react';
import { Camera, Radio, Sparkles } from 'lucide-react';
import { AppLayout } from '@/layouts/AppLayout';
import type { AppRoute } from '@/hooks/useHashRoute';
import type { ContextMode, LanguageCode, Prediction } from '@/types';
import { getScenario } from '@/data/scenarios';
import { useWebcam } from '@/hooks/useWebcam';
import { useHandTracking } from '@/hooks/useHandTracking';
import { useDemoRecognition } from '@/hooks/useDemoRecognition';
import { useConversationHistory } from '@/hooks/useConversationHistory';
import { useConversationSession } from '@/hooks/useConversationSession';
import { useGestureRecognition } from '@/hooks/useGestureRecognition';
import { useSpeech } from '@/hooks/useSpeech';
import { useSettings } from '@/hooks/useSettings';
import type { FollowUpSign } from '@/data/followUps';
import { LanguageSelector } from '@/components/ui/LanguageSelector';
import { Button } from '@/components/ui/Button';
import { CameraPanel } from '@/components/live/CameraPanel';
import { DemoScenarioPicker } from '@/components/live/DemoScenarioPicker';
import { GestureSentencePanel } from '@/components/live/GestureSentencePanel';
import { RecognitionPanel } from '@/components/live/RecognitionPanel';
import { ConversationPanel } from '@/components/live/ConversationPanel';

type Source = 'webcam' | 'demo';

export function LivePage({ route }: { route: AppRoute }) {
  const { settings } = useSettings();
  const history = useConversationHistory();
  const session = useConversationSession(history.save);
  const speech = useSpeech();
  const recognition = useDemoRecognition();
  const gesture = useGestureRecognition();
  const webcam = useWebcam();
  const videoRef = webcam.videoRef;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [source, setSource] = useState<Source>('demo');
  const [language, setLanguage] = useState<LanguageCode>(settings.defaultLanguage);
  const [contextMode, setContextMode] = useState<ContextMode>(settings.defaultContextMode);
  const [confirmed, setConfirmed] = useState<{ runKey: string; prediction: Prediction } | null>(null);
  const [sentKey, setSentKey] = useState<string | null>(null);

  const tracker = useHandTracking({
    videoRef,
    canvasRef,
    enabled: source === 'webcam' && webcam.status === 'live',
    drawLandmarks: settings.showHandLandmarks,
    onFrame: gesture.handleFrame,
  });

  const runKey = recognition.scenario ? `${recognition.scenario.id}:${recognition.attempt}` : '';
  const confirmedPrediction = confirmed && confirmed.runKey === runKey ? confirmed.prediction : null;
  const sent = confirmedPrediction !== null && sentKey === `${runKey}:${confirmedPrediction.id}`;

  const stopCamera = () => {
    webcam.stop();
    gesture.reset();
  };

  const switchSource = (next: Source) => {
    if (next === source) return;
    if (next === 'demo') stopCamera();
    setSource(next);
  };

  const selectScenario = (id: string) => {
    const scenario = getScenario(id);
    stopCamera();
    recognition.start(id);
    if (scenario) setContextMode(scenario.contextMode);
  };

  const sendConfirmed = () => {
    if (!recognition.scenario || !confirmedPrediction) return;
    const top = recognition.predictions[0];
    session.sendSignedSentence({
      sentence: {
        scenarioId: recognition.scenario.id,
        recognized: top.text,
        confirmed: confirmedPrediction.translations,
        natural: confirmedPrediction.naturalSentence,
      },
      mode: contextMode,
      language,
    });
    setSentKey(`${runKey}:${confirmedPrediction.id}`);
  };

  const sendGestureWords = () => {
    if (gesture.words.length === 0) return;
    const joinIn = (code: LanguageCode) => gesture.words.map((word) => word.translations[code]).join(' ');
    const english = joinIn('en');
    session.sendSignedSentence({
      sentence: {
        scenarioId: null,
        recognized: english,
        confirmed: { en: english, hi: joinIn('hi'), kn: joinIn('kn') },
        natural: { en: `${english.charAt(0).toUpperCase()}${english.slice(1)}.`, hi: joinIn('hi'), kn: joinIn('kn') },
      },
      mode: contextMode,
      language,
    });
    gesture.clearWords();
  };

  const sendFollowUp = (sign: FollowUpSign) => {
    session.sendSignedSentence({
      sentence: { scenarioId: null, recognized: sign.text, confirmed: sign.translations, natural: sign.translations },
      mode: contextMode,
      language,
    });
  };

  const startNewConversation = () => {
    session.reset();
    recognition.clear();
    gesture.clearWords();
    setConfirmed(null);
    setSentKey(null);
    speech.stop();
  };

  return (
    <AppLayout route={route}>
      <div className="animate-fade-up">
        <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold text-teal-700">Live ISL Recognition</p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight text-navy-900">Sign, confirm, and converse</h1>
            <p className="mt-2 max-w-2xl text-sm text-navy-500">
              Check the recognised sentence, resolve any ambiguity with MeaningGuard, then send it to the dialogue engine.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold text-navy-500">Output language</span>
              <LanguageSelector value={language} onChange={setLanguage} />
            </div>
            <Button variant="secondary" onClick={startNewConversation}>
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Start new conversation
            </Button>
          </div>
        </header>

        <div role="tablist" aria-label="Recognition source" className="mt-6 inline-flex rounded-xl bg-navy-100/70 p-1">
          {(
            [
              { id: 'webcam', label: 'Webcam mode', icon: Camera },
              { id: 'demo', label: 'Demonstration mode', icon: Radio },
            ] as const
          ).map((tab) => {
            const active = source === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => switchSource(tab.id)}
                className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition ${
                  active ? 'bg-white text-indigo-700 shadow-sm' : 'text-navy-600 hover:text-navy-900'
                }`}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2 lg:items-start">
          {source === 'webcam' ? (
            <>
              <CameraPanel
                videoRef={videoRef}
                canvasRef={canvasRef}
                webcamStatus={webcam.status}
                errorMessage={webcam.errorMessage}
                trackerStatus={tracker.status}
                handCount={tracker.handCount}
                onStart={webcam.start}
                onStop={stopCamera}
              />
              <GestureSentencePanel
                reading={gesture.reading}
                words={gesture.words}
                language={language}
                onAddWord={gesture.addWord}
                onRemoveLastWord={gesture.removeLastWord}
                onClearWords={gesture.clearWords}
                onSend={sendGestureWords}
              />
            </>
          ) : (
            <>
              <DemoScenarioPicker
                selectedId={recognition.scenario?.id ?? null}
                onSelect={selectScenario}
                busy={recognition.phase === 'analysing'}
              />
              <RecognitionPanel
                scenario={recognition.scenario}
                phase={recognition.phase}
                visibleGloss={recognition.visibleGloss}
                predictions={recognition.predictions}
                attempt={recognition.attempt}
                confirmed={confirmedPrediction}
                sent={sent}
                language={language}
                speech={speech}
                onConfirm={(prediction) => setConfirmed({ runKey, prediction })}
                onRetry={recognition.retry}
                onSend={sendConfirmed}
              />
            </>
          )}
        </div>

        <div className="mt-6">
          <ConversationPanel
            draft={session.draft}
            contextMode={contextMode}
            onModeChange={setContextMode}
            language={language}
            speech={speech}
            onSendFollowUp={sendFollowUp}
            onSendParticipant={(text) => session.sendParticipantMessage(text, contextMode, language)}
            onReset={startNewConversation}
          />
        </div>
      </div>
    </AppLayout>
  );
}
