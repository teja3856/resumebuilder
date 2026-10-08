import React, { useState } from 'react';
import { Sparkles, Copy, Download, Check, Briefcase, Building, User } from 'lucide-react';
import { ResumeData } from '../../types/resume';

interface CoverLetterGeneratorProps {
  resume: ResumeData;
  onBack: () => void;
}

export const CoverLetterGenerator: React.FC<CoverLetterGeneratorProps> = ({ resume, onBack }) => {
  const [companyName, setCompanyName] = useState<string>('Google');
  const [hiringManager, setHiringManager] = useState<string>('Hiring Team');
  const [targetJobTitle, setTargetJobTitle] = useState<string>(resume.personalInfo.jobTitle || 'Software Engineer');
  const [tone, setTone] = useState<'professional' | 'enthusiastic' | 'confident'>('professional');
  const [copied, setCopied] = useState<boolean>(false);

  const generateLetterText = () => {
    const p = resume.personalInfo;
    const skillsText = resume.skills.slice(0, 5).map(s => s.name).join(', ');
    const topExp = resume.experiences[0];

    return `Dear ${hiringManager},

I am writing to express my strong interest in the ${targetJobTitle} position at ${companyName}. With a robust background in ${resume.personalInfo.jobTitle || 'technology'} and proven expertise in ${skillsText || 'software engineering'}, I am excited about the opportunity to contribute to ${companyName}'s innovative team.

In my recent role as ${topExp ? topExp.role : 'Developer'} at ${topExp ? topExp.company : 'Tech Solutions'}, I successfully ${topExp && topExp.bullets[0] ? topExp.bullets[0].toLowerCase() : 'delivered high-impact software applications.'} This experience strengthened my analytical problem-solving skills and reinforced my ability to deliver scalable, high-quality results.

What attracts me to ${companyName} is your commitment to industry leadership and cutting-edge excellence. I am confident that my technical proficiency in ${skillsText || 'core development frameworks'}, combined with my proactive approach to collaboration, makes me a valuable asset to your team.

Thank you for your time and consideration. I welcome the opportunity to discuss how my experience and passion align with ${companyName}'s goals.

Sincerely,

${p.fullName || 'Candidate Name'}
${p.email} | ${p.phone}
${p.linkedin ? p.linkedin : ''}`;
  };

  const [letterText, setLetterText] = useState<string>(generateLetterText());

  const handleRegenerate = () => {
    setLetterText(generateLetterText());
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(letterText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadTXT = () => {
    const pName = (resume.personalInfo.fullName || 'Candidate').trim();
    const blob = new Blob([letterText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${pName.replace(/\s+/g, '_')}_Cover_Letter.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-8 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-extrabold font-heading text-white flex items-center gap-3">
            AI Cover Letter Generator
            <span className="text-xs px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 font-mono border border-indigo-500/30">
              Matched to Resume
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Auto-generate a personalized cover letter matching your resume profile.
          </p>
        </div>

        <button
          onClick={onBack}
          className="px-4 py-2 rounded-xl glass-card border border-slate-700 text-slate-300 text-xs font-semibold hover:bg-slate-800"
        >
          Back to Builder
        </button>
      </div>

      {/* Input Parameters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-1">Company Name</label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="w-full px-3 py-2 rounded-xl glass-input text-xs"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-1">Target Role Title</label>
          <input
            type="text"
            value={targetJobTitle}
            onChange={(e) => setTargetJobTitle(e.target.value)}
            className="w-full px-3 py-2 rounded-xl glass-input text-xs"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-1">Hiring Manager / Team</label>
          <input
            type="text"
            value={hiringManager}
            onChange={(e) => setHiringManager(e.target.value)}
            className="w-full px-3 py-2 rounded-xl glass-input text-xs"
          />
        </div>
      </div>

      {/* Output Cover Letter Card */}
      <div className="glass-card rounded-3xl p-8 border border-slate-800 space-y-6">
        <div className="flex justify-between items-center border-b border-slate-800/80 pb-4">
          <button
            onClick={handleRegenerate}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-xs shadow-md flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" /> Regenerate Letter
          </button>

          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              className="px-4 py-2 rounded-xl glass-panel border border-slate-700 text-slate-200 hover:text-white text-xs font-semibold flex items-center gap-1.5"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied' : 'Copy Text'}
            </button>

            <button
              onClick={handleDownloadTXT}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md flex items-center gap-1.5"
            >
              <Download className="w-4 h-4" /> Download TXT
            </button>
          </div>
        </div>

        <textarea
          rows={14}
          value={letterText}
          onChange={(e) => setLetterText(e.target.value)}
          className="w-full p-4 rounded-2xl bg-slate-950 border border-slate-800 text-slate-200 text-xs leading-relaxed font-sans focus:outline-none focus:border-indigo-500"
        />
      </div>

    </div>
  );
};
