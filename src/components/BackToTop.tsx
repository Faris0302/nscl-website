import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const f = () => setShow(window.scrollY > 900);
    f();
    window.addEventListener('scroll', f, { passive: true });
    return () => window.removeEventListener('scroll', f);
  }, []);
  return (
    <button type="button" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed bottom-[max(20px,env(safe-area-inset-bottom,0px))] right-[calc(max(20px,env(safe-area-inset-right,0px))+68px)] z-[64] grid h-12 w-12 place-items-center rounded-full border border-sky-light/25 bg-deep-space-300/90 backdrop-blur transition duration-300 hover:border-amber-flame hover:text-amber-flame ${show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'}`}>
      <ArrowUp size={18} />
    </button>
  );
}
