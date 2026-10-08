import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import { ResumeBuilder } from './components/Builder/ResumeBuilder';
import { CoverLetterGenerator } from './components/Tools/CoverLetterGenerator';
import { PortfolioGenerator } from './components/Tools/PortfolioGenerator';
import { AuthModal } from './components/AuthModal';
import { SocialImportModal } from './components/Tools/SocialImportModal';
import { AIChatbot } from './components/Tools/AIChatbot';
import { WelcomeBackBanner } from './components/WelcomeBackBanner';
import { ResumeData, UserProfile, TemplateId } from './types/resume';
import { RESUME_TEMPLATES } from './data/templates';
import { subscribeToAuthChanges, logoutFirebase } from './lib/firebase';
import {
  loadResumesFromCloud,
  saveResumeToCloud,
  saveResumesToCloud,
  deleteResumeFromCloud,
  saveLastActiveResumeId,
  loadLastActiveResumeId
} from './lib/firestore';

// ─── INTERN / FRESHER RESUME ────────────────────────────────────────────────
// Truly blank-slate intern resume.
// No fake work experience — freshers don't have jobs.
// Section order: Education FIRST, then Projects (most important for interns),
// then Skills, then Experience (add only if applicable), then extras.
// ─────────────────────────────────────────────────────────────────────────────
const DEFAULT_INTERN_RESUME: ResumeData = {
  id: 'resume_intern_1',
  title: 'My Intern / Fresher Resume',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  templateId: 'student',

  personalInfo: {
    fullName: 'Your Full Name',
    jobTitle: 'Computer Science Student | Seeking Internship 2025',
    email: 'yourname@university.edu',
    phone: '+91 98765 43210',
    location: 'City, State',
    linkedin: 'linkedin.com/in/yourname',
    github: 'github.com/yourname',
    website: ''
  },

  // Career Objective — keep it short (2-3 lines). Describe:
  // WHO you are → WHAT you know → WHAT role you want
  summary:
    'Final year B.Tech Computer Science student at [Your College Name] with a strong foundation in Python, JavaScript, and Data Structures. Passionate about building real-world applications and eager to contribute as a Software Development Intern. Looking for opportunities to apply academic knowledge to solve practical engineering problems.',

  // ── EDUCATION: This is your STRONGEST section as a fresher ──────────────
  education: [
    {
      id: 'edu_intern_1',
      institution: 'Your College / University Name',
      degree: 'Bachelor of Technology (B.Tech)',
      fieldOfStudy: 'Computer Science & Engineering',
      location: 'City, State',
      startDate: '2022-08',
      endDate: '2026-05',
      gpa: '8.5 / 10.0',
      bullets: [
        'Relevant Coursework: Data Structures & Algorithms, DBMS, Operating Systems, Computer Networks, Web Technologies',
        'Active member of the College Coding Club and participated in inter-college hackathons'
      ]
    }
  ],

  // ── PROJECTS: The MOST important section for interns ────────────────────
  // Add every project you built — college assignments, personal builds,
  // open-source contributions, hackathon projects. All count!
  projects: [
    {
      id: 'proj_intern_1',
      title: 'Online Expense Tracker Web App',
      description: 'Full-stack web application to track daily expenses, set budgets, and visualize spending with charts.',
      techStack: ['React.js', 'Node.js', 'Express', 'MongoDB', 'Chart.js'],
      link: 'github.com/yourname/expense-tracker',
      githubUrl: 'github.com/yourname/expense-tracker',
      bullets: [
        'Built RESTful APIs with Node.js and Express for CRUD operations on expense records.',
        'Integrated Chart.js to display monthly spending trends and category-wise breakdowns.',
        'Deployed the application on Render with MongoDB Atlas as the cloud database.'
      ]
    },
    {
      id: 'proj_intern_2',
      title: 'Student Result Management System',
      description: 'College mini-project: a Python + MySQL application to manage and display student marks and grade reports.',
      techStack: ['Python', 'MySQL', 'Tkinter'],
      bullets: [
        'Designed normalized database schema with student, subject, and marks tables.',
        'Built GUI using Tkinter for admin to add, update, and generate PDF mark-sheets.'
      ]
    }
  ],

  // ── SKILLS: List every technology you learned in class or practised ──────
  skills: [
    { id: 'sk_i1', name: 'Python', category: 'Technical' },
    { id: 'sk_i2', name: 'Java', category: 'Technical' },
    { id: 'sk_i3', name: 'JavaScript & HTML/CSS', category: 'Technical' },
    { id: 'sk_i4', name: 'React.js', category: 'Technical' },
    { id: 'sk_i5', name: 'SQL & MySQL', category: 'Technical' },
    { id: 'sk_i6', name: 'Git & GitHub', category: 'Tools' },
    { id: 'sk_i7', name: 'VS Code & Linux', category: 'Tools' },
    { id: 'sk_i8', name: 'Problem Solving', category: 'Soft' },
    { id: 'sk_i9', name: 'Teamwork & Communication', category: 'Soft' }
  ],

  // ── EXPERIENCE: Leave empty if you have none — that is totally normal ────
  // Add ONLY if you have: internships, part-time jobs, freelance, college lab
  // assistant, teaching assistant, workshop trainer, etc.
  experiences: [],

  certifications: [
    {
      id: 'cert_i1',
      name: 'Introduction to Python Programming',
      issuer: 'Coursera / NPTEL / Udemy',
      issueDate: '2024-06'
    }
  ],

  achievements: [
    {
      id: 'ach_i1',
      title: 'Finalist — Smart India Hackathon 2024',
      organization: 'Government of India (SIH)',
      date: '2024-08',
      description: 'Built an AI-powered crop disease detection app in 36 hours, selected among top 50 teams nationally.'
    }
  ],

  languages: [
    { id: 'lang_i1', language: 'English', proficiency: 'Fluent' },
    { id: 'lang_i2', language: 'Hindi', proficiency: 'Native' }
  ],

  interests: [
    { id: 'int_i1', name: 'Competitive Programming (LeetCode / Codeforces)' },
    { id: 'int_i2', name: 'Open Source Contributions' },
    { id: 'int_i3', name: 'Hackathons & Tech Fests' }
  ],

  references: [],

  customization: {
    themeColor: '#8b5cf6',
    fontFamily: 'sans',
    fontSize: 'medium',
    lineSpacing: 'normal',
    margins: 'normal',
    headerStyle: 'modern',
    showIcons: true,
    // For freshers: Education & Projects come FIRST
    sectionOrder: ['education', 'summary', 'projects', 'skills', 'experiences', 'certifications', 'achievements', 'languages', 'interests']
  }
};

// Blank template used when user creates a NEW resume using the Student template
const BLANK_INTERN_RESUME_BASE: Omit<ResumeData, 'id' | 'createdAt' | 'updatedAt'> = {
  title: 'My Intern / Fresher Resume',
  templateId: 'student',
  personalInfo: {
    fullName: '',
    jobTitle: 'Computer Science Student | Seeking Internship',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
    website: ''
  },
  summary: 'Final year B.Tech Computer Science student at [Your College Name] with a strong foundation in [Your skills]. Passionate about building real-world applications and eager to contribute as a [Role] Intern.',
  education: [
    {
      id: 'edu_new_1',
      institution: '',
      degree: 'Bachelor of Technology (B.Tech)',
      fieldOfStudy: 'Computer Science & Engineering',
      location: '',
      startDate: '',
      endDate: '',
      gpa: '',
      bullets: ['Relevant Coursework: Data Structures, DBMS, OS, Computer Networks, Web Technologies']
    }
  ],
  experiences: [],
  projects: [],
  skills: [
    { id: 'sk_new1', name: 'Python', category: 'Technical' },
    { id: 'sk_new2', name: 'JavaScript & HTML/CSS', category: 'Technical' },
    { id: 'sk_new3', name: 'Git & GitHub', category: 'Tools' }
  ],
  certifications: [],
  achievements: [],
  languages: [{ id: 'lang_new1', language: 'English', proficiency: 'Fluent' }],
  interests: [{ id: 'int_new1', name: 'Competitive Programming' }],
  references: [],
  customization: {
    themeColor: '#8b5cf6',
    fontFamily: 'sans',
    fontSize: 'medium',
    lineSpacing: 'normal',
    margins: 'normal',
    headerStyle: 'modern',
    showIcons: true,
    sectionOrder: ['education', 'summary', 'projects', 'skills', 'experiences', 'certifications', 'achievements', 'languages', 'interests']
  }
};

const DEFAULT_RESUME: ResumeData = {
  id: 'resume_default_1',
  title: 'Senior Software Engineer Resume',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  templateId: 'modern',
  personalInfo: {
    fullName: 'Alex Vance',
    jobTitle: 'Senior Full Stack Engineer',
    email: 'alex.vance@tech.io',
    phone: '+1 (555) 019-2834',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/alexvance',
    github: 'github.com/alexvance',
    website: 'alexvance.dev'
  },
  summary: 'Innovative Senior Software Engineer with 5+ years of experience architecting resilient cloud microservices, optimizing CI/CD pipelines, and driving React/Node.js frontend performance. Reduced application latency by 35% across high-traffic platforms.',
  experiences: [
    {
      id: 'exp_1',
      company: 'Apex Tech Solutions',
      role: 'Senior Full Stack Engineer',
      location: 'San Francisco, CA',
      startDate: '2022-03',
      endDate: '',
      isCurrent: true,
      bullets: [
        'Architected high-scale React/TypeScript frontend microservices handling 2M+ daily active requests with 99.9% uptime.',
        'Migrated legacy monolithic endpoints to AWS Lambda serverless architecture, reducing cloud infrastructure costs by 28%.',
        'Mentored 6 junior engineers through code reviews, technical workshops, and weekly pair programming sessions.'
      ]
    },
    {
      id: 'exp_2',
      company: 'Vanguard Software Inc',
      role: 'Software Engineer',
      location: 'San Jose, CA',
      startDate: '2019-06',
      endDate: '2022-02',
      isCurrent: false,
      bullets: [
        'Developed real-time WebSocket analytics dashboard using React, Tailwind CSS, and Chart.js for enterprise financial clients.',
        'Implemented Redis caching layer for GraphQL API, decreasing median response times from 450ms to 85ms.'
      ]
    }
  ],
  education: [
    {
      id: 'edu_1',
      institution: 'University of California, Berkeley',
      degree: 'Bachelor of Science',
      fieldOfStudy: 'Computer Science & Data Science',
      location: 'Berkeley, CA',
      startDate: '2015-08',
      endDate: '2019-05',
      gpa: '3.88 / 4.00'
    }
  ],
  projects: [
    {
      id: 'proj_1',
      title: 'DevPulse — Realtime Developer Analytics',
      description: 'Open-source productivity platform tracking GitHub commits, PR reviews, and CI deployment status.',
      techStack: ['React', 'Node.js', 'PostgreSQL', 'TailwindCSS'],
      bullets: [
        'Reached 1,500+ GitHub stars within 3 months of launch.',
        'Built automated Webhook ingestion pipeline processing 10k events/minute.'
      ]
    }
  ],
  skills: [
    { id: 'sk_1', name: 'TypeScript / JavaScript', category: 'Technical' },
    { id: 'sk_2', name: 'React / Next.js', category: 'Technical' },
    { id: 'sk_3', name: 'Node.js / Express', category: 'Technical' },
    { id: 'sk_4', name: 'GraphQL & REST APIs', category: 'Technical' },
    { id: 'sk_5', name: 'PostgreSQL / MongoDB', category: 'Technical' },
    { id: 'sk_6', name: 'Tailwind CSS', category: 'Tools' },
    { id: 'sk_7', name: 'Docker & Kubernetes', category: 'Tools' },
    { id: 'sk_8', name: 'AWS & Cloud Architecture', category: 'Tools' }
  ],
  certifications: [
    { id: 'cert_1', name: 'AWS Certified Solutions Architect', issuer: 'Amazon Web Services', issueDate: '2023-01' }
  ],
  achievements: [
    { id: 'ach_1', title: '1st Place Winner', organization: 'SF Hackathon 2023', date: '2023-10', description: 'Built AI resume generator in 24h.' }
  ],
  languages: [
    { id: 'lang_1', language: 'English', proficiency: 'Native' },
    { id: 'lang_2', language: 'Spanish', proficiency: 'Intermediate' }
  ],
  interests: [
    { id: 'int_1', name: 'Open Source' },
    { id: 'int_2', name: 'System Architecture' },
    { id: 'int_3', name: 'Bouldering' }
  ],
  references: [],
  customization: {
    themeColor: '#6366f1',
    fontFamily: 'sans',
    fontSize: 'medium',
    lineSpacing: 'normal',
    margins: 'normal',
    headerStyle: 'modern',
    showIcons: true,
    sectionOrder: ['summary', 'experiences', 'education', 'skills', 'projects', 'certifications', 'achievements', 'languages', 'interests']
  }
};

export function App() {
  const [activeTab, setActiveTab] = useState<'landing' | 'dashboard' | 'builder' | 'cover-letter' | 'portfolio' | 'templates'>('landing');
  const [theme, setTheme] = useState<'dark' | 'light' | 'high-contrast'>('dark');
  
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('resumecraft_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [resumes, setResumes] = useState<ResumeData[]>(() => {
    const saved = localStorage.getItem('resumecraft_resumes');
    if (!saved) return [DEFAULT_INTERN_RESUME, DEFAULT_RESUME];
    try {
      const parsed: ResumeData[] = JSON.parse(saved);
      // Migration: replace old intern resume with new fresher-first version
      // The old version had fake experience entries; detect by id
      const migrated = parsed.map(r =>
        r.id === 'resume_intern_1' ? DEFAULT_INTERN_RESUME : r
      );
      // Ensure intern resume is always present as the first item
      const hasIntern = migrated.some(r => r.id === 'resume_intern_1');
      return hasIntern ? migrated : [DEFAULT_INTERN_RESUME, ...migrated];
    } catch {
      return [DEFAULT_INTERN_RESUME, DEFAULT_RESUME];
    }
  });

  const [activeResumeId, setActiveResumeId] = useState<string>(DEFAULT_INTERN_RESUME.id);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [isSocialImportOpen, setIsSocialImportOpen] = useState<boolean>(false);

  // ── Cloud Sync State ────────────────────────────────────────────────────────
  const [cloudSyncStatus, setCloudSyncStatus] = useState<'idle' | 'syncing' | 'synced' | 'error'>('idle');
  const [showWelcomeBanner, setShowWelcomeBanner] = useState<boolean>(false);
  const [bannerLoadingCloud, setBannerLoadingCloud] = useState<boolean>(false);
  const [lastActiveResumeId, setLastActiveResumeId] = useState<string | null>(null);

  const handleOpenAuth = (mode: 'login' | 'signup' = 'login') => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('resumecraft_resumes', JSON.stringify(resumes));
  }, [resumes]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('resumecraft_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('resumecraft_user');
    }
  }, [user]);

  // Subscribe to Firebase Auth changes + trigger cloud load
  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges(async (fbUser) => {
      if (fbUser) {
        setUser(fbUser);
        // ── Load cloud resumes on login ──────────────────────────────────────
        setBannerLoadingCloud(true);
        setShowWelcomeBanner(true);
        try {
          const [cloudResumes, lastId] = await Promise.all([
            loadResumesFromCloud(fbUser.id),
            loadLastActiveResumeId(fbUser.id)
          ]);

          if (cloudResumes && cloudResumes.length > 0) {
            // Merge: cloud takes priority; preserve local-only resumes (intern default)
            setResumes(prev => {
              const cloudIds = new Set(cloudResumes.map(r => r.id));
              const localOnly = prev.filter(r => !cloudIds.has(r.id));
              return [...cloudResumes, ...localOnly];
            });
            setLastActiveResumeId(lastId);
            // Auto-set active resume to last edited
            if (lastId) setActiveResumeId(lastId);
            else if (cloudResumes[0]) setActiveResumeId(cloudResumes[0].id);
          } else {
            // First-time login: push local resumes to cloud
            setResumes(prev => {
              saveResumesToCloud(fbUser.id, prev);
              return prev;
            });
          }

          setCloudSyncStatus('synced');
        } catch (err) {
          console.error('[Cloud] Failed to load resumes:', err);
          setCloudSyncStatus('error');
        } finally {
          setBannerLoadingCloud(false);
        }
      } else {
        // Logged out — reset cloud state
        setCloudSyncStatus('idle');
        setShowWelcomeBanner(false);
      }
    });
    return () => unsubscribe();
  }, []);

  // Apply Theme Class
  useEffect(() => {
    document.documentElement.classList.remove('dark', 'light', 'high-contrast');
    document.documentElement.classList.add(theme);
  }, [theme]);

  const activeResume = resumes.find(r => r.id === activeResumeId) || resumes[0] || DEFAULT_RESUME;

  const handleCreateNewResume = (templateId: TemplateId = 'modern') => {
    // For Student / Intern template: start with a clean intern-blank slate
    // For all other templates: use the professional default as a starting point
    const isInternTemplate = templateId === 'student';
    const baseData = isInternTemplate ? BLANK_INTERN_RESUME_BASE : {
      ...DEFAULT_RESUME,
      title: 'New Professional Resume',
    };
    const newResume: ResumeData = {
      ...baseData,
      id: 'resume_' + Date.now(),
      title: isInternTemplate ? 'My Intern / Fresher Resume' : 'New Professional Resume',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      templateId
    };
    setResumes([newResume, ...resumes]);
    setActiveResumeId(newResume.id);
    setActiveTab('builder');
  };

  const handleUpdateActiveResume = useCallback((updated: ResumeData) => {
    setResumes(prev => prev.map(r => r.id === updated.id ? updated : r));
    // Sync changed resume to cloud if logged in
    if (user) {
      setCloudSyncStatus('syncing');
      saveResumeToCloud(user.id, updated)
        .then(() => setCloudSyncStatus('synced'))
        .catch(() => setCloudSyncStatus('error'));
    }
  }, [user]);

  // Track active resume changes → persist session to cloud
  useEffect(() => {
    if (user && activeResumeId) {
      saveLastActiveResumeId(user.id, activeResumeId);
    }
  }, [user, activeResumeId]);

  const handleDuplicateResume = (id: string) => {
    const target = resumes.find(r => r.id === id);
    if (!target) return;
    const dup: ResumeData = {
      ...target,
      id: 'resume_' + Date.now(),
      title: `${target.title} (Copy)`,
      updatedAt: new Date().toISOString()
    };
    setResumes([dup, ...resumes]);
  };

  const handleDeleteResume = (id: string) => {
    if (resumes.length <= 1) {
      alert("You must keep at least one resume draft.");
      return;
    }
    const filtered = resumes.filter(r => r.id !== id);
    setResumes(filtered);
    if (activeResumeId === id) {
      setActiveResumeId(filtered[0].id);
    }
    // Also delete from cloud
    if (user) {
      deleteResumeFromCloud(user.id, id);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      
      {/* Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        theme={theme}
        setTheme={setTheme}
        user={user}
        onOpenAuth={(mode) => handleOpenAuth(mode || 'login')}
        onLogout={async () => {
          await logoutFirebase();
          setUser(null);
        }}
      />

      {/* View Router */}
      <main className="flex-1">
        {activeTab === 'landing' && (
          <LandingPage
            onStartBuilding={(tplId) => handleCreateNewResume(tplId)}
            onOpenTemplates={() => setActiveTab('templates')}
          />
        )}

        {activeTab === 'dashboard' && (
          <Dashboard
            resumes={resumes}
            onCreateNew={() => handleCreateNewResume()}
            onEditResume={(id) => { setActiveResumeId(id); setActiveTab('builder'); }}
            onDuplicateResume={handleDuplicateResume}
            onDeleteResume={handleDeleteResume}
            onOpenSocialImport={() => setIsSocialImportOpen(true)}
            onSelectTemplate={(tplId) => handleCreateNewResume(tplId)}
          />
        )}

        {activeTab === 'builder' && (
          <ResumeBuilder
            resume={activeResume}
            onSave={handleUpdateActiveResume}
            onOpenCoverLetter={() => setActiveTab('cover-letter')}
            onOpenPortfolio={() => setActiveTab('portfolio')}
            cloudSyncStatus={cloudSyncStatus}
            userId={user?.id}
          />
        )}

        {activeTab === 'templates' && (
          <div className="max-w-7xl mx-auto px-4 py-10">
            <div className="text-center mb-10">
              <h1 className="text-3xl font-extrabold font-heading text-white mb-2">15 Resume Templates</h1>
              <p className="text-slate-400 text-sm">Choose a template to start building instantly</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {RESUME_TEMPLATES.map((tpl) => (
                <div key={tpl.id} className="glass-card rounded-2xl overflow-hidden border border-slate-800 p-6 flex flex-col justify-between">
                  <div className={`h-40 rounded-xl bg-gradient-to-tr ${tpl.previewBg} p-4 flex flex-col justify-between mb-4`}>
                    <span className="px-2.5 py-1 rounded-full bg-black/40 text-white text-[10px] font-bold self-start">
                      {tpl.category}
                    </span>
                    <h3 className="text-xl font-bold text-white font-heading">{tpl.name}</h3>
                  </div>
                  <p className="text-slate-300 text-xs mb-4">{tpl.description}</p>
                  <button
                    onClick={() => handleCreateNewResume(tpl.id)}
                    className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs"
                  >
                    Use This Template
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'cover-letter' && (
          <CoverLetterGenerator
            resume={activeResume}
            onBack={() => setActiveTab('builder')}
          />
        )}

        {activeTab === 'portfolio' && (
          <PortfolioGenerator
            resume={activeResume}
            onBack={() => setActiveTab('builder')}
          />
        )}
      </main>

      {/* Global Floating AI Chatbot */}
      <AIChatbot />

      {/* Welcome Back Banner — shown after login when cloud resumes are loaded */}
      {showWelcomeBanner && user && (
        <WelcomeBackBanner
          user={user}
          resumes={resumes}
          lastActiveResumeId={lastActiveResumeId}
          isLoading={bannerLoadingCloud}
          onResumeEditing={(resumeId) => {
            setActiveResumeId(resumeId);
            setActiveTab('builder');
          }}
          onDismiss={() => setShowWelcomeBanner(false)}
        />
      )}

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        initialMode={authMode}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={(u) => setUser(u)}
      />

      {/* Social Profile Importer Modal */}
      <SocialImportModal
        isOpen={isSocialImportOpen}
        onClose={() => setIsSocialImportOpen(false)}
        onImportSuccess={(partial) => {
          const updated = {
            ...activeResume,
            ...partial,
            personalInfo: { ...activeResume.personalInfo, ...(partial.personalInfo || {}) }
          };
          handleUpdateActiveResume(updated);
          setActiveTab('builder');
        }}
      />

    </div>
  );
};
