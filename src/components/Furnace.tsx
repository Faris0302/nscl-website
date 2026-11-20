import { lazy, Suspense, type ComponentProps } from 'react';

// Three.js loads only on pages that show the furnace, after the page itself.
const FurnaceCanvas = lazy(() => import('./FurnaceCanvas'));

export function Furnace(props: ComponentProps<typeof FurnaceCanvas>) {
  return (
    <Suspense fallback={<img src={props.fallback} alt="" className="h-full w-full object-cover opacity-30" />}>
      <FurnaceCanvas {...props} />
    </Suspense>
  );
}
