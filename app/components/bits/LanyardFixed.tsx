'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const Lanyard = dynamic(() => import('./Lanyard'), { ssr: false });

export default function LanyardFixed() {
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px) and (pointer: fine)');
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  // Defer loading the 3D canvas until the browser is idle and the page has
  // finished its initial paint. This keeps the heavy three/rapier/glb payload
  // out of the critical path so the homepage feels fast on first load.
  useEffect(() => {
    if (!enabled) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    type IdleWindow = Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
    };
    const w = window as IdleWindow;
    const schedule = () => {
      if (typeof w.requestIdleCallback === 'function') {
        w.requestIdleCallback(() => setReady(true), { timeout: 3000 });
      } else {
        timer = setTimeout(() => setReady(true), 1200);
      }
    };
    if (document.readyState === 'complete') {
      schedule();
    } else {
      window.addEventListener('load', schedule, { once: true });
    }
    return () => {
      if (timer) clearTimeout(timer);
      window.removeEventListener('load', schedule);
    };
  }, [enabled]);

  if (!enabled || !ready) return null;

  return (
    <div className="lanyard-fixed-right" aria-hidden="true">
      <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
    </div>
  );
}
