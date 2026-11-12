import { useCallback, useEffect, useRef, useState } from 'react';
import type { LanguageCode } from '@/types';
import { isSpeechSupported, speakText, stopSpeaking } from '@/services/speech';

export function useSpeech() {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const lastRef = useRef<{ key: string; text: string; code: LanguageCode } | null>(null);
  const supported = isSpeechSupported();

  useEffect(() => {
    if (!supported) return;
    const synth = window.speechSynthesis;
    const loadVoices = () => setVoices(synth.getVoices());
    loadVoices();
    synth.addEventListener('voiceschanged', loadVoices);
    return () => {
      synth.removeEventListener('voiceschanged', loadVoices);
      synth.cancel();
    };
  }, [supported]);

  const speak = useCallback(
    (key: string, text: string, code: LanguageCode) => {
      lastRef.current = { key, text, code };
      const result = speakText(text, code, voices, () =>
        setActiveKey((current) => (current === key ? null : current)),
      );
      if (result === 'spoken') {
        setActiveKey(key);
        setNotice(null);
      } else if (result === 'no-voice') {
        setActiveKey(null);
        setNotice('This device has no voice installed for this language, so the text is shown without audio.');
      } else {
        setActiveKey(null);
        setNotice('Speech output is not supported in this browser.');
      }
    },
    [voices],
  );

  const stop = useCallback(() => {
    stopSpeaking();
    setActiveKey(null);
  }, []);

  const replay = useCallback(() => {
    const last = lastRef.current;
    if (last) speak(last.key, last.text, last.code);
  }, [speak]);

  return { supported, activeKey, notice, speak, stop, replay };
}
