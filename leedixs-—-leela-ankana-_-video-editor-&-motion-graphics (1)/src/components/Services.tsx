import React from 'react';
import { SERVICES_LIST } from '../data/portfolioData';
import { Smartphone, Mic, Film, Sparkles, Share2, ArrowRight, Check } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const Services: React.FC = () => {
  const { setInquiryService } = usePortfolio();

  const getServiceIcon = (name: string) => {
    switch (name) {
      case 'Smartphone':
        return <Smartphone className="w-5 h-5 text-[#c4b5fd]" />;
      case 'Mic':
        return <Mic className="w-5 h-5 text-[#c4b5fd]" />;
      case 'Film':
        return <Film className="w-5 h-5 text-[#c4b5fd]" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-[#c4b5fd]" />;
      case 'Share2':
        return <Share2 className="w-5 h-5 text-[#c4b5fd]" />;
      default:
        return <Film className="w-5 h-5 text-[#c4b5fd]" />;
    }
  };

  const handleInquire = (serviceTitle: string) => {
    setInquiryService(serviceTitle);
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-24 md:py-32 relative border-t border-zinc-900 bg-zinc-950/40">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c4b5fd]" />
              <span className="text-xs uppercase tracking-widest text-[#c4b5fd] font-semibold">
                Services & Capabilities
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white font-display">
              Tailored Video Production
            </h2>
            <p className="text-zinc-400 mt-2 text-base md:text-lg">
              High-caliber editing designed for creators, agencies, and brands.
            </p>
          </div>

          <p className="text-xs md:text-sm text-zinc-500 max-w-xs font-mono">
            // High turnaround reliability · Direct one-on-one collaboration
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_LIST.map((service, index) => (
            <div
              key={service.id}
              className={`flex flex-col justify-between p-8 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/70 transition-all duration-300 group ${
                index === 0 ? 'lg:col-span-1' : ''
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center group-hover:border-[#c4b5fd]/40 transition-colors">
                    {getServiceIcon(service.iconName)}
                  </div>
                  <span className="text-xs font-mono text-zinc-500 tracking-wider">
                    {service.turnaroundTime}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white font-display group-hover:text-[#c4b5fd] transition-colors mb-3">
                  {service.title}
                </h3>

                <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Deliverables list */}
                <div className="space-y-2 pt-4 border-t border-zinc-850 mb-6">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 block mb-2">
                    Key Deliverables
                  </span>
                  {service.deliverables.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-xs text-zinc-300">
                      <Check className="w-3.5 h-3.5 text-[#c4b5fd] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleInquire(service.title)}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-semibold text-zinc-200 bg-zinc-900 hover:bg-[#c4b5fd] hover:text-zinc-950 border border-zinc-800 hover:border-[#c4b5fd] transition-all"
              >
                <span>Inquire for this</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
