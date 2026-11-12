import { useCallback, useRef, useState } from 'react';
import type { HandLandmarkerResult } from '@mediapipe/tasks-vision';
import type { IslGesture } from '@/data/islGestures';
import { classifyHandShape } from '@/services/gestureClassifier';

export const GESTURE_CONFIDENCE_THRESHOLD = 0.75;
const WINDOW_SIZE = 10;
const REQUIRED_VOTES = 7;

interface FrameSample {
  handCount: number;
  gesture: IslGesture | null;
  confidence: number;
}

export type GestureReading =
  | { status: 'idle' }
  | { status: 'no-hand' }
  | { status: 'multiple-hands' }
  | { status: 'unknown' }
  | { status: 'recognised'; gesture: IslGesture; confidence: number };

function readWindow(window: FrameSample[]): GestureReading {
  const latest = window[window.length - 1];
  if (!latest) return { status: 'idle' };
  if (latest.handCount === 0) return { status: 'no-hand' };
  if (latest.handCount > 1) return { status: 'multiple-hands' };

  const votes = new Map<string, { gesture: IslGesture; confidences: number[] }>();
  for (const sample of window) {
    if (!sample.gesture || sample.confidence < GESTURE_CONFIDENCE_THRESHOLD) continue;
    const entry = votes.get(sample.gesture.id) ?? { gesture: sample.gesture, confidences: [] };
    entry.confidences.push(sample.confidence);
    votes.set(sample.gesture.id, entry);
  }

  for (const { gesture, confidences } of votes.values()) {
    if (confidences.length < REQUIRED_VOTES) continue;
    const average = confidences.reduce((sum, value) => sum + value, 0) / confidences.length;
    return { status: 'recognised', gesture, confidence: average };
  }
  return { status: 'unknown' };
}

function sameReading(a: GestureReading, b: GestureReading) {
  if (a.status === 'recognised' && b.status === 'recognised') {
    return a.gesture.id === b.gesture.id && Math.round(a.confidence * 100) === Math.round(b.confidence * 100);
  }
  return a.status === b.status;
}

export function useGestureRecognition() {
  const windowRef = useRef<FrameSample[]>([]);
  const [reading, setReading] = useState<GestureReading>({ status: 'idle' });
  const [words, setWords] = useState<IslGesture[]>([]);

  const handleFrame = useCallback((result: HandLandmarkerResult, video: HTMLVideoElement) => {
    const hands = result.landmarks;
    const sample: FrameSample = { handCount: hands.length, gesture: null, confidence: 0 };
    const hand = hands[0];
    if (hands.length === 1 && hand) {
      const aspectRatio = video.videoHeight > 0 ? video.videoWidth / video.videoHeight : 1;
      const classification = classifyHandShape(hand, aspectRatio);
      sample.gesture = classification.gesture;
      sample.confidence = classification.confidence;
    }

    const nextWindow = [...windowRef.current, sample].slice(-WINDOW_SIZE);
    windowRef.current = nextWindow;
    const next = readWindow(nextWindow);
    setReading((previous) => (sameReading(previous, next) ? previous : next));
  }, []);

  const reset = useCallback(() => {
    windowRef.current = [];
    setReading({ status: 'idle' });
  }, []);

  const addWord = useCallback(() => {
    if (reading.status !== 'recognised') return;
    const gesture = reading.gesture;
    setWords((previous) => [...previous, gesture]);
  }, [reading]);

  const removeLastWord = useCallback(() => setWords((previous) => previous.slice(0, -1)), []);
  const clearWords = useCallback(() => setWords([]), []);

  return { reading, words, handleFrame, reset, addWord, removeLastWord, clearWords };
}
