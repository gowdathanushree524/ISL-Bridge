import { useEffect, useRef, useState, type RefObject } from 'react';
import { DrawingUtils, HandLandmarker, type HandLandmarkerResult } from '@mediapipe/tasks-vision';
import { createHandLandmarker } from '@/services/handTracker';

export type TrackerStatus = 'idle' | 'loading' | 'tracking' | 'error';

export type FrameListener = (result: HandLandmarkerResult, video: HTMLVideoElement) => void;

interface Options {
  videoRef: RefObject<HTMLVideoElement>;
  canvasRef: RefObject<HTMLCanvasElement>;
  enabled: boolean;
  drawLandmarks: boolean;
  onFrame?: FrameListener;
}

export function useHandTracking({ videoRef, canvasRef, enabled, drawLandmarks, onFrame }: Options) {
  const landmarkerRef = useRef<HandLandmarker | null>(null);
  const onFrameRef = useRef(onFrame);
  useEffect(() => {
    onFrameRef.current = onFrame;
  }, [onFrame]);
  const [status, setStatus] = useState<TrackerStatus>('idle');
  const [handCount, setHandCount] = useState(0);

  useEffect(() => {
    if (!enabled) {
      setStatus('idle');
      setHandCount(0);
      return;
    }

    let cancelled = false;
    let frameId = 0;
    let lastVideoTime = -1;

    const drawResult = (result: HandLandmarkerResult, video: HTMLVideoElement) => {
      const canvas = canvasRef.current;
      const context = canvas?.getContext('2d');
      if (!canvas || !context) return;
      if (canvas.width !== video.videoWidth) canvas.width = video.videoWidth;
      if (canvas.height !== video.videoHeight) canvas.height = video.videoHeight;
      context.clearRect(0, 0, canvas.width, canvas.height);
      if (!drawLandmarks) return;

      const utils = new DrawingUtils(context);
      for (const landmarks of result.landmarks) {
        utils.drawConnectors(landmarks, HandLandmarker.HAND_CONNECTIONS, { color: '#14B8A6', lineWidth: 3 });
        utils.drawLandmarks(landmarks, { color: '#4F46E5', radius: 4 });
      }
    };

    const loop = () => {
      const landmarker = landmarkerRef.current;
      const video = videoRef.current;
      if (cancelled || !landmarker || !video) return;

      if (video.readyState >= 2 && video.currentTime !== lastVideoTime) {
        lastVideoTime = video.currentTime;
        const result = landmarker.detectForVideo(video, performance.now());
        drawResult(result, video);
        onFrameRef.current?.(result, video);
        setHandCount(result.landmarks.length);
      }
      frameId = requestAnimationFrame(loop);
    };

    const init = async () => {
      setStatus('loading');
      try {
        if (!landmarkerRef.current) landmarkerRef.current = await createHandLandmarker();
        if (cancelled) return;
        setStatus('tracking');
        frameId = requestAnimationFrame(loop);
      } catch {
        if (!cancelled) setStatus('error');
      }
    };

    void init();

    return () => {
      cancelled = true;
      cancelAnimationFrame(frameId);
      canvasRef.current?.getContext('2d')?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    };
  }, [enabled, drawLandmarks, videoRef, canvasRef]);

  useEffect(() => {
    return () => {
      landmarkerRef.current?.close();
      landmarkerRef.current = null;
    };
  }, []);

  return { status, handCount };
}
