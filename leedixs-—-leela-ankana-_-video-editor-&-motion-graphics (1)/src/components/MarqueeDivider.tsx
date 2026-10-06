import React from 'react';

export const MarqueeDivider: React.FC<{ text?: string }> = ({
  text = 'SELECTED WORKS · STORYTELLING · PACING & MOTION · COLOR FINISHING · KINETIC TYPOGRAPHY · SOUND DESIGN ·',
}) => {
  return (
    <div className="py-5 overflow-hidden border-y border-zinc-900 bg-zinc-950/80 select-none">
      <div className="flex whitespace-nowrap animate-marquee">
        <span className="text-xs uppercase tracking-[0.3em] font-mono text-zinc-600 mx-4">
          {text} {text}
        </span>
        <span className="text-xs uppercase tracking-[0.3em] font-mono text-zinc-600 mx-4" aria-hidden="true">
          {text} {text}
        </span>
      </div>
    </div>
  );
};
