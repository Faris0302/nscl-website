import { useEffect, useRef, useState } from 'react';
import { FurnaceScene, type Shot } from '../three/FurnaceScene';
import { prefersReducedMotion } from '../lib/gsap';

type Props = {
  shots: Shot[];
  /** Receives the live scene so a ScrollTrigger can call scene.setProgress(p). */
  onReady?: (scene: FurnaceScene | null) => void;
  /** Shown when WebGL is unavailable. */
  fallback: string;
  className?: string;
  label: string;
};

export default function FurnaceCanvas({ shots, onReady, fallback, className = '', label }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const small = window.matchMedia('(max-width: 768px)').matches;
    const scene = new FurnaceScene(canvas, { quality: small ? 'low' : 'high', still: prefersReducedMotion() });
    if (!scene.ok) {
      setFailed(true);
      onReady?.(null);
      return;
    }
    scene.setShots(shots);
    scene.resize();
    onReady?.(scene);

    const ro = new ResizeObserver(() => scene.resize());
    ro.observe(canvas);
    // Only animate while on screen and the tab is visible
    let visible = false;
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !document.hidden) scene.start();
      else scene.stop();
    });
    io.observe(canvas);
    const onVis = () => (document.hidden || !visible ? scene.stop() : scene.start());
    document.addEventListener('visibilitychange', onVis);

    return () => {
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      onReady?.(null);
      scene.dispose();
    };
    // shots are static per page
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return failed ? (
    <img src={fallback} alt="" className={`h-full w-full object-cover ${className}`} />
  ) : (
    <canvas ref={canvasRef} role="img" aria-label={label} className={`block h-full w-full ${className}`} />
  );
}
