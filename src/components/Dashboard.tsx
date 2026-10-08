import React, { useState } from 'react';
import { 
  Plus, 
  FileText, 
  Download, 
  Copy, 
  Trash2, 
  Edit3, 
  Sparkles, 
  Share2, 
  CheckCircle2, 
  AlertCircle, 
  TrendingUp, 
  Github, 
  Linkedin, 
  Clock, 
  Search,
  Filter,
  Eye
} from 'lucide-react';
import { ResumeData, TemplateId } from '../types/resume';
import { analyzeResumeATS } from '../utils/atsAnalyzer';

interface DashboardProps {
  resumes: ResumeData[];
  onCreateNew: () => void;
  onEditResume: (id: string) => void;
  onDuplicateResume: (id: string) => void;
  onDeleteResume: (id: string) => void;
  onOpenSocialImport: () => void;
  onSelectTemplate: (templateId: TemplateId) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  resumes,
  onCreateNew,
  onEditResume,
  onDuplicateResume,
  onDeleteResume,
  onOpenSocialImport
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredResumes = resumes.filter(r => 
    r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.personalInfo.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.personalInfo.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const avgATS = resumes.length > 0 
    ? Math.round(resumes.reduce((acc, curr) => acc + analyzeResumeATS(curr).score, 0) / resumes.length)
    : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Top Banner & Stats Overview */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-extrabold font-heading text-white flex items-center gap-3">
            Dashboard
            <span className="text-xs px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-mono">
              {resumes.length} {resumes.length === 1 ? 'Resume' : 'Resumes'}
            </span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Manage your ATS-friendly resume drafts, track scores, and export multi-format files.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onOpenSocialImport}
            className="px-4 py-2.5 rounded-xl glass-card border border-slate-700 text-slate-200 text-xs font-semibold hover:border-indigo-500/50 flex items-center gap-2 transition-all"
          >
            <Linkedin className="w-4 h-4 text-blue-400" />
            <Github className="w-4 h-4 text-purple-400" />
            Import Profile
          </button>

          <button
            onClick={onCreateNew}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white text-xs font-bold shadow-lg shadow-indigo-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Create New Resume
          </button>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <div className="p-5 rounded-2xl glass-card border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Total Resumes</p>
            <h3 className="text-2xl font-black text-white font-heading">{resumes.length}</h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
            <FileText className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-2xl glass-card border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Average ATS Score</p>
            <h3 className="text-2xl font-black text-white font-heading">{avgATS}/100</h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-2xl glass-card border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Templates Used</p>
            <h3 className="text-2xl font-black text-white font-heading">
              {new Set(resumes.map(r => r.templateId)).size} / 15
            </h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-2xl glass-card border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Exports Prepared</p>
            <h3 className="text-2xl font-black text-white font-heading">{resumes.length * 3}</h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
            <Download className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Search & Action Filter Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search resumes by title, name, role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-xs"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            className="px-3 py-2 rounded-xl glass-card border border-slate-800 text-slate-300 text-xs font-medium hover:bg-slate-800 transition-colors"
          >
            {viewMode === 'grid' ? 'List View' : 'Grid View'}
          </button>
        </div>
      </div>

      {/* Resumes Grid / List */}
      {filteredResumes.length === 0 ? (
        <div className="glass-card rounded-3xl p-12 text-center border border-slate-800 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto">
            <FileText className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-white font-heading">No Resumes Found</h3>
          <p className="text-slate-400 text-xs max-w-sm mx-auto">
            {searchTerm ? 'No resumes match your search query. Try clearing filters.' : 'Get started by creating your first ATS-friendly resume!'}
          </p>
          <button
            onClick={onCreateNew}
            className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-500/20 transition-all inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Create New Resume
          </button>
        </div>
      ) : (
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
          {filteredResumes.map((resume) => {
            const ats = analyzeResumeATS(resume);

            return (
              <div
                key={resume.id}
                className="glass-card rounded-2xl p-6 border border-slate-800 hover:border-indigo-500/50 transition-all group flex flex-col justify-between"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center font-bold text-white text-sm">
                        {resume.personalInfo.fullName.charAt(0) || 'R'}
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-white font-heading group-hover:text-indigo-300 transition-colors">
                          {resume.title}
                        </h4>
                        <p className="text-xs text-slate-400">
                          {resume.personalInfo.jobTitle || 'Target Role Not Set'}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                        ats.score >= 85 
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' 
                          : ats.score >= 70 
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' 
                          : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                      }`}>
                        {ats.score}/100 ATS
                      </span>
                      {resume.templateId === 'student' && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-violet-500/20 text-violet-300 border border-violet-500/30 whitespace-nowrap">
                          🎓 Fresher Friendly
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Details Meta */}
                  <div className="space-y-2 py-3 border-y border-slate-800/80 my-4 text-xs text-slate-400">
                    <div className="flex justify-between">
                      <span>Template:</span>
                      <span className="font-semibold text-slate-200 capitalize">{resume.templateId.replace('-', ' ')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Last Updated:</span>
                      <span className="font-mono text-[11px] text-slate-300">{new Date(resume.updatedAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sections:</span>
                      <span className="text-slate-300">
                        {resume.experiences.length} Exp | {resume.skills.length} Skills | {resume.education.length} Edu
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-2">
                  <button
                    onClick={() => onEditResume(resume.id)}
                    className="flex-1 py-2 rounded-xl bg-indigo-600/20 hover:bg-indigo-600 text-indigo-200 hover:text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 border border-indigo-500/30"
                  >
                    <Edit3 className="w-3.5 h-3.5" /> Edit
                  </button>

                  <button
                    onClick={() => onDuplicateResume(resume.id)}
                    title="Duplicate Resume"
                    className="p-2 rounded-xl glass-panel border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onDeleteResume(resume.id)}
                    title="Delete Resume"
                    className="p-2 rounded-xl glass-panel border border-slate-700 text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
