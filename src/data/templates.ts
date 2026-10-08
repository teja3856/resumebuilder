import { TemplateId } from '../types/resume';

export interface TemplateDefinition {
  id: TemplateId;
  name: string;
  category: string;
  description: string;
  tag: string;
  isPopular?: boolean;
  accentColor: string;
  fontFamily: string;
  previewBg: string;
}

export const RESUME_TEMPLATES: TemplateDefinition[] = [
  {
    id: 'modern',
    name: 'Modern Glass',
    category: 'Modern',
    description: 'Clean split-column layout with subtle accent headers and elegant sidebar hierarchy.',
    tag: 'Popular',
    isPopular: true,
    accentColor: '#6366f1',
    fontFamily: 'Inter',
    previewBg: 'from-indigo-600 to-purple-600'
  },
  {
    id: 'ats-professional',
    name: 'ATS Professional',
    category: 'ATS Clean',
    description: 'Single-column high-scoring ATS template guaranteed to parse cleanly across all recruiters.',
    tag: 'ATS Optimized',
    isPopular: true,
    accentColor: '#1e293b',
    fontFamily: 'Inter',
    previewBg: 'from-slate-700 to-slate-900'
  },
  {
    id: 'executive',
    name: 'Executive Leadership',
    category: 'Corporate',
    description: 'Traditional formal layout with serif typography and understated authority for senior roles.',
    tag: 'Executive',
    accentColor: '#0f172a',
    fontFamily: 'Playfair Display',
    previewBg: 'from-slate-900 to-blue-950'
  },
  {
    id: 'minimal',
    name: 'Nordic Minimal',
    category: 'Minimal',
    description: 'Maximum white space and clean typography for ultra-readable presentation.',
    tag: 'Sleek',
    accentColor: '#334155',
    fontFamily: 'Inter',
    previewBg: 'from-zinc-700 to-zinc-900'
  },
  {
    id: 'elegant',
    name: 'Emerald Elegant',
    category: 'Creative',
    description: 'Sophisticated dark emerald headers with gold/slate dividing lines.',
    tag: 'Design',
    accentColor: '#059669',
    fontFamily: 'Outfit',
    previewBg: 'from-emerald-600 to-teal-800'
  },
  {
    id: 'creative',
    name: 'Vibrant Creative',
    category: 'Creative',
    description: 'Dual-tone header with colorful badge accents for agency and media roles.',
    tag: 'Creative',
    accentColor: '#ec4899',
    fontFamily: 'Outfit',
    previewBg: 'from-pink-500 to-rose-600'
  },
  {
    id: 'developer',
    name: 'Code Developer',
    category: 'Technical',
    description: 'Monospace accent badges, GitHub links priority, and technical skills focus.',
    tag: 'Tech',
    isPopular: true,
    accentColor: '#3b82f6',
    fontFamily: 'Fira Code',
    previewBg: 'from-blue-600 to-cyan-700'
  },
  {
    id: 'student',
    name: 'Campus Student / Intern',
    category: 'Academic & Intern',
    description: 'Prioritizes education, academic projects, coursework, and extracurricular honors.',
    tag: 'Entry Level / Intern',
    isPopular: true,
    accentColor: '#8b5cf6',
    fontFamily: 'Inter',
    previewBg: 'from-purple-600 to-indigo-700'
  },
  {
    id: 'corporate',
    name: 'Fortune Corporate',
    category: 'Corporate',
    description: 'Structured corporate blue theme with clear horizontal divider bands.',
    tag: 'Standard',
    accentColor: '#2563eb',
    fontFamily: 'Roboto',
    previewBg: 'from-blue-700 to-indigo-900'
  },
  {
    id: 'designer',
    name: 'Studio Designer',
    category: 'Design',
    description: 'Visual grid layout emphasizing portfolio links, project thumbnails, and core tools.',
    tag: 'UX / UI',
    accentColor: '#f43f5e',
    fontFamily: 'Outfit',
    previewBg: 'from-rose-500 to-orange-500'
  },
  {
    id: 'business',
    name: 'Business Analyst',
    category: 'Analytics',
    description: 'Compact metric-focused layout emphasizing achievements and quantifiable KPIs.',
    tag: 'Data',
    accentColor: '#0284c7',
    fontFamily: 'Inter',
    previewBg: 'from-sky-600 to-blue-800'
  },
  {
    id: 'startup',
    name: 'Startup Founder',
    category: 'Modern',
    description: 'Dynamic gradient header pills with modern tech badges and project highlights.',
    tag: 'Startup',
    accentColor: '#10b981',
    fontFamily: 'Outfit',
    previewBg: 'from-emerald-500 to-teal-700'
  },
  {
    id: 'classic',
    name: 'Classic Serif',
    category: 'Academic',
    description: 'Timeless traditional format trusted by legal, medical, and academia professionals.',
    tag: 'Classic',
    accentColor: '#374151',
    fontFamily: 'Playfair Display',
    previewBg: 'from-gray-700 to-gray-900'
  },
  {
    id: 'dark',
    name: 'Cyber Dark',
    category: 'Creative',
    description: 'High contrast dark theme output designed for modern digital screen presentations.',
    tag: 'Dark Theme',
    accentColor: '#a855f7',
    fontFamily: 'Inter',
    previewBg: 'from-violet-800 to-purple-950'
  },
  {
    id: 'premium',
    name: 'Monarch Premium',
    category: 'Executive',
    description: 'Gold-accented luxury layout with refined section borders and subtle initial badge.',
    tag: 'Premium',
    isPopular: true,
    accentColor: '#d97706',
    fontFamily: 'Playfair Display',
    previewBg: 'from-amber-600 to-yellow-800'
  }
];
