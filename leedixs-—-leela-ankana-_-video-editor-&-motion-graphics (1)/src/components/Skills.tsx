import React, { useState } from 'react';
import { SKILLS_LIST } from '../data/portfolioData';
import { Sparkles, CheckCircle2, Sliders, Volume2, Film, Layers } from 'lucide-react';

export const Skills: React.FC = () => {
  const [activeSkill, setActiveSkill] = useState(SKILLS_LIST[0]);

  const getSkillIcon = (name: string) => {
    switch (name) {
      case 'Adobe Premiere Pro':
        return <Film className="w-5 h-5 text-[#c4b5fd]" />;
      case 'Adobe After Effects':
        return <Layers className="w-5 h-5 text-[#c4b5fd]" />;
      case 'Motion Graphics':
        return <Sparkles className="w-5 h-5 text-[#c4b5fd]" />;
      case 'Color Grading':
        return <Sliders className="w-5 h-5 text-[#c4b5fd]" />;
      case 'Sound Design':
        return <Volume2 className="w-5 h-5 text-[#c4b5fd]" />;
      default:
        return <Film className="w-5 h-5 text-[#c4b5fd]" />;
    }
  };

  return (
    <section id="skills" className="py-24 md:py-32 relative border-t border-zinc-900 bg-[#09090b]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c4b5fd]" />
            <span className="text-xs uppercase tracking-widest text-[#c4b5fd] font-semibold">
              Technical & Creative Mastery
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white font-display">
            Core Toolkit & Craft
          </h2>
          <p className="text-zinc-400 mt-2 text-base md:text-lg">
            Specialized tools and artistic sensibilities applied to every production.
          </p>
        </div>

        {/* Elegant Skills Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Skill Tag Cards Grid (Left side) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SKILLS_LIST.map((skill) => {
              const isSelected = activeSkill.name === skill.name;
              return (
                <button
                  key={skill.name}
                  onClick={() => setActiveSkill(skill)}
                  className={`text-left p-5 rounded-2xl transition-all duration-200 border ${
                    isSelected
                      ? 'bg-zinc-900 border-[#c4b5fd]/80 shadow-[0_0_25px_rgba(196,181,253,0.15)] ring-1 ring-[#c4b5fd]/40'
                      : 'bg-zinc-900/40 hover:bg-zinc-900/80 border-zinc-800/80 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-zinc-950 flex items-center justify-center border border-zinc-800">
                      {getSkillIcon(skill.name)}
                    </div>
                    <span className="text-[11px] font-mono tracking-wider text-zinc-500 uppercase">
                      {skill.level}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white font-display">
                    {skill.name}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
                    {skill.description}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Interactive Skill Detail Spotlight (Right side) */}
          <div className="lg:col-span-5 rounded-2xl bg-zinc-900/50 border border-zinc-800 p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#c4b5fd] uppercase tracking-wider mb-2">
                <span>Domain Focus</span>
                <span aria-hidden="true" className="text-zinc-600">·</span>
                <span>{activeSkill.category}</span>
              </div>

              <h3 className="text-2xl font-bold text-white font-display mb-4">
                {activeSkill.name}
              </h3>

              <p className="text-sm md:text-base text-zinc-300 leading-relaxed mb-6">
                {activeSkill.description}
              </p>

              <div className="space-y-3 pt-6 border-t border-zinc-800">
                <div className="flex items-center gap-3 text-xs text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-[#c4b5fd] shrink-0" />
                  <span>Calibrated for high-retention storytelling</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-[#c4b5fd] shrink-0" />
                  <span>Tailored delivery across vertical & widescreen formats</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-[#c4b5fd] shrink-0" />
                  <span>Organized project timelines & seamless client handoff</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-zinc-800 flex items-center justify-between">
              <span className="text-xs text-zinc-500">Need this for your footage?</span>
              <a
                href="#contact"
                className="text-xs font-semibold text-[#c4b5fd] hover:text-white transition-colors"
              >
                Inquire for editing →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
