import React, { createContext, useContext, useState, useEffect } from 'react';
import { Project, ContactInfo } from '../types/portfolio';
import { ALL_INITIAL_PROJECTS, DEFAULT_CONTACT_INFO } from '../data/portfolioData';
import { saveMediaBlob, getMediaBlob, deleteMediaBlob, extractVideoMeta } from '../utils/storageDB';

const DEFAULT_PROFILE_PHOTO = '/src/assets/images/portrait_behind_edits_1790942849690.jpg';

interface PortfolioContextType {
  projects: Project[];
  profilePhoto: string;
  isCustomPhoto: boolean;
  contactInfo: ContactInfo;
  activePlayingProject: Project | null;
  selectedServiceForInquiry: string | null;
  isUploadingVideoId: string | null;
  uploadProfilePhoto: (file: File) => Promise<void>;
  resetProfilePhoto: () => void;
  uploadVideoToProject: (projectId: string, file: File) => Promise<void>;
  removeVideoFromProject: (projectId: string) => Promise<void>;
  updateProjectTitle: (projectId: string, title: string) => void;
  openPlayer: (project: Project) => void;
  closePlayer: () => void;
  updateContactInfo: (data: Partial<ContactInfo>) => void;
  setInquiryService: (serviceTitle: string | null) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PROJECTS: 'leedixs_projects_v3',
  CONTACT: 'leedixs_contact_v3',
  PROFILE_PHOTO: 'leedixs_profile_photo_v3',
};

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROJECTS);
      if (saved) {
        const parsed: Project[] = JSON.parse(saved);
        // Keep only Short-Form Edits and After Effects & Motion Graphics
        const valid = parsed.filter(p => p.category === 'Short-Form Edits' || p.category === 'After Effects & Motion Graphics');
        if (valid.length > 0) {
          return valid;
        }
      }
    } catch (e) {
      console.warn('Could not read saved projects', e);
    }
    return ALL_INITIAL_PROJECTS;
  });

  const [profilePhoto, setProfilePhoto] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROFILE_PHOTO);
      if (saved) return saved;
    } catch (e) {
      console.warn('Could not read saved profile photo', e);
    }
    return DEFAULT_PROFILE_PHOTO;
  });

  const [contactInfo, setContactInfo] = useState<ContactInfo>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CONTACT);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_CONTACT_INFO,
          ...parsed,
          instagram: 'https://instagram.com/leeladiaries',
        };
      }
    } catch (e) {
      console.warn('Could not read saved contact', e);
    }
    return DEFAULT_CONTACT_INFO;
  });

  const [activePlayingProject, setActivePlayingProject] = useState<Project | null>(null);
  const [selectedServiceForInquiry, setSelectedServiceForInquiry] = useState<string | null>(null);
  const [isUploadingVideoId, setIsUploadingVideoId] = useState<string | null>(null);

  // Sync projects metadata to local storage
  useEffect(() => {
    try {
      const metadataOnly = projects.map(p => ({
        ...p,
        videoUrl: p.fileBlobKey ? '' : p.videoUrl,
      }));
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(metadataOnly));
    } catch (e) {
      console.error(e);
    }
  }, [projects]);

  // Sync contact info
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CONTACT, JSON.stringify(contactInfo));
    } catch (e) {
      console.error(e);
    }
  }, [contactInfo]);

  // Rehydrate video URLs from IndexedDB on startup
  useEffect(() => {
    let isCancelled = false;

    async function rehydrateVideos() {
      const updated = await Promise.all(
        projects.map(async (project) => {
          if (project.fileBlobKey && !project.videoUrl) {
            try {
              const blob = await getMediaBlob(project.fileBlobKey);
              if (blob) {
                const objectUrl = URL.createObjectURL(blob);
                return { ...project, videoUrl: objectUrl };
              }
            } catch (err) {
              console.warn(`Failed to rehydrate blob for ${project.id}`, err);
            }
          }
          return project;
        })
      );

      if (!isCancelled) {
        setProjects(updated);
      }
    }

    rehydrateVideos();

    return () => {
      isCancelled = true;
    };
  }, []);

  const uploadProfilePhoto = async (file: File): Promise<void> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) {
          setProfilePhoto(result);
          try {
            localStorage.setItem(STORAGE_KEYS.PROFILE_PHOTO, result);
          } catch (err) {
            console.warn('LocalStorage failed for profile photo, saving to IndexedDB', err);
            saveMediaBlob('profile_photo', file);
          }
          resolve();
        } else {
          reject(new Error('Failed to read image'));
        }
      };
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });
  };

  const resetProfilePhoto = () => {
    setProfilePhoto(DEFAULT_PROFILE_PHOTO);
    try {
      localStorage.removeItem(STORAGE_KEYS.PROFILE_PHOTO);
    } catch (e) {
      console.error(e);
    }
  };

  const uploadVideoToProject = async (projectId: string, file: File): Promise<void> => {
    setIsUploadingVideoId(projectId);
    try {
      const blobKey = `video_${projectId}`;
      await saveMediaBlob(blobKey, file);

      const { thumbnail, duration } = await extractVideoMeta(file);
      const objectUrl = URL.createObjectURL(file);

      const cleanFileName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
      const formattedTitle = cleanFileName.charAt(0).toUpperCase() + cleanFileName.slice(1);

      setProjects((prev) =>
        prev.map((p) => {
          if (p.id === projectId) {
            return {
              ...p,
              title: formattedTitle || p.title,
              videoUrl: objectUrl,
              thumbnail: thumbnail || p.thumbnail,
              duration,
              isUploaded: true,
              uploadedFileName: file.name,
              fileBlobKey: blobKey,
            };
          }
          return p;
        })
      );
    } catch (err) {
      console.error('Failed to process and upload video', err);
      alert('Could not process video file. Please ensure it is a valid video format (MP4, WebM, MOV).');
    } finally {
      setIsUploadingVideoId(null);
    }
  };

  const removeVideoFromProject = async (projectId: string): Promise<void> => {
    const blobKey = `video_${projectId}`;
    await deleteMediaBlob(blobKey);

    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === projectId) {
          if (p.videoUrl.startsWith('blob:')) {
            URL.revokeObjectURL(p.videoUrl);
          }
          return {
            ...p,
            videoUrl: '',
            thumbnail: '',
            duration: undefined,
            isUploaded: false,
            uploadedFileName: undefined,
            fileBlobKey: undefined,
          };
        }
        return p;
      })
    );
  };

  const updateProjectTitle = (projectId: string, title: string) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === projectId ? { ...p, title } : p))
    );
  };

  const openPlayer = (project: Project) => {
    setActivePlayingProject(project);
  };

  const closePlayer = () => {
    setActivePlayingProject(null);
  };

  const updateContactInfo = (data: Partial<ContactInfo>) => {
    setContactInfo((prev) => ({ ...prev, ...data }));
  };

  const setInquiryService = (serviceTitle: string | null) => {
    setSelectedServiceForInquiry(serviceTitle);
  };

  return (
    <PortfolioContext.Provider
      value={{
        projects,
        profilePhoto,
        isCustomPhoto: profilePhoto !== DEFAULT_PROFILE_PHOTO,
        contactInfo,
        activePlayingProject,
        selectedServiceForInquiry,
        isUploadingVideoId,
        uploadProfilePhoto,
        resetProfilePhoto,
        uploadVideoToProject,
        removeVideoFromProject,
        updateProjectTitle,
        openPlayer,
        closePlayer,
        updateContactInfo,
        setInquiryService,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
