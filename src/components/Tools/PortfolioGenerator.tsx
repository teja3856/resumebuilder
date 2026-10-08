import React, { useState } from 'react';
import { Globe, Download, Eye, Sparkles, ExternalLink, Code, Briefcase, Mail } from 'lucide-react';
import { ResumeData } from '../../types/resume';

interface PortfolioGeneratorProps {
  resume: ResumeData;
  onBack: () => void;
}

export const PortfolioGenerator: React.FC<PortfolioGeneratorProps> = ({ resume, onBack }) => {
  const p = resume.personalInfo;

  const generatePortfolioHTML = () => {
    return `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${p.fullName || 'Portfolio'} — ${p.jobTitle || 'Professional'}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&family=Outfit:wght@600;800&display=swap" rel="stylesheet">
</head>
<body class="bg-slate-950 text-slate-100 font-sans antialiased selection:bg-indigo-500 selection:text-white min-h-screen">
  
  <!-- Navbar -->
  <nav class="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 py-4 px-8 flex justify-between items-center">
    <span class="text-xl font-bold font-heading bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
      ${p.fullName || 'Portfolio'}
    </span>
    <div class="space-x-6 text-sm text-slate-400 font-medium">
      <a href="#about" class="hover:text-white transition">About</a>
      <a href="#experience" class="hover:text-white transition">Experience</a>
      <a href="#projects" class="hover:text-white transition">Projects</a>
      <a href="#skills" class="hover:text-white transition">Skills</a>
    </div>
  </nav>

  <!-- Hero Section -->
  <section id="about" class="pt-32 pb-20 px-8 max-w-5xl mx-auto text-center">
    <div class="w-20 h-20 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center font-bold text-3xl mx-auto mb-6 text-white shadow-2xl">
      ${(p.fullName || 'P').charAt(0)}
    </div>
    <h1 class="text-5xl sm:text-6xl font-extrabold text-white mb-4 tracking-tight font-heading">
      Hi, I'm <span class="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">${p.fullName || 'Your Name'}</span>
    </h1>
    <p class="text-xl text-indigo-400 font-semibold mb-6">${p.jobTitle || 'Professional Role'}</p>
    <p class="max-w-2xl mx-auto text-slate-300 text-base leading-relaxed mb-8">
      ${resume.summary || 'Passionate professional crafting high-quality digital experiences and scalable applications.'}
    </p>
  </section>

  <!-- Skills Section -->
  <section id="skills" class="py-16 px-8 max-w-5xl mx-auto">
    <h2 class="text-2xl font-bold text-white mb-8 border-b border-slate-800 pb-2">Skills & Technologies</h2>
    <div class="flex flex-wrap gap-3">
      ${resume.skills.map(s => `
        <span class="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-sm font-medium">
          ${s.name}
        </span>
      `).join('')}
    </div>
  </section>

  <!-- Projects Section -->
  <section id="projects" class="py-16 px-8 max-w-5xl mx-auto">
    <h2 class="text-2xl font-bold text-white mb-8 border-b border-slate-800 pb-2">Featured Projects</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      ${resume.projects.map(proj => `
        <div class="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 transition">
          <h3 class="text-xl font-bold text-white mb-2">${proj.title}</h3>
          <p class="text-slate-400 text-sm mb-4">${proj.description}</p>
          <div class="flex flex-wrap gap-1.5 mb-4">
            ${proj.techStack.map(t => `<span class="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-xs font-mono">${t}</span>`).join('')}
          </div>
        </div>
      `).join('')}
    </div>
  </section>

  <footer class="py-8 text-center text-xs text-slate-500 border-t border-slate-900">
    © ${new Date().getFullYear()} ${p.fullName || 'User'}. Generated via ResumeCraft AI.
  </footer>
</body>
</html>`;
  };

  const handleDownloadPortfolio = () => {
    const pName = (p.fullName || 'Portfolio').trim();
    const html = generatePortfolioHTML();
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${pName.replace(/\s+/g, '_')}_Portfolio.html`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      
      <div className="flex justify-between items-center mb-8 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-extrabold font-heading text-white flex items-center gap-3">
            Portfolio Website Generator
            <span className="text-xs px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 font-mono border border-purple-500/30">
              HTML5 + Tailwind
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Turn your resume data into a standalone, interactive portfolio site in 1-click.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={onBack}
            className="px-4 py-2 rounded-xl glass-card border border-slate-700 text-slate-300 text-xs font-semibold hover:bg-slate-800"
          >
            Back to Builder
          </button>
          
          <button
            onClick={handleDownloadPortfolio}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-xs shadow-lg flex items-center gap-2"
          >
            <Download className="w-4 h-4" /> Download Portfolio Site (.html)
          </button>
        </div>
      </div>

      {/* Live Preview Container */}
      <div className="glass-card rounded-3xl p-4 border border-slate-800">
        <div className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 h-[650px]">
          <iframe
            srcDoc={generatePortfolioHTML()}
            title="Portfolio Live Preview"
            className="w-full h-full border-none"
          />
        </div>
      </div>

    </div>
  );
};
