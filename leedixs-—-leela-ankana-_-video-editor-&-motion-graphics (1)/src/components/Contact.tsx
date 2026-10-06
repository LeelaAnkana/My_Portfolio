import React, { useState, useEffect } from 'react';
import { Mail, Instagram, Linkedin, Send, CheckCircle2, Copy, Check, Edit3, ArrowUpRight } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const Contact: React.FC = () => {
  const { contactInfo, updateContactInfo, selectedServiceForInquiry } = usePortfolio();

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    service: 'Short-Form Edits',
    budget: '$500 - $1,500',
    timeline: 'Within 1-2 weeks',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isEditingLinks, setIsEditingLinks] = useState(false);
  const [tempLinks, setTempLinks] = useState(contactInfo);

  // Sync selected service if triggered from Services component
  useEffect(() => {
    if (selectedServiceForInquiry) {
      setFormState((prev) => ({ ...prev, service: selectedServiceForInquiry }));
    }
  }, [selectedServiceForInquiry]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSaveLinks = (e: React.FormEvent) => {
    e.preventDefault();
    updateContactInfo(tempLinks);
    setIsEditingLinks(false);
  };

  return (
    <section id="contact" className="py-24 md:py-32 relative border-t border-zinc-900 bg-[#09090b]">
      {/* Ambient gradient */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#c4b5fd]/6 rounded-full blur-[160px]"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c4b5fd]" />
            <span className="text-xs uppercase tracking-widest text-[#c4b5fd] font-semibold">
              Get In Touch
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white font-display mb-4">
            Have a project in mind?
          </h2>
          <p className="text-xl md:text-2xl text-zinc-300 font-light">
            Let's create something worth watching.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Direct Contact Info & Socials */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div>
              <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-8">
                Whether you have raw footage waiting to be transformed into viral reels, an After Effects sequence requiring motion polish, or a branded promotional cut—I'd love to collaborate.
              </p>

              {/* Direct channels list: Email, Instagram (@leeladiaries), LinkedIn */}
              <div className="space-y-4">
                {/* Email Box */}
                <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex items-center justify-between group hover:border-zinc-700 transition-colors">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-zinc-950 flex items-center justify-center border border-zinc-800 text-[#c4b5fd] group-hover:border-[#c4b5fd]/40 transition-colors">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 block">
                        Direct Email
                      </span>
                      <a
                        href={`mailto:${contactInfo.email}`}
                        className="text-sm font-semibold text-white hover:text-[#c4b5fd] transition-colors"
                      >
                        {contactInfo.email}
                      </a>
                    </div>
                  </div>

                  <button
                    onClick={handleCopyEmail}
                    className="p-2.5 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 transition-colors"
                    title="Copy Email address"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Instagram: @leeladiaries */}
                <a
                  href={contactInfo.instagram || 'https://instagram.com/leeladiaries'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 flex items-center justify-between transition-colors group"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-zinc-950 flex items-center justify-center border border-zinc-800 text-pink-400 group-hover:border-pink-500/40 transition-colors">
                      <Instagram className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 block">
                        Instagram
                      </span>
                      <span className="text-sm font-semibold text-white group-hover:text-[#c4b5fd] transition-colors">
                        @leeladiaries
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
                </a>

                {/* LinkedIn */}
                <a
                  href={contactInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 flex items-center justify-between transition-colors group"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-zinc-950 flex items-center justify-center border border-zinc-800 text-sky-400 group-hover:border-sky-500/40 transition-colors">
                      <Linkedin className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 block">
                        LinkedIn
                      </span>
                      <span className="text-sm font-semibold text-white group-hover:text-[#c4b5fd] transition-colors">
                        Leela Ankana
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
                </a>
              </div>
            </div>

            {/* Quick Edit Contact Details Drawer Trigger */}
            <div className="pt-2">
              <button
                onClick={() => {
                  setTempLinks(contactInfo);
                  setIsEditingLinks(true);
                }}
                className="inline-flex items-center gap-2 text-xs text-zinc-400 hover:text-[#c4b5fd] transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Update Contact Links</span>
              </button>
            </div>
          </div>

          {/* Right Column: Project Brief Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl md:rounded-3xl bg-zinc-900/40 border border-zinc-800 p-8 md:p-10 relative">
              {submitted ? (
                <div className="py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-[#c4b5fd]/20 text-[#c4b5fd] flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white font-display mb-2">
                    Inquiry Received!
                  </h3>
                  <p className="text-zinc-400 text-sm max-w-md mx-auto mb-6">
                    Thank you for reaching out, <span className="text-white font-medium">{formState.name}</span>. Leela will review your project brief and respond directly via email within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormState({
                        name: '',
                        email: '',
                        service: 'Short-Form Edits',
                        budget: '$500 - $1,500',
                        timeline: 'Within 1-2 weeks',
                        message: '',
                      });
                    }}
                    className="px-6 py-2.5 text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="e.g. Alex Morgan"
                        className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-[#c4b5fd] focus:outline-none text-sm text-white placeholder-zinc-600 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="alex@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-[#c4b5fd] focus:outline-none text-sm text-white placeholder-zinc-600 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                        Service Category
                      </label>
                      <select
                        value={formState.service}
                        onChange={(e) => setFormState({ ...formState, service: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-[#c4b5fd] focus:outline-none text-sm text-white transition-colors"
                      >
                        <option value="Short-Form Edits">Short-Form Edits (Reels & Shorts)</option>
                        <option value="After Effects & Motion Graphics">After Effects & Motion Graphics</option>
                        <option value="Promotional Videos">Promotional Videos</option>
                        <option value="Podcast Editing">Podcast Editing</option>
                        <option value="Social Media Content Retainer">Social Media Content (Retainer)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                        Estimated Timeline
                      </label>
                      <select
                        value={formState.timeline}
                        onChange={(e) => setFormState({ ...formState, timeline: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-[#c4b5fd] focus:outline-none text-sm text-white transition-colors"
                      >
                        <option value="Urgent (24-48 hours)">Urgent (24-48 hours)</option>
                        <option value="Within 1-2 weeks">Within 1-2 weeks</option>
                        <option value="Within 1 month">Within 1 month</option>
                        <option value="Ongoing / Retainer">Ongoing / Monthly</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                      Project Details / Footage Link *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Tell me about your project, raw footage length, references, or paste a link to raw assets..."
                      className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-[#c4b5fd] focus:outline-none text-sm text-white placeholder-zinc-600 transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 px-6 rounded-xl font-semibold text-sm text-zinc-950 bg-[#c4b5fd] hover:bg-[#ddd6fe] transition-all flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(196,181,253,0.3)] hover:shadow-[0_0_35px_rgba(196,181,253,0.5)]"
                  >
                    <span>Send Project Inquiry</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Contact Links Modal */}
      {isEditingLinks && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl">
            <h3 className="text-xl font-bold text-white font-display mb-1">
              Edit Contact Details
            </h3>
            <p className="text-xs text-zinc-400 mb-6">
              Update your social profiles and direct email address.
            </p>

            <form onSubmit={handleSaveLinks} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">Email</label>
                <input
                  type="email"
                  value={tempLinks.email}
                  onChange={(e) => setTempLinks({ ...tempLinks, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">Instagram Link</label>
                <input
                  type="text"
                  value={tempLinks.instagram}
                  onChange={(e) => setTempLinks({ ...tempLinks, instagram: e.target.value })}
                  placeholder="https://instagram.com/leeladiaries"
                  className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">LinkedIn Link</label>
                <input
                  type="text"
                  value={tempLinks.linkedin}
                  onChange={(e) => setTempLinks({ ...tempLinks, linkedin: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-sm text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-850">
                <button
                  type="button"
                  onClick={() => setIsEditingLinks(false)}
                  className="px-4 py-2 text-xs text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold bg-[#c4b5fd] text-zinc-950 rounded-lg hover:bg-[#ddd6fe]"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
