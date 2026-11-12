import { useCallback, useEffect, useRef, useState, type RefObject } from 'react';

export type WebcamStatus = 'idle' | 'requesting' | 'live' | 'denied' | 'unavailable' | 'error';

function describeError(error: unknown): { status: WebcamStatus; message: string } {
  const name = error instanceof DOMException ? error.name : '';
  if (name === 'NotAllowedError' || name === 'SecurityError') {
    return {
      status: 'denied',
      message: 'Camera permission was blocked. Allow camera access in your browser settings, then try again.',
    };
  }
  if (name === 'NotFoundError' || name === 'OverconstrainedError') {
    return { status: 'unavailable', message: 'No camera was found on this device.' };
  }
  return { status: 'error', message: 'The camera could not be started. Please try again.' };
}

export function useWebcam() {
  const videoRef: RefObject<HTMLVideoElement> = useRef(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [status, setStatus] = useState<WebcamStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const stopStream = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
  }, []);

  const start = useCallback(async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      setStatus('unavailable');
      setErrorMessage('This browser does not support camera access.');
      return;
    }
    setStatus('requesting');
    setErrorMessage(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: 'user' },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setStatus('live');
    } catch (error) {
      stopStream();
      const described = describeError(error);
      setStatus(described.status);
      setErrorMessage(described.message);
    }
  }, [stopStream]);

  const stop = useCallback(() => {
    stopStream();
    setStatus('idle');
    setErrorMessage(null);
  }, [stopStream]);

  useEffect(() => stopStream, [stopStream]);

  return { videoRef, status, errorMessage, start, stop };
}
