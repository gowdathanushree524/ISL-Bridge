import { useEffect, useState } from 'react';
import { getScenario } from '@/data/scenarios';
import type { Prediction } from '@/types';

export type RecognitionPhase = 'idle' | 'analysing' | 'ready';

const GLOSS_STEP_MS = 450;
const RESULT_DELAY_MS = 700;

// Plays back a predefined demonstration example. Values come from the scenario data, not a model.
export function useDemoRecognition() {
  const [scenarioId, setScenarioId] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(1);
  const [phase, setPhase] = useState<RecognitionPhase>('idle');
  const [revealedTokens, setRevealedTokens] = useState(0);

  const scenario = scenarioId ? getScenario(scenarioId) : null;

  useEffect(() => {
    if (!scenario || phase !== 'analysing') return;
    if (revealedTokens < scenario.gloss.length) {
      const timer = window.setTimeout(() => setRevealedTokens((count) => count + 1), GLOSS_STEP_MS);
      return () => window.clearTimeout(timer);
    }
    const timer = window.setTimeout(() => setPhase('ready'), RESULT_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [scenario, phase, revealedTokens]);

  const start = (id: string) => {
    setScenarioId(id);
    setAttempt(1);
    setRevealedTokens(0);
    setPhase('analysing');
  };

  const retry = () => {
    setAttempt((count) => count + 1);
    setRevealedTokens(0);
    setPhase('analysing');
  };

  const clear = () => {
    setScenarioId(null);
    setAttempt(1);
    setRevealedTokens(0);
    setPhase('idle');
  };

  const predictions: Prediction[] = scenario
    ? attempt > 1 && scenario.retryPredictions
      ? scenario.retryPredictions
      : scenario.predictions
    : [];

  return {
    scenario,
    attempt,
    phase,
    visibleGloss: scenario ? scenario.gloss.slice(0, revealedTokens) : [],
    predictions,
    start,
    retry,
    clear,
  };
}
