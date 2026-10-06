import React, { useRef, useState, useEffect } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize, Upload, Film } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const VideoPlayerModal: React.FC = () => {
  const { activePlayingProject, closePlayer, uploadVideoToProject } = usePortfolio();
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // Close on Escape, Space to play/pause
  useEffect(() => {
    if (!activePlayingProject) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closePlayer();
      } else if (e.key === ' ' && e.target === document.body) {
        e.preventDefault();
        togglePlay();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePlayingProject]);

  if (!activePlayingProject || !activePlayingProject.videoUrl) return null;

  const isVertical = activePlayingProject.aspectRatio === '9:16';

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch((e) => {
        console.warn('Playback error', e);
        setIsPlaying(false);
      });
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
    if (videoRef.current.duration) {
      setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100);
    }
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
    videoRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const seekTime = (parseFloat(e.target.value) / 100) * duration;
    videoRef.current.currentTime = seekTime;
    setProgress(parseFloat(e.target.value));
  };

  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      videoRef.current.requestFullscreen();
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return '0:00';
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && activePlayingProject) {
      await uploadVideoToProject(activePlayingProject.id, file);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 md:p-8 animate-in fade-in duration-200">
      {/* Hidden file input for quick replace in modal */}
      <input
        ref={fileInputRef}
        type="file"
        accept="video/mp4,video/webm,video/quicktime,video/x-m4v,video/*"
        onChange={handleFileChange}
        className="hidden"
      />

      <div className={`relative w-full ${isVertical ? 'max-w-xl' : 'max-w-5xl'} bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]`}>
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800/80 bg-zinc-900/50">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#c4b5fd] animate-pulse" />
            <span className="text-xs uppercase font-mono tracking-wider text-[#c4b5fd]">
              {activePlayingProject.category}
            </span>
            <span className="text-zinc-600">·</span>
            <h3 className="text-sm md:text-base font-bold text-white font-display line-clamp-1">
              {activePlayingProject.title}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs text-zinc-300 hover:text-white transition-colors"
              title="Replace this video from laptop"
            >
              <Upload className="w-3.5 h-3.5 text-[#c4b5fd]" />
              <span className="hidden sm:inline">Replace Video</span>
            </button>

            <button
              onClick={closePlayer}
              className="p-2 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video Player Display Container */}
        <div className={`relative bg-black flex-1 flex items-center justify-center overflow-hidden ${
          isVertical ? 'min-h-[460px] max-h-[70vh]' : 'min-h-[320px] md:min-h-[460px] max-h-[65vh]'
        }`}>
          <div className="relative w-full h-full flex items-center justify-center group">
            <video
              ref={videoRef}
              src={activePlayingProject.videoUrl}
              poster={activePlayingProject.thumbnail}
              autoPlay
              playsInline
              muted={isMuted}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onClick={togglePlay}
              className={`w-full h-full object-contain cursor-pointer ${
                isVertical ? 'max-h-[68vh]' : 'max-h-[62vh]'
              }`}
            />

            {/* Center Play indicator overlay when paused */}
            {!isPlaying && (
              <div
                onClick={togglePlay}
                className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] cursor-pointer"
              >
                <div className="w-20 h-20 rounded-full bg-[#c4b5fd] text-zinc-950 flex items-center justify-center pl-1 shadow-[0_0_35px_rgba(196,181,253,0.6)]">
                  <Play className="w-8 h-8 fill-current text-zinc-950" />
                </div>
              </div>
            )}

            {/* Custom Scrub / Controls Bar */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/85 to-transparent">
              {/* Timeline Scrubber */}
              <input
                type="range"
                min="0"
                max="100"
                value={progress || 0}
                onChange={handleSeek}
                className="w-full h-1 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-[#c4b5fd] mb-3"
              />

              <div className="flex items-center justify-between text-xs text-white">
                <div className="flex items-center gap-3">
                  <button
                    onClick={togglePlay}
                    className="p-1.5 hover:text-[#c4b5fd] transition-colors"
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                  </button>

                  <button
                    onClick={toggleMute}
                    className="p-1.5 hover:text-[#c4b5fd] transition-colors"
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 text-zinc-400" /> : <Volume2 className="w-4 h-4 text-[#c4b5fd]" />}
                  </button>

                  <span className="font-mono text-zinc-400">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {isVertical && (
                    <span className="font-mono text-[10px] text-zinc-400 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded">
                      9:16 Vertical
                    </span>
                  )}
                  <button
                    onClick={toggleFullscreen}
                    className="p-1.5 hover:text-[#c4b5fd] transition-colors"
                    title="Fullscreen"
                  >
                    <Maximize className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Project Info & Metadata Footer */}
        <div className="p-5 bg-zinc-950 border-t border-zinc-850 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h4 className="text-base font-bold text-white font-display">
              {activePlayingProject.title}
            </h4>
            <p className="text-xs text-zinc-400 mt-0.5">
              {activePlayingProject.description || 'Uploaded from local device'}
            </p>
          </div>

          {activePlayingProject.uploadedFileName && (
            <span className="text-[11px] font-mono text-zinc-400 bg-zinc-900 border border-zinc-800 px-2.5 py-1 rounded truncate max-w-xs">
              File: {activePlayingProject.uploadedFileName}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
