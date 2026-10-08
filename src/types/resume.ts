export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
  github?: string;
  photoUrl?: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  type?: 'job' | 'internship' | 'academic' | 'personal' | 'volunteer' | 'freelance' | 'hackathon';
  bullets: string[];
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  honors?: string;
  bullets?: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  link?: string;
  githubUrl?: string;
  startDate?: string;
  endDate?: string;
  bullets: string[];
}

export interface SkillItem {
  id: string;
  name: string;
  level?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  category: 'Technical' | 'Soft' | 'Tools' | 'Domain';
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialUrl?: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  organization: string;
  date: string;
  description: string;
}

export interface LanguageItem {
  id: string;
  language: string;
  proficiency: 'Native' | 'Fluent' | 'Advanced' | 'Intermediate' | 'Basic';
}

export interface InterestItem {
  id: string;
  name: string;
}

export interface ReferenceItem {
  id: string;
  name: string;
  position: string;
  company: string;
  email: string;
  phone: string;
}

export interface CustomizationOptions {
  themeColor: string; // hex or tailwind color
  fontFamily: 'sans' | 'heading' | 'serif' | 'mono';
  fontSize: 'small' | 'medium' | 'large';
  lineSpacing: 'tight' | 'normal' | 'relaxed';
  margins: 'compact' | 'normal' | 'spacious';
  headerStyle: 'classic' | 'modern' | 'minimal' | 'sidebar' | 'banner';
  showIcons: boolean;
  sectionOrder: string[];
}

export type TemplateId = 
  | 'modern'
  | 'ats-professional'
  | 'executive'
  | 'minimal'
  | 'elegant'
  | 'creative'
  | 'developer'
  | 'student'
  | 'corporate'
  | 'designer'
  | 'business'
  | 'startup'
  | 'classic'
  | 'dark'
  | 'premium';

export interface ResumeData {
  id: string;
  title: string;
  updatedAt: string;
  createdAt: string;
  templateId: TemplateId;
  personalInfo: PersonalInfo;
  summary: string;
  experiences: ExperienceItem[];
  education: EducationItem[];
  projects: ProjectItem[];
  skills: SkillItem[];
  certifications: CertificationItem[];
  achievements: AchievementItem[];
  languages: LanguageItem[];
  interests: InterestItem[];
  references: ReferenceItem[];
  customization: CustomizationOptions;
}

export interface ATSResult {
  score: number;
  atsCompatibilityScore: number;
  grammarScore: number;
  keywordScore: number;
  readabilityScore: number;
  formattingScore: number;
  wordCount: number;
  issues: {
    type: 'critical' | 'warning' | 'info';
    message: string;
    suggestion: string;
    section: string;
  }[];
  passedChecks: string[];
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  provider?: 'email' | 'google' | 'github';
}
