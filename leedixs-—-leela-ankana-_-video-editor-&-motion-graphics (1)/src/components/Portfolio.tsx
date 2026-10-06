import React, { useState } from 'react';
import { Sparkles, Film, Layers, Smartphone } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { VideoSlotCard } from './VideoSlotCard';
import { ProjectCategory } from '../types/portfolio';

const FILTER_TABS: ('All' | ProjectCategory)[] = [
  'All',
  'Short-Form Edits',
  'After Effects & Motion Graphics',
];

export const Portfolio: React.FC = () => {
  const { projects } = usePortfolio();
  const [activeTab, setActiveTab] = useState<'All' | ProjectCategory>('All');

  const shortFormProjects = projects.filter((p) => p.category === 'Short-Form Edits');
  const motionProjects = projects.filter((p) => p.category === 'After Effects & Motion Graphics');

  const uploadedCount = projects.filter((p) => p.isUploaded).length;

  return (
    <section id="works" className="py-24 md:py-32 relative border-t border-zinc-900 bg-[#09090b]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c4b5fd]" />
              <span className="text-xs uppercase tracking-widest text-[#c4b5fd] font-semibold">
                Portfolio Gallery
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white font-display">
              Selected Works
            </h2>
            <p className="text-zinc-400 mt-2 text-base md:text-lg">
              A collection of stories told through motion.
            </p>
          </div>

          {/* Quick upload status info */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-zinc-400 bg-zinc-900/80 border border-zinc-800 px-3 py-1.5 rounded-lg">
              {uploadedCount} of {projects.length} Videos Uploaded
            </span>
          </div>
        </div>

        {/* Category Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-16 no-scrollbar">
          {FILTER_TABS.map((tab) => {
            const isActive = activeTab === tab;
            let count = projects.length;
            if (tab === 'Short-Form Edits') count = shortFormProjects.length;
            if (tab === 'After Effects & Motion Graphics') count = motionProjects.length;

            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-xs md:text-sm font-medium rounded-full transition-all whitespace-nowrap flex items-center gap-2 ${
                  isActive
                    ? 'bg-[#c4b5fd] text-zinc-950 shadow-[0_0_20px_rgba(196,181,253,0.3)] font-semibold'
                    : 'bg-zinc-900/80 text-zinc-400 hover:text-zinc-200 border border-zinc-800/80 hover:border-zinc-700'
                }`}
              >
                <span>{tab}</span>
                <span className={`text-[11px] font-mono px-1.5 py-0.2 rounded-full ${
                  isActive ? 'bg-zinc-950/20 text-zinc-950' : 'bg-zinc-800 text-zinc-400'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ----------------- SECTION A: SHORT-FORM VIDEO EDITING ----------------- */}
        {(activeTab === 'All' || activeTab === 'Short-Form Edits') && (
          <div id="short-form" className="mb-20 scroll-mt-28">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-850">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[#c4b5fd]">
                  <Smartphone className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-white font-display">
                    Short-Form Edits
                  </h3>
                  <p className="text-xs md:text-sm text-zinc-400">
                    6 vertical video reels (9:16) crafted for high engagement and dynamic rhythm.
                  </p>
                </div>
              </div>

              <span className="text-xs font-mono text-zinc-500">
                {shortFormProjects.filter(p => p.isUploaded).length}/6 Uploaded
              </span>
            </div>

            {/* 6 Vertical Video Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
              {shortFormProjects.map((project) => (
                <VideoSlotCard
                  key={project.id}
                  project={project}
                  aspectRatioClass="aspect-[9/16]"
                  isVertical={true}
                />
              ))}
            </div>
          </div>
        )}

        {/* ----------------- SECTION B: AFTER EFFECTS & MOTION GRAPHICS ----------------- */}
        {(activeTab === 'All' || activeTab === 'After Effects & Motion Graphics') && (
          <div id="motion-graphics" className="scroll-mt-28">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-850">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[#c4b5fd]">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-white font-display">
                    After Effects & Motion Graphics
                  </h3>
                  <p className="text-xs md:text-sm text-zinc-400">
                    5 motion design pieces with kinetic typography, visual effects, and graphic sequencing.
                  </p>
                </div>
              </div>

              <span className="text-xs font-mono text-zinc-500">
                {motionProjects.filter(p => p.isUploaded).length}/5 Uploaded
              </span>
            </div>

            {/* 5 Widescreen Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {motionProjects.map((project, index) => (
                <div key={project.id} className={index < 2 && motionProjects.length === 5 ? 'lg:col-span-1' : ''}>
                  <VideoSlotCard
                    project={project}
                    aspectRatioClass="aspect-video"
                    isVertical={false}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
