import type { RefObject } from 'react';
import { AlertTriangle, Camera, CameraOff, Loader2, ScanLine, ShieldCheck } from 'lucide-react';
import type { TrackerStatus } from '@/hooks/useHandTracking';
import type { WebcamStatus } from '@/hooks/useWebcam';
import { Button } from '@/components/ui/Button';

interface CameraPanelProps {
  videoRef: RefObject<HTMLVideoElement>;
  canvasRef: RefObject<HTMLCanvasElement>;
  webcamStatus: WebcamStatus;
  errorMessage: string | null;
  trackerStatus: TrackerStatus;
  handCount: number;
  onStart: () => void;
  onStop: () => void;
}

function trackingLabel(status: TrackerStatus, handCount: number, cameraLive: boolean) {
  if (!cameraLive) return 'Hand tracking starts with the camera';
  switch (status) {
    case 'loading':
      return 'Loading hand tracking model...';
    case 'tracking':
      return handCount > 0 ? `Tracking ${handCount} ${handCount === 1 ? 'hand' : 'hands'}` : 'Tracking active - show your hands to the camera';
    case 'error':
      return 'Hand tracking is unavailable on this connection. The camera preview still works.';
    default:
      return 'Hand tracking idle';
  }
}

export function CameraPanel({
  videoRef,
  canvasRef,
  webcamStatus,
  errorMessage,
  trackerStatus,
  handCount,
  onStart,
  onStop,
}: CameraPanelProps) {
  const cameraLive = webcamStatus === 'live';
  const busy = webcamStatus === 'requesting';

  return (
    <section aria-labelledby="camera-heading" className="rounded-2xl bg-white p-5 shadow-card ring-1 ring-navy-100 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 id="camera-heading" className="text-lg font-semibold text-navy-900">
            Webcam preview
          </h2>
          <p className="text-sm text-navy-500">Your camera feed stays in this browser.</p>
        </div>
        <span
          className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
            cameraLive ? 'bg-teal-50 text-teal-800 ring-1 ring-inset ring-teal-200' : 'bg-navy-100 text-navy-600'
          }`}
        >
          <span className="relative flex h-2 w-2">
            {cameraLive && <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-teal-500" />}
            <span className={`relative inline-flex h-2 w-2 rounded-full ${cameraLive ? 'bg-teal-500' : 'bg-navy-300'}`} />
          </span>
          {cameraLive ? 'Camera live' : busy ? 'Requesting access' : 'Camera off'}
        </span>
      </div>

      <div className="relative mt-5 aspect-video overflow-hidden rounded-xl bg-navy-900 ring-1 ring-inset ring-navy-800">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          aria-label="Live webcam preview"
          className={`h-full w-full object-contain -scale-x-100 ${cameraLive ? 'opacity-100' : 'opacity-0'}`}
        />
        <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full object-contain -scale-x-100" aria-hidden="true" />

        {!cameraLive && (
          <div className="absolute inset-0 grid place-items-center p-6 text-center">
            <div className="max-w-xs space-y-3">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-white/10 text-white">
                {busy ? <Loader2 className="h-6 w-6 animate-spin" aria-hidden="true" /> : <CameraOff className="h-6 w-6" aria-hidden="true" />}
              </div>
              <p className="text-sm font-medium text-white">
                {busy ? 'Waiting for camera permission...' : 'Your camera is off'}
              </p>
              <p className="text-xs text-navy-200">Nothing is recorded. The camera only runs while you press Start Camera.</p>
            </div>
          </div>
        )}
      </div>

      {errorMessage && (
        <div role="alert" className="mt-4 flex gap-3 rounded-xl bg-red-50 p-4 text-sm text-red-800 ring-1 ring-inset ring-red-200">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <p>{errorMessage}</p>
        </div>
      )}

      <div className="mt-5 flex flex-wrap items-center gap-3">
        {cameraLive ? (
          <Button variant="secondary" onClick={onStop}>
            <CameraOff className="h-4 w-4" aria-hidden="true" />
            Stop Camera
          </Button>
        ) : (
          <Button onClick={onStart} disabled={busy}>
            {busy ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Camera className="h-4 w-4" aria-hidden="true" />}
            Start Camera
          </Button>
        )}
        <p className="flex items-center gap-2 text-sm text-navy-600" aria-live="polite">
          <ScanLine className="h-4 w-4 text-teal-600" aria-hidden="true" />
          {trackingLabel(trackerStatus, handCount, cameraLive)}
        </p>
      </div>

      <div className="mt-5 flex gap-3 rounded-xl bg-amber-50 p-4 text-sm text-amber-900 ring-1 ring-inset ring-amber-200">
        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
        <p>
          Hand tracking shows where your hands are. Recognised handshapes appear beside the camera, and a word is added
          only when you press Add word. Continuous signing and full sentences are not recognised yet.
        </p>
      </div>
    </section>
  );
}
