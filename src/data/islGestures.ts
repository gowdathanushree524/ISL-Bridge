import type { Localized } from '@/types';

export type FingerName = 'thumb' | 'index' | 'middle' | 'ring' | 'pinky';

export type FingerPattern = Record<FingerName, boolean>;

export interface IslGesture {
  id: string;
  word: string;
  translations: Localized;
  handShape: string;
  fingers: FingerPattern;
}

const NONE: FingerPattern = { thumb: false, index: false, middle: false, ring: false, pinky: false };

/**
 * Prototype set of static handshapes. Each entry is matched against the
 * extended/folded state of the five fingers in the webcam image. These are
 * handshape approximations for the demo; they are not a validated ISL
 * dictionary. Mappings must be reviewed with Deaf ISL signers before use.
 */
export const SUPPORTED_GESTURES: IslGesture[] = [
  {
    id: 'hello',
    word: 'Hello',
    translations: { en: 'Hello', hi: 'नमस्ते', kn: 'ನಮಸ್ಕಾರ' },
    handShape: 'Open palm with all five fingers extended',
    fingers: { thumb: true, index: true, middle: true, ring: true, pinky: true },
  },
  {
    id: 'yes',
    word: 'Yes',
    translations: { en: 'Yes', hi: 'हाँ', kn: 'ಹೌದು' },
    handShape: 'Closed fist with every finger folded',
    fingers: NONE,
  },
  {
    id: 'no',
    word: 'No',
    translations: { en: 'No', hi: 'नहीं', kn: 'ಇಲ್ಲ' },
    handShape: 'Index and middle fingers extended, others folded',
    fingers: { thumb: false, index: true, middle: true, ring: false, pinky: false },
  },
  {
    id: 'me',
    word: 'Me',
    translations: { en: 'I / me', hi: 'मैं', kn: 'ನಾನು' },
    handShape: 'Index finger extended, others folded',
    fingers: { thumb: false, index: true, middle: false, ring: false, pinky: false },
  },
  {
    id: 'good',
    word: 'Good',
    translations: { en: 'Good', hi: 'अच्छा', kn: 'ಒಳ್ಳೆಯದು' },
    handShape: 'Thumb extended upward, other fingers folded',
    fingers: { thumb: true, index: false, middle: false, ring: false, pinky: false },
  },
];
