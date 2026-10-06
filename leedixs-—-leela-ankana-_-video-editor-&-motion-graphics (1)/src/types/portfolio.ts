export type ProjectCategory = 
  | 'Short-Form Edits'
  | 'After Effects & Motion Graphics';

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  description?: string;
  thumbnail: string;
  videoUrl: string;
  duration?: string;
  aspectRatio?: '9:16' | '16:9' | '1:1';
  slotIndex?: number;
  isUploaded?: boolean;
  uploadedFileName?: string;
  fileBlobKey?: string;
  createdAt?: number;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  deliverables: string[];
  turnaroundTime: string;
  iconName: string;
}

export interface SkillItem {
  name: string;
  category: string;
  description: string;
  level: string;
}

export interface ContactInfo {
  instagram: string;
  linkedin: string;
  email: string;
}
