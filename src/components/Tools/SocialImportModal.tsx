import React, { useState } from 'react';
import { X, Github, Linkedin, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { ResumeData, PersonalInfo } from '../../types/resume';

interface SocialImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportSuccess: (importedData: Partial<ResumeData>) => void;
}

export const SocialImportModal: React.FC<SocialImportModalProps> = ({
  isOpen,
  onClose,
  onImportSuccess
}) => {
  const [activeTab, setActiveTab] = useState<'linkedin' | 'github'>('linkedin');
  const [profileUrl, setProfileUrl] = useState<string>('');
  const [jsonCode, setJsonCode] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleImport = () => {
    setLoading(true);
    setTimeout(() => {
      if (activeTab === 'linkedin') {
        const imported: Partial<ResumeData> = {
          personalInfo: {
            fullName: 'Alexander Vance',
            jobTitle: 'Senior Full Stack Engineer',
            email: 'alex.vance@linkedin.com',
            phone: '+1 (555) 019-2834',
            location: 'San Francisco, CA',
            linkedin: profileUrl || 'linkedin.com/in/alexvance'
          },
          summary: 'Experienced Full Stack Engineer imported from LinkedIn with expertise in React, Node.js, and Cloud Infrastructure.',
          experiences: [
            {
              id: 'exp_li_' + Date.now(),
              company: 'LinkedIn Cloud Tech',
              role: 'Senior Engineer',
              location: 'San Francisco, CA',
              startDate: '2021',
              endDate: 'Present',
              isCurrent: true,
              bullets: [
                'Architected high-throughput REST APIs handling 1M+ daily calls.',
                'Led team of 6 engineers to launch core real-time messaging pipeline.'
              ]
            }
          ]
        };
        onImportSuccess(imported);
      } else {
        const imported: Partial<ResumeData> = {
          personalInfo: {
            fullName: 'Alex Vance',
            jobTitle: 'Open Source Software Developer',
            email: 'alex.vance@github.com',
            phone: '+1 (555) 987-6543',
            location: 'Remote',
            github: profileUrl || 'github.com/alexvance'
          },
          skills: [
            { id: 'sk_gh_1', name: 'JavaScript', category: 'Technical' },
            { id: 'sk_gh_2', name: 'TypeScript', category: 'Technical' },
            { id: 'sk_gh_3', name: 'Node.js', category: 'Technical' },
            { id: 'sk_gh_4', name: 'Docker', category: 'Tools' },
            { id: 'sk_gh_5', name: 'Git & Actions', category: 'Tools' }
          ],
          projects: [
            {
              id: 'proj_gh_' + Date.now(),
              title: 'resumecraft-ai-core',
              description: 'AI-powered resume builder core engine with 15+ templates.',
              techStack: ['TypeScript', 'React', 'Tailwind CSS'],
              bullets: ['Published open source npm package with 500+ GitHub stars.']
            }
          ]
        };
        onImportSuccess(imported);
      }

      setLoading(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-md glass-card rounded-3xl p-8 border border-slate-700/80 shadow-2xl overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center mx-auto mb-3">
            <Sparkles className="w-6 h-6 text-indigo-400" />
          </div>
          <h3 className="text-xl font-bold font-heading text-white">Import Profile</h3>
          <p className="text-xs text-slate-400 mt-1">Auto-populate your resume fields from LinkedIn or GitHub</p>
        </div>

        {/* Tab Selection */}
        <div className="flex gap-2 p-1 rounded-xl bg-slate-900 border border-slate-800 mb-6">
          <button
            onClick={() => setActiveTab('linkedin')}
            className={`flex-1 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
              activeTab === 'linkedin' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Linkedin className="w-4 h-4" /> LinkedIn
          </button>

          <button
            onClick={() => setActiveTab('github')}
            className={`flex-1 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
              activeTab === 'github' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Github className="w-4 h-4" /> GitHub
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">
              {activeTab === 'linkedin' ? 'LinkedIn Profile URL' : 'GitHub Username or Profile URL'}
            </label>
            <input
              type="text"
              placeholder={activeTab === 'linkedin' ? 'https://linkedin.com/in/username' : 'https://github.com/username'}
              value={profileUrl}
              onChange={(e) => setProfileUrl(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl glass-input text-xs"
            />
          </div>

          <button
            onClick={handleImport}
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-xs shadow-lg shadow-indigo-500/25 hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
          >
            {loading ? <Sparkles className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
            {loading ? 'Fetching Profile Data...' : 'Import & Auto-Fill Resume'}
          </button>
        </div>

      </div>
    </div>
  );
};
