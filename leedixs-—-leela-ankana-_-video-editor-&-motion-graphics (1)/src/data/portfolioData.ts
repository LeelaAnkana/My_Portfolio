import { Project, ServiceItem, SkillItem, ContactInfo } from '../types/portfolio';

// Initial 6 Short-Form Edits slots (9:16 vertical orientation)
export const INITIAL_SHORT_FORM_SLOTS: Project[] = Array.from({ length: 6 }, (_, i) => ({
  id: `short-form-${i + 1}`,
  title: `Short-Form Reel 0${i + 1}`,
  category: 'Short-Form Edits',
  description: 'Vertical social edit optimized for high-retention engagement and pacing.',
  thumbnail: '',
  videoUrl: '',
  aspectRatio: '9:16',
  slotIndex: i + 1,
  isUploaded: false,
}));

// Initial 5 After Effects & Motion Graphics slots (16:9 widescreen orientation)
export const INITIAL_MOTION_GRAPHICS_SLOTS: Project[] = Array.from({ length: 5 }, (_, i) => ({
  id: `ae-motion-${i + 1}`,
  title: `Motion Piece 0${i + 1}`,
  category: 'After Effects & Motion Graphics',
  description: 'Kinetic typography, motion graphics, and visual design sequencing.',
  thumbnail: '',
  videoUrl: '',
  aspectRatio: '16:9',
  slotIndex: i + 1,
  isUploaded: false,
}));

export const ALL_INITIAL_PROJECTS: Project[] = [
  ...INITIAL_SHORT_FORM_SLOTS,
  ...INITIAL_MOTION_GRAPHICS_SLOTS,
];

export const SKILLS_LIST: SkillItem[] = [
  {
    name: 'Adobe Premiere Pro',
    category: 'Core NLE Editing',
    description: 'Multi-cam editing, precision ripple trim, dynamic timeline rhythm, proxy workflow & high-speed timeline assembly.',
    level: 'Advanced',
  },
  {
    name: 'Adobe After Effects',
    category: 'Motion Design & VFX',
    description: 'Kinetic typography, speed graph curve manipulation, tracking, rotoscoping, and subtle motion accents.',
    level: 'Advanced',
  },
  {
    name: 'Motion Graphics',
    category: 'Visual Design',
    description: 'Bespoke intro/outro sequences, animated lower thirds, infographics, and brand asset choreography.',
    level: 'Specialist',
  },
  {
    name: 'Color Grading',
    category: 'Finishing & Atmosphere',
    description: 'Moody film emulation, skin tone isolation, cinematic contrast curves, and cohesive atmospheric look development.',
    level: 'Proficient',
  },
  {
    name: 'Sound Design',
    category: 'Audio Architecture',
    description: 'Multi-layered foley, whooshes, riser impacts, vocal sweetening, and transient-aligned sound sculpting.',
    level: 'Specialist',
  },
  {
    name: 'Visual Storytelling',
    category: 'Direction & Narrative',
    description: 'Transforming raw footage into gripping narrative arcs that retain viewer retention from second zero.',
    level: 'Director Mindset',
  },
];

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'reels-shorts',
    title: 'Reels & Shorts Editing',
    description: 'High-retention vertical edits engineered for Instagram Reels, TikTok, and YouTube Shorts. Crafted with punchy hooks, custom animated captions, sound effects, and seamless micro-cuts.',
    deliverables: ['9:16 Vertical Master', 'Captions & Typography', 'SFX & Sound Layering', 'Thumbnail Grab Frames'],
    turnaroundTime: '24–48 Hours',
    iconName: 'Smartphone',
  },
  {
    id: 'podcast-editing',
    title: 'Podcast Editing',
    description: 'Full-length multi-camera podcast mastering alongside dynamic short-form social highlight reels. Audio cleaned, vocal clarity maximized, and conversation rhythm tightened.',
    deliverables: ['Multi-Cam Cut (16:9)', 'Clean Audio Master', 'Viral Clip Repurposing (3-5 clips)', 'Intro/Outro Graphic Integration'],
    turnaroundTime: '48–72 Hours',
    iconName: 'Mic',
  },
  {
    id: 'promotional-videos',
    title: 'Promotional Videos',
    description: 'Cinematic brand promos, commercial product teasers, and agency trailers. Color-graded, emotionally scored, and crafted to communicate quality and exclusivity.',
    deliverables: ['4K / 1080p Master File', 'Custom Color Grading Pass', 'Licensed Music Sync', 'Multiple Aspect Ratio Exports'],
    turnaroundTime: '3–5 Days',
    iconName: 'Film',
  },
  {
    id: 'motion-graphics',
    title: 'Motion Graphics',
    description: 'Animated title sequences, kinetic typography, sleek lower thirds, and UI mockups in motion. Designed to give your brand content an unmistakably premium finish.',
    deliverables: ['Transparent Alpha Graphics', 'MOGRT / Premiere Templates', 'Logo Ident Animation', 'Custom Screen Transitions'],
    turnaroundTime: '2–4 Days',
    iconName: 'Sparkles',
  },
  {
    id: 'social-media-content',
    title: 'Social Media Content',
    description: 'End-to-end video packages for digital brands, content creators, and businesses looking for regular, consistent, high-aesthetic video deliverables.',
    deliverables: ['Monthly Batch Delivery', 'Format Optimization (IG, X, YT, TikTok)', 'Content Calendar Alignment', 'Revision Support'],
    turnaroundTime: 'Weekly / Retainer',
    iconName: 'Share2',
  },
];

export const DEFAULT_CONTACT_INFO: ContactInfo = {
  instagram: 'https://instagram.com/leeladiaries',
  linkedin: 'https://linkedin.com/in/leela-ankana',
  email: 'leelaankana789@gmail.com',
};
