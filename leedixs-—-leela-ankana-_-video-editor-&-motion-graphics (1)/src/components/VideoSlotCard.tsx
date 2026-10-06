import React, { useRef, useState } from 'react';
import { Play, Upload, Trash2, Edit2, Film, Check, Loader2, Sparkles } from 'lucide-react';
import { Project } from '../types/portfolio';
import { usePortfolio } from '../context/PortfolioContext';

interface VideoSlotCardProps {
  project: Project;
  aspectRatioClass?: string;
  isVertical?: boolean;
}

export const VideoSlotCard: React.FC<VideoSlotCardProps> = ({
  project,
  aspectRatioClass = 'aspect-video',
  isVertical = false,
}) => {
  const { uploadVideoToProject, removeVideoFromProject, updateProjectTitle, openPlayer, isUploadingVideoId } = usePortfolio();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [titleInput, setTitleInput] = useState(project.title);
  const [isDragOver, setIsDragOver] = useState(false);

  const isUploadingThis = isUploadingVideoId === project.id;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await uploadVideoToProject(project.id, file);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('video/')) {
      await uploadVideoToProject(project.id, file);
    }
  };

  const handleSaveTitle = (e: React.FormEvent) => {
    e.preventDefault();
    if (titleInput.trim()) {
      updateProjectTitle(project.id, titleInput.trim());
    }
    setIsEditingTitle(false);
  };

  return (
    <div
      className={`group relative flex flex-col rounded-2xl bg-zinc-900/40 border transition-all duration-300 overflow-hidden ${
        isDragOver
          ? 'border-[#c4b5fd] ring-2 ring-[#c4b5fd]/30 scale-[1.01]'
          : 'border-zinc-800/80 hover:border-zinc-700 hover:-translate-y-1'
      }`}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragOver(true);
      }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={handleDrop}
    >
      {/* Hidden File Picker Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="video/mp4,video/webm,video/quicktime,video/x-m4v,video/*"
        onChange={handleFileChange}
        className="hidden"
        aria-label={`Upload video for ${project.title}`}
      />

      {/* Video Media Area */}
      <div
        className={`relative w-full ${aspectRatioClass} bg-zinc-950 overflow-hidden flex items-center justify-center`}
      >
        {isUploadingThis ? (
          <div className="flex flex-col items-center justify-center p-6 text-center">
            <Loader2 className="w-8 h-8 text-[#c4b5fd] animate-spin mb-3" />
            <p className="text-xs text-white font-medium">Processing Video...</p>
            <p className="text-[11px] text-zinc-500 mt-1">Generating frame thumbnail</p>
          </div>
        ) : project.isUploaded && project.videoUrl ? (
          // Uploaded State with auto-generated thumbnail & play button
          <div
            onClick={() => openPlayer(project)}
            className="relative w-full h-full cursor-pointer group/media"
          >
            {project.thumbnail ? (
              <img
                src={project.thumbnail}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover/media:scale-105"
              />
            ) : (
              <div className="w-full h-full bg-zinc-900 flex items-center justify-center">
                <Film className="w-10 h-10 text-zinc-700" />
              </div>
            )}

            {/* Dark Vignette Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-75 group-hover/media:opacity-50 transition-opacity" />

            {/* Center Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-[#c4b5fd]/90 group-hover/media:bg-[#c4b5fd] text-zinc-950 flex items-center justify-center transform scale-90 group-hover/media:scale-100 transition-all duration-300 shadow-[0_0_25px_rgba(196,181,253,0.4)] pl-0.5">
                <Play className="w-6 h-6 fill-current text-zinc-950" />
              </div>
            </div>

            {/* Duration Tag */}
            {project.duration && (
              <span className="absolute bottom-3 right-3 text-[11px] font-mono font-medium text-zinc-200 bg-black/80 backdrop-blur-md px-2 py-0.5 rounded border border-white/10">
                {project.duration}
              </span>
            )}

            {/* Ready Badge */}
            <span className="absolute top-3 left-3 text-[10px] font-mono text-emerald-400 bg-black/75 backdrop-blur-md px-2 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
              <Check className="w-2.5 h-2.5" />
              Ready
            </span>
          </div>
        ) : (
          // Empty Slot State - Clean & inviting upload dropzone
          <div
            onClick={() => fileInputRef.current?.click()}
            className="w-full h-full flex flex-col items-center justify-center p-6 text-center cursor-pointer hover:bg-zinc-900/60 transition-colors"
          >
            <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 group-hover:border-[#c4b5fd]/50 flex items-center justify-center text-zinc-400 group-hover:text-[#c4b5fd] transition-all mb-3 shadow-inner">
              <Upload className="w-5 h-5" />
            </div>

            <span className="text-xs font-semibold text-white group-hover:text-[#c4b5fd] transition-colors">
              Upload Video
            </span>
            <span className="text-[11px] text-zinc-400 mt-1 max-w-[160px] line-clamp-1">
              Select from laptop
            </span>
            <span className="text-[10px] font-mono text-zinc-400 mt-2 px-2 py-0.5 rounded bg-zinc-900/80 border border-zinc-800">
              MP4 · WebM · MOV
            </span>
          </div>
        )}
      </div>

      {/* Card Info & Meta Footer */}
      <div className="p-4 flex-1 flex flex-col justify-between bg-zinc-950/60">
        <div>
          {/* Slot indicator / Category */}
          <div className="flex items-center justify-between text-[11px] text-[#c4b5fd] mb-1 font-medium">
            <span>Slot {project.slotIndex ? `0${project.slotIndex}` : ''}</span>
            {isVertical && <span className="text-zinc-500 font-mono">9:16</span>}
          </div>

          {/* Title Editor / Display */}
          {isEditingTitle ? (
            <form onSubmit={handleSaveTitle} className="flex items-center gap-1.5 my-1">
              <input
                type="text"
                value={titleInput}
                autoFocus
                onChange={(e) => setTitleInput(e.target.value)}
                onBlur={handleSaveTitle}
                className="w-full px-2 py-1 text-xs bg-zinc-900 border border-[#c4b5fd] rounded text-white focus:outline-none"
              />
              <button
                type="submit"
                className="p-1 rounded bg-[#c4b5fd] text-zinc-950 text-xs"
              >
                <Check className="w-3 h-3" />
              </button>
            </form>
          ) : (
            <div className="flex items-center justify-between group/title">
              <h4
                onClick={() => {
                  if (project.isUploaded) openPlayer(project);
                }}
                className={`text-sm font-bold font-display text-white line-clamp-1 ${
                  project.isUploaded ? 'cursor-pointer hover:text-[#c4b5fd]' : ''
                }`}
              >
                {project.title}
              </h4>
              <button
                onClick={() => setIsEditingTitle(true)}
                className="opacity-0 group-hover/title:opacity-100 text-zinc-500 hover:text-white p-1 transition-opacity"
                title="Edit title"
              >
                <Edit2 className="w-3 h-3" />
              </button>
            </div>
          )}

          {project.uploadedFileName && (
            <p className="text-[11px] text-zinc-500 truncate mt-0.5">
              {project.uploadedFileName}
            </p>
          )}
        </div>

        {/* Bottom Actions */}
        <div className="mt-3 pt-3 border-t border-zinc-850 flex items-center justify-between text-xs">
          {project.isUploaded ? (
            <>
              <button
                onClick={() => openPlayer(project)}
                className="inline-flex items-center gap-1.5 font-medium text-zinc-200 hover:text-[#c4b5fd] transition-colors"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Play Video</span>
              </button>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-2 py-1 text-[11px] text-zinc-400 hover:text-white bg-zinc-900 hover:bg-zinc-800 rounded transition-colors"
                  title="Replace with new video from laptop"
                >
                  Replace
                </button>
                <button
                  onClick={() => removeVideoFromProject(project.id)}
                  className="p-1 text-zinc-500 hover:text-red-400 transition-colors"
                  title="Remove video"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </>
          ) : (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full inline-flex items-center justify-center gap-1.5 py-1.5 text-[11px] font-semibold text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg transition-colors"
            >
              <Upload className="w-3 h-3 text-[#c4b5fd]" />
              <span>Select from laptop</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
