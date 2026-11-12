import type { LanguageCode } from '@/types';
import { getLanguage } from '@/data/languages';

export type SpeakResult = 'spoken' | 'no-voice' | 'unsupported';

export function isSpeechSupported() {
  return typeof window !== 'undefined' && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
}

export function hasVoiceFor(voices: SpeechSynthesisVoice[], code: LanguageCode) {
  return findVoice(voices, code) !== null;
}

export function findVoice(voices: SpeechSynthesisVoice[], code: LanguageCode) {
  const locale = getLanguage(code).locale.toLowerCase();
  const exact = voices.find((voice) => voice.lang.toLowerCase() === locale);
  if (exact) return exact;
  return voices.find((voice) => voice.lang.toLowerCase().startsWith(code)) ?? null;
}

export function speakText(
  text: string,
  code: LanguageCode,
  voices: SpeechSynthesisVoice[],
  onEnd: () => void,
): SpeakResult {
  if (!isSpeechSupported()) return 'unsupported';
  const voice = findVoice(voices, code);
  if (!voice) return 'no-voice';

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.voice = voice;
  utterance.lang = voice.lang;
  utterance.rate = 0.95;
  utterance.onend = onEnd;
  utterance.onerror = onEnd;
  window.speechSynthesis.speak(utterance);
  return 'spoken';
}

export function stopSpeaking() {
  if (isSpeechSupported()) window.speechSynthesis.cancel();
}
