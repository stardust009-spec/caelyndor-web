"use client";

import { useEffect, useState } from "react";

type ReadingProgressProps = {
  target?: string;
};

export function ReadingProgress({ target = ".story-reader" }: ReadingProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const element = document.querySelector<HTMLElement>(target);

    if (!element) {
      return;
    }

    let frame = 0;

    function update() {
      frame = 0;
      const rect = element!.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const advanced = -rect.top;
      const value =
        total > 0 ? Math.min(1, Math.max(0, advanced / total)) : rect.top < window.innerHeight ? 1 : 0;
      setProgress(value);
    }

    function schedule() {
      if (!frame) {
        frame = window.requestAnimationFrame(update);
      }
    }

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, [target]);

  return (
    <div className="story-progress" aria-hidden="true">
      <div className="story-progress__fill" style={{ transform: `scaleX(${progress})` }} />
    </div>
  );
}
