import { SUPPORTED_GESTURES, type FingerName, type FingerPattern, type IslGesture } from '@/data/islGestures';

export interface HandLandmark {
  x: number;
  y: number;
}

export interface HandShapeClassification {
  gesture: IslGesture | null;
  confidence: number;
}

const FINGERS: FingerName[] = ['thumb', 'index', 'middle', 'ring', 'pinky'];

const WRIST = 0;
const THUMB_IP = 3;
const THUMB_TIP = 4;
const INDEX_MCP = 5;
const MIDDLE_MCP = 9;

const FINGER_JOINTS: Record<Exclude<FingerName, 'thumb'>, { pip: number; tip: number }> = {
  index: { pip: 6, tip: 8 },
  middle: { pip: 10, tip: 12 },
  ring: { pip: 14, tip: 16 },
  pinky: { pip: 18, tip: 20 },
};

const EXTENSION_THRESHOLD = 1.2;
const CERTAINTY_SPREAD = 0.4;
const MIN_HAND_SIZE = 0.08;

interface Point {
  x: number;
  y: number;
}

function distance(a: Point, b: Point) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

/**
 * Classifies a single hand's static shape. Landmarks are normalised to the
 * image, so x is scaled by the aspect ratio before measuring distances.
 * Returns no gesture (confidence 0) when the shape matches nothing supported.
 */
export function classifyHandShape(landmarks: HandLandmark[], aspectRatio: number): HandShapeClassification {
  const points = landmarks.map((point) => ({ x: point.x * aspectRatio, y: point.y }));
  const wrist = points[WRIST];
  if (!wrist || points.length < 21) return { gesture: null, confidence: 0 };
  if (distance(wrist, points[MIDDLE_MCP]) < MIN_HAND_SIZE) return { gesture: null, confidence: 0 };

  const observed = {} as FingerPattern;
  let certaintySum = 0;

  for (const finger of FINGERS) {
    const ratio =
      finger === 'thumb'
        ? distance(points[THUMB_TIP], points[INDEX_MCP]) / distance(points[THUMB_IP], points[INDEX_MCP])
        : distance(wrist, points[FINGER_JOINTS[finger].tip]) / distance(wrist, points[FINGER_JOINTS[finger].pip]);

    observed[finger] = ratio > EXTENSION_THRESHOLD;
    certaintySum += clamp01(0.5 + Math.abs(ratio - EXTENSION_THRESHOLD) / CERTAINTY_SPREAD);
  }

  const gesture = SUPPORTED_GESTURES.find((candidate) => FINGERS.every((finger) => candidate.fingers[finger] === observed[finger])) ?? null;
  if (!gesture) return { gesture: null, confidence: 0 };

  return { gesture, confidence: certaintySum / FINGERS.length };
}
