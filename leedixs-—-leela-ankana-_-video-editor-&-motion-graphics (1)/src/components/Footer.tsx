import React from 'react';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 border-t border-zinc-900 bg-[#09090b] text-zinc-500 text-xs">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand mark */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <span className="text-xl font-bold tracking-tight text-white font-display">
            LEEDIXS
          </span>
          <p className="text-zinc-400">
            Made with creativity by Leela Ankana.
          </p>
        </div>

        {/* Quiet copyright & quick links */}
        <div className="flex items-center gap-6 text-zinc-400 text-xs">
          <a href="#works" className="hover:text-white transition-colors">
            Works
          </a>
          <a href="#about" className="hover:text-white transition-colors">
            Behind the Edits
          </a>
          <a href="#services" className="hover:text-white transition-colors">
            Services
          </a>
          <a href="#contact" className="hover:text-[#c4b5fd] transition-colors">
            Contact
          </a>
        </div>

        {/* Back to top */}
        <div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 p-2.5 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
            aria-label="Scroll back to top"
          >
            <span className="text-[11px] uppercase tracking-wider pl-1 font-mono">Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
