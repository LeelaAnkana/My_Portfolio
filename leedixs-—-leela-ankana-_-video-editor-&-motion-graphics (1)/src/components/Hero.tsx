import React, { useRef, useState } from 'react';
import { Camera, Upload, ArrowDown, RefreshCw, Check, User } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const Hero: React.FC = () => {
  const { profilePhoto, isCustomPhoto, uploadProfilePhoto, resetProfilePhoto } = usePortfolio();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      try {
        await uploadProfilePhoto(file);
      } catch (err) {
        console.error(err);
      } finally {
        setIsUploading(false);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/webp')) {
      setIsUploading(true);
      try {
        await uploadProfilePhoto(file);
      } catch (err) {
        console.error(err);
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Ambient background soft lavender atmospheric glow */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-[#c4b5fd]/8 rounded-full blur-[150px]"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Intro copy & Actions */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Small introductory label */}
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#c4b5fd] animate-pulse" />
              <span className="text-xs font-semibold tracking-[0.2em] text-[#c4b5fd] uppercase">
                INDEPENDENT VIDEO EDITOR
              </span>
            </div>

            {/* Main headline with 'Visual Experiences' in lavender */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white font-display leading-[1.08] mb-6">
              Turning Ideas Into{' '}
              <span className="text-[#c4b5fd] relative inline-block">
                Visual Experiences.
                <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-[#c4b5fd]/80 via-[#a78bfa]/50 to-transparent opacity-60" />
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-zinc-300 font-normal leading-relaxed mb-8 max-w-2xl">
              I'm Leela, a video editor passionate about storytelling, motion, and creating visuals that leave an impression.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#works"
                className="inline-flex items-center justify-center px-7 py-3.5 text-sm font-semibold text-zinc-950 bg-white hover:bg-zinc-200 rounded-xl transition-all shadow-[0_4px_24px_rgba(255,255,255,0.12)] hover:scale-[1.02] active:scale-[0.98]"
              >
                Explore My Work
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-7 py-3.5 text-sm font-semibold text-white bg-zinc-900/90 hover:bg-zinc-800/90 border border-zinc-700/80 hover:border-[#c4b5fd]/40 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Let's Collaborate
              </a>
            </div>

            {/* Micro proof line (Short-Form and After Effects only) */}
            <div className="mt-10 pt-6 border-t border-zinc-850 flex items-center gap-6 text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c4b5fd]" />
                <span>Short-Form Edits</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c4b5fd]" />
                <span>After Effects & Motion Graphics</span>
              </div>
            </div>
          </div>

          {/* Right Column: Dedicated Profile Photo Showcase with Laptop Upload */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div 
              className="relative w-full max-w-sm sm:max-w-md group"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Outer ambient glow ring */}
              <div 
                aria-hidden="true" 
                className="absolute -inset-1 bg-gradient-to-tr from-[#c4b5fd]/20 via-[#a78bfa]/10 to-transparent rounded-[2.5rem] blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-500 -z-10"
              />

              {/* Photo Frame Container */}
              <div 
                onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                onDragLeave={() => setIsDragOver(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`relative aspect-[4/5] rounded-[2.2rem] overflow-hidden border transition-all duration-300 bg-zinc-950 shadow-2xl cursor-pointer ${
                  isDragOver ? 'border-[#c4b5fd] ring-4 ring-[#c4b5fd]/20' : 'border-zinc-800 group-hover:border-zinc-700'
                }`}
              >
                {/* Profile Image if custom photo uploaded, or clean monogram avatar */}
                {isCustomPhoto ? (
                  <img
                    src={profilePhoto}
                    alt="Leela Ankana — Profile Photo"
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-b from-zinc-900 via-zinc-950 to-zinc-950 text-center">
                    <div className="w-24 h-24 rounded-full bg-zinc-900 border border-[#c4b5fd]/30 flex items-center justify-center text-[#c4b5fd] mb-5 shadow-[0_0_30px_rgba(196,181,253,0.15)] group-hover:scale-105 transition-transform">
                      <span className="font-display text-3xl font-bold tracking-tight">LA</span>
                    </div>
                    <span className="text-base font-bold text-white font-display">
                      Leela Ankana
                    </span>
                    <span className="text-xs text-[#c4b5fd] mt-1 font-medium">
                      LEEDIXS Studio
                    </span>
                    <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 group-hover:text-white group-hover:border-[#c4b5fd]/50 transition-colors">
                      <Camera className="w-3.5 h-3.5 text-[#c4b5fd]" />
                      <span>Upload Profile Photo</span>
                    </div>
                    <span className="text-[10px] text-zinc-400 mt-2 font-mono">
                      JPG · PNG · WebP
                    </span>
                  </div>
                )}

                {/* Subtle cinematic gradient vignette scrim */}
                {isCustomPhoto && (
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-80 pointer-events-none" />
                )}

                {/* Floating identity pill at bottom of photo */}
                {isCustomPhoto && (
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-zinc-950/85 backdrop-blur-md border border-zinc-800/80 flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-white font-display">
                        Leela Ankana
                      </h3>
                      <p className="text-[11px] text-[#c4b5fd] font-medium tracking-wide">
                        LEEDIXS · Video & Motion Creator
                      </p>
                    </div>

                    <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded-full">
                      <Check className="w-2.5 h-2.5" />
                      Custom
                    </span>
                  </div>
                )}

                {/* Hover overlay with Upload Trigger */}
                <div 
                  className={`absolute inset-0 bg-black/60 backdrop-blur-[2px] flex flex-col items-center justify-center p-6 text-center transition-opacity duration-300 ${
                    (isHovered || isDragOver) && isCustomPhoto ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                    disabled={isUploading}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-zinc-950 bg-[#c4b5fd] hover:bg-[#ddd6fe] shadow-[0_0_20px_rgba(196,181,253,0.5)] transition-all transform hover:scale-105"
                  >
                    <Upload className="w-4 h-4" />
                    <span>{isUploading ? 'Uploading...' : 'Change Profile Photo'}</span>
                  </button>

                  <p className="text-[11px] text-zinc-300 mt-2 font-mono">
                    Drop image here or click to select
                  </p>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      resetProfilePhoto();
                    }}
                    className="mt-4 inline-flex items-center gap-1.5 text-[11px] text-zinc-400 hover:text-white transition-colors"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Remove photo</span>
                  </button>
                </div>
              </div>

              {/* Hidden File Picker Input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileChange}
                className="hidden"
                aria-label="Upload profile photo"
              />

              {/* Mobile / Always visible quick upload button below photo */}
              <div className="mt-3 flex items-center justify-between px-2">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-[#c4b5fd] transition-colors"
                >
                  <Camera className="w-3.5 h-3.5 text-[#c4b5fd]" />
                  <span>{isCustomPhoto ? 'Change Photo' : 'Upload Your Photo'}</span>
                </button>
                <span className="text-[11px] text-zinc-600 font-mono">
                  JPG · PNG · WebP
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Quiet scroll down indicator */}
        <div className="mt-14 flex items-center justify-center">
          <a
            href="#works"
            className="flex items-center gap-2 text-xs uppercase tracking-widest text-zinc-500 hover:text-[#c4b5fd] transition-colors"
          >
            <span>Explore Portfolio</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
};
