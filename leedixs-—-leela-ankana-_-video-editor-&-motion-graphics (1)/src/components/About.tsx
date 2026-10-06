import React from 'react';
import { Film, Sparkles, Layers, Sliders, ArrowUpRight, Volume2 } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 md:py-32 relative border-t border-zinc-900 bg-zinc-950/50">
      {/* Ambient gradient */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#c4b5fd]/5 rounded-full blur-[140px]"
      />

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-3xl mb-12">
          {/* Small kicker */}
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c4b5fd]" />
            <span className="text-xs uppercase tracking-widest text-[#c4b5fd] font-semibold">
              Creative Director & Editor
            </span>
          </div>

          {/* Main Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white font-display mb-8">
            Behind The Edits
          </h2>

          {/* Exact narrative content */}
          <div className="space-y-6 text-zinc-300 text-lg md:text-xl leading-relaxed font-normal">
            <p className="text-zinc-200">
              I'm <span className="text-white font-semibold">Leela Ankana</span>, a young creative exploring the art of visual storytelling. From editing short-form videos to experimenting with motion graphics, I love transforming ordinary footage into engaging visual experiences.
            </p>
            <p className="text-zinc-400 text-base md:text-lg">
              Every project is another opportunity to learn, experiment, and create something meaningful.
            </p>
          </div>
        </div>

        {/* Editorial Pillars & Philosophy Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-10 border-t border-zinc-900">
          <div className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800/60 hover:border-zinc-700 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-zinc-950 flex items-center justify-center border border-zinc-800 text-[#c4b5fd] mb-4">
              <Film className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white font-display mb-2">
              Rhythmic Pacing
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Every cut is timed with audio transients and emotional intent, keeping viewers hooked through every frame.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800/60 hover:border-zinc-700 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-zinc-950 flex items-center justify-center border border-zinc-800 text-[#c4b5fd] mb-4">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white font-display mb-2">
              Atmospheric Grade
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Tailored color palettes and cinematic contrast curves that give each piece a distinct, high-end identity.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800/60 hover:border-zinc-700 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-zinc-950 flex items-center justify-center border border-zinc-800 text-[#c4b5fd] mb-4">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white font-display mb-2">
              Motion Design
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Kinetic typography, animated lower thirds, and optical transitions crafted frame by frame in After Effects.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800/60 hover:border-zinc-700 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-zinc-950 flex items-center justify-center border border-zinc-800 text-[#c4b5fd] mb-4">
              <Volume2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white font-display mb-2">
              Sound Architecture
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Multi-layered sound effects, risers, and impact cues that heighten emotional tension and polish.
            </p>
          </div>
        </div>

        {/* Action CTA */}
        <div className="mt-12 flex items-center gap-4">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#c4b5fd] hover:text-white transition-colors group"
          >
            <span>Discuss a project with me</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};
