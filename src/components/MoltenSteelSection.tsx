import React, { useEffect, useRef, useState } from 'react';

const FRAME_COUNT = 125;
const FRAME_PATH = '/scrub-frames';
const SCROLL_LENGTH_VH = 400;

const frameUrl = (index: number) =>
  `${FRAME_PATH}/frame_${String(index + 1).padStart(3, '0')}.webp`;

export const MoltenSteelSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const prefersReducedMotion = useRef(false);
  const [loaded, setLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let loadedCount = 0;
    const images = imagesRef.current;

    for (let index = 0; index < FRAME_COUNT; index += 1) {
      const image = new Image();
      image.src = frameUrl(index);
      image.onload = () => {
        loadedCount += 1;
        setLoadProgress(Math.round((loadedCount / FRAME_COUNT) * 100));
        if (loadedCount === FRAME_COUNT) setLoaded(true);
      };
      images[index] = image;
    }

    return () => {
      images.forEach((image) => {
        image.onload = null;
      });
    };
  }, []);

  useEffect(() => {
    if (!loaded) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !container || !context) return;

    const drawFrame = (index: number) => {
      const image = imagesRef.current[index];
      if (image?.complete) {
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
      }
    };

    drawFrame(prefersReducedMotion.current ? FRAME_COUNT - 1 : 0);
    if (prefersReducedMotion.current) return;

    let animationFrameId = 0;
    const onScroll = () => {
      if (animationFrameId) return;

      animationFrameId = requestAnimationFrame(() => {
        const rect = container.getBoundingClientRect();
        const scrollableDistance = Math.max(rect.height - window.innerHeight, 1);
        const progress = Math.min(1, Math.max(0, -rect.top / scrollableDistance));
        const frameIndex = Math.min(FRAME_COUNT - 1, Math.floor(progress * FRAME_COUNT));
        drawFrame(frameIndex);
        animationFrameId = 0;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [loaded]);

  return (
    <div
      ref={containerRef}
      className="scroll-scrub-section"
      style={{ height: `${SCROLL_LENGTH_VH}vh` }}
      aria-label="Molten steel transformation"
    >
      <div className="scroll-scrub-sticky">
        <canvas ref={canvasRef} width={1280} height={720} className="scroll-scrub-canvas" />
        {!loaded && (
          <div className="scroll-scrub-loading" aria-hidden="true">
            Loading... {loadProgress}%
          </div>
        )}
      </div>
    </div>
  );
};
