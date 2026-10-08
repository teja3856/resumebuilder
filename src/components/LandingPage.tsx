import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  Award, 
  ShieldCheck, 
  FileText, 
  Globe, 
  Briefcase, 
  HelpCircle, 
  Star, 
  ChevronDown, 
  Download, 
  Bot, 
  Check, 
  Layers
} from 'lucide-react';
import { RESUME_TEMPLATES } from '../data/templates';
import { TemplateId } from '../types/resume';

interface LandingPageProps {
  onStartBuilding: (templateId?: TemplateId) => void;
  onOpenTemplates: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartBuilding,
  onOpenTemplates
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [previewTemplate, setPreviewTemplate] = useState<TemplateId | null>(null);

  const faqs = [
    {
      q: "How does the AI Resume Assistant work for beginners?",
      a: "If you don't know what to write, our AI suggests role-specific summaries, pre-written high-impact experience bullets for students/freshers (internships, projects, volunteering), and instant skill chips based on your target profession."
    },
    {
      q: "Are the generated resumes ATS-friendly?",
      a: "Yes! All 15 templates are built following strict Applicant Tracking System (ATS) guidelines, avoiding unparseable graphics, using semantic text hierarchy, and featuring real-time ATS score optimization."
    },
    {
      q: "Can I generate a matching Cover Letter and Portfolio Website?",
      a: "Absolutely. With 1-click, your resume data automatically populates a personalized matching Cover Letter and generates a standalone interactive Portfolio Website."
    },
    {
      q: "What file formats can I export my resume to?",
      a: "You can download your resume as a high-resolution PDF, editable Microsoft Word DOCX, raw HTML, or plain text TXT, as well as generate a shareable web link and QR code."
    },
    {
      q: "Is my personal data secure and private?",
      a: "Yes. All your resume drafts, versions, and credentials are saved locally in your browser's encrypted LocalStorage/IndexedDB. We do not sell your personal information."
    }
  ];

  const testimonials = [
    {
      name: "Sophia Chen",
      role: "Software Engineer at Google",
      text: "As a fresh graduate with no full-time experience, the 'No Work Experience?' AI generator converted my academic projects into powerful bullet points. Got 4 tech interviews in 2 weeks!",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
      rating: 5
    },
    {
      name: "Marcus Vance",
      role: "Senior Product Designer",
      text: "The glassmorphism UI is gorgeous, and switching between 15 templates instantly without losing formatting saved me hours. The ATS score hit 94/100!",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      rating: 5
    },
    {
      name: "Elena Rostova",
      role: "Data Analyst",
      text: "The built-in voice input and field explanation tooltips answered all my recruiter expectations questions. Highly recommended!",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      rating: 5
    }
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Background Animated Gradient Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-tr from-indigo-600/20 via-purple-600/20 to-pink-500/10 blur-[120px] rounded-full pointer-events-none -z-10 animate-pulse" />
      <div className="absolute top-[800px] right-0 w-[600px] h-[600px] bg-gradient-to-b from-blue-600/15 to-teal-500/10 blur-[140px] rounded-full pointer-events-none -z-10" />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-8 shadow-lg shadow-indigo-500/10">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span>Next-Gen AI Resume & Portfolio Builder 2.0</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight font-heading leading-tight mb-6">
          Craft ATS-Friendly Resumes <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
            Powered by Smart AI
          </span>
        </h1>

        <p className="max-w-3xl mx-auto text-lg sm:text-xl text-slate-300 font-normal mb-10 leading-relaxed">
          Stuck on what to write? Our intelligent AI guides you step-by-step with 1-click summaries, 
          role-based experience generators for freshers, real-time ATS scoring, and 15+ modern templates.
        </p>

        {/* CTA Group */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={() => onStartBuilding()}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold text-base shadow-xl shadow-indigo-500/25 hover:scale-[1.03] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group"
          >
            <Sparkles className="w-5 h-5 text-indigo-200" />
            Build Your Resume Now
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onOpenTemplates}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl glass-card border border-slate-700 text-slate-200 font-semibold text-base hover:bg-slate-800/60 hover:text-white transition-all flex items-center justify-center gap-2"
          >
            <Layers className="w-5 h-5 text-indigo-400" />
            Explore 15+ Templates
          </button>
        </div>

        {/* Key Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-6 border-t border-slate-800/80">
          <div className="flex items-center justify-center gap-2 text-slate-400 text-xs sm:text-sm font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 100% ATS Compatible
          </div>
          <div className="flex items-center justify-center gap-2 text-slate-400 text-xs sm:text-sm font-medium">
            <Zap className="w-4 h-4 text-amber-400" /> 1-Click AI Auto-Suggest
          </div>
          <div className="flex items-center justify-center gap-2 text-slate-400 text-xs sm:text-sm font-medium">
            <Download className="w-4 h-4 text-indigo-400" /> PDF, DOCX, HTML Export
          </div>
          <div className="flex items-center justify-center gap-2 text-slate-400 text-xs sm:text-sm font-medium">
            <Globe className="w-4 h-4 text-purple-400" /> Portfolio Site Included
          </div>
        </div>
      </section>

      {/* Floating Preview Card Showcase */}
      <section className="max-w-6xl mx-auto px-4 mb-24">
        <div className="glass-card rounded-3xl p-4 sm:p-8 border border-slate-700/60 shadow-2xl relative">
          <div className="absolute -top-4 right-8 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5" /> Real-time Live Render Engine
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="space-y-4">
              <div className="p-4 rounded-2xl glass-panel border border-indigo-500/30">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block mb-1">Feature 01</span>
                <h4 className="text-lg font-bold text-white mb-1">AI Field Assistant</h4>
                <p className="text-xs text-slate-400">Clicking (?) explains recruiter expectations, ATS tips, and good/bad examples.</p>
              </div>

              <div className="p-4 rounded-2xl glass-panel border border-purple-500/30">
                <span className="text-xs font-bold text-purple-400 uppercase tracking-wider block mb-1">Feature 02</span>
                <h4 className="text-lg font-bold text-white mb-1">No Experience Helper</h4>
                <p className="text-xs text-slate-400">Turns student projects, hackathons, and volunteering into high-impact roles.</p>
              </div>

              <div className="p-4 rounded-2xl glass-panel border border-pink-500/30">
                <span className="text-xs font-bold text-pink-400 uppercase tracking-wider block mb-1">Feature 03</span>
                <h4 className="text-lg font-bold text-white mb-1">ATS Score Meter (92/100)</h4>
                <p className="text-xs text-slate-400">Analyzes keyword density, action verbs, and formatting rules instantly.</p>
              </div>
            </div>

            <div className="md:col-span-2 rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 p-6 shadow-inner relative group">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-xs font-mono text-slate-400 ml-2">resumecraft_preview_modern.pdf</span>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  96/100 ATS Score
                </span>
              </div>

              {/* Sample Resume Preview Graphic */}
              <div className="bg-slate-950 p-6 rounded-xl border border-slate-800/80 text-left space-y-4 font-sans text-xs">
                <div className="border-b border-indigo-500/30 pb-3 flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-white">Alexander Vance</h3>
                    <p className="text-indigo-400 font-medium">Senior Software Engineer</p>
                  </div>
                  <div className="text-slate-400 text-right text-[11px]">
                    <p>alex.vance@tech.io | +1 (555) 019-2834</p>
                    <p>github.com/alexvance | San Francisco, CA</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-[11px] font-bold text-indigo-300 uppercase tracking-wider mb-1">Professional Summary</h4>
                  <p className="text-slate-300 leading-relaxed text-[11px]">
                    Results-oriented Full Stack Engineer with 5+ years of experience building high-throughput microservices using React, Node.js, and AWS. Spearheaded architecture overhaul resulting in 35% latency reduction.
                  </p>
                </div>

                <div>
                  <h4 className="text-[11px] font-bold text-indigo-300 uppercase tracking-wider mb-1">Experience</h4>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between font-semibold text-slate-200">
                        <span>Lead Frontend Engineer — CloudTech Solutions</span>
                        <span className="text-slate-400">2022 – Present</span>
                      </div>
                      <ul className="list-disc list-inside text-slate-400 space-y-0.5 mt-1">
                        <li>Engineered high-performance design system adopted across 14 enterprise projects.</li>
                        <li>Automated CI/CD pipelines using GitHub Actions, cutting release cycles by 45%.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Features Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-white mb-4">
            Smart Features Built for Job Victory
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
            Everything you need to bypass ATS filters, impress recruiters, and land interviews faster.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl glass-card border border-slate-800 hover:border-indigo-500/40 transition-all hover:scale-[1.02]">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center mb-6">
              <Bot className="w-6 h-6 text-indigo-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">1-Click AI Auto-Suggest</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Stuck on empty fields? Instantly insert role-specific summaries, skill chips, and experience points tailored for students, freshers, or senior pros.
            </p>
          </div>

          <div className="p-8 rounded-3xl glass-card border border-slate-800 hover:border-purple-500/40 transition-all hover:scale-[1.02]">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center mb-6">
              <ShieldCheck className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">ATS Compatibility Score</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Get an instant score out of 100 with clear, actionable recommendations on grammar, action verbs, keyword density, and formatting rules.
            </p>
          </div>

          <div className="p-8 rounded-3xl glass-card border border-slate-800 hover:border-pink-500/40 transition-all hover:scale-[1.02]">
            <div className="w-12 h-12 rounded-2xl bg-pink-500/20 border border-pink-500/30 flex items-center justify-center mb-6">
              <Zap className="w-6 h-6 text-pink-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">1-Click Resume Optimizer</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Transform passive sentences into powerful action-verb statements and fix typos instantly with a single button tap.
            </p>
          </div>

          <div className="p-8 rounded-3xl glass-card border border-slate-800 hover:border-emerald-500/40 transition-all hover:scale-[1.02]">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mb-6">
              <Briefcase className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Cover Letter Generator</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Auto-generate a highly targeted, professional cover letter matched perfectly to your resume and desired target job title.
            </p>
          </div>

          <div className="p-8 rounded-3xl glass-card border border-slate-800 hover:border-teal-500/40 transition-all hover:scale-[1.02]">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center mb-6">
              <Globe className="w-6 h-6 text-teal-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Portfolio Site Generator</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Turn your resume data into a standalone responsive portfolio website with project links, skill charts, and personal bio.
            </p>
          </div>

          <div className="p-8 rounded-3xl glass-card border border-slate-800 hover:border-amber-500/40 transition-all hover:scale-[1.02]">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center mb-6">
              <HelpCircle className="w-6 h-6 text-amber-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Field Explanations (?)</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Learn what recruiters expect for every single input field with good vs bad examples, common pitfalls, and beginner advice.
            </p>
          </div>
        </div>
      </section>

      {/* 15 Templates Showcase Gallery */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-white mb-3">
              15+ Recruiter-Approved Templates
            </h2>
            <p className="text-slate-400 text-base">
              Designed for software engineers, designers, executives, freshers, and students.
            </p>
          </div>
          <button
            onClick={onOpenTemplates}
            className="mt-4 md:mt-0 text-indigo-400 hover:text-indigo-300 font-semibold text-sm flex items-center gap-1.5"
          >
            View All 15 Templates <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {RESUME_TEMPLATES.slice(0, 6).map((tpl) => (
            <div 
              key={tpl.id}
              className="glass-card rounded-2xl overflow-hidden border border-slate-800 hover:border-indigo-500/50 transition-all group flex flex-col justify-between"
            >
              <div className={`h-48 bg-gradient-to-tr ${tpl.previewBg} p-6 flex flex-col justify-between relative overflow-hidden`}>
                <div className="flex justify-between items-start">
                  <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-white text-[11px] font-semibold border border-white/10">
                    {tpl.category}
                  </span>
                  {tpl.isPopular && (
                    <span className="px-3 py-1 rounded-full bg-amber-500 text-slate-950 text-[11px] font-bold shadow-md">
                      Popular
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white font-heading">{tpl.name}</h3>
                  <p className="text-white/80 text-xs">{tpl.tag}</p>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <p className="text-slate-300 text-xs leading-relaxed">{tpl.description}</p>
                <div className="flex gap-3">
                  <button
                    onClick={() => onStartBuilding(tpl.id)}
                    className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2"
                  >
                    Use Template <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white mb-4">
            Loved by Job Seekers Worldwide
          </h2>
          <p className="text-slate-400 text-base">
            See how candidates landed roles at top companies using ResumeCraft AI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div key={idx} className="p-8 rounded-3xl glass-card border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex gap-1 text-amber-400 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-6 italic">"{t.text}"</p>
              </div>

              <div className="flex items-center gap-4 border-t border-slate-800/80 pt-4">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover border border-slate-700" />
                <div>
                  <h4 className="text-white font-bold text-sm">{t.name}</h4>
                  <p className="text-slate-400 text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQs Accordion */}
      <section className="max-w-4xl mx-auto px-4 mb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-400 text-sm">Everything you need to know about building your resume.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="glass-card rounded-2xl border border-slate-800 overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full p-6 text-left font-bold text-white flex justify-between items-center gap-4 hover:text-indigo-300 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-indigo-400 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === index && (
                <div className="px-6 pb-6 text-slate-300 text-sm leading-relaxed border-t border-slate-800/50 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA Banner */}
      <section className="max-w-6xl mx-auto px-4 mb-24 text-center">
        <div className="glass-card rounded-3xl p-12 border border-indigo-500/40 relative overflow-hidden bg-gradient-to-r from-indigo-950/80 via-slate-900 to-purple-950/80">
          <h2 className="text-3xl sm:text-5xl font-black font-heading text-white mb-6">
            Ready to Land Your Dream Job?
          </h2>
          <p className="max-w-2xl mx-auto text-slate-300 text-base sm:text-lg mb-8">
            Create an ATS-friendly, professional resume in under 5 minutes with our AI assistant. No credit card required.
          </p>
          <button
            onClick={() => onStartBuilding()}
            className="px-10 py-5 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-extrabold text-lg shadow-2xl shadow-indigo-500/40 hover:scale-[1.03] transition-all inline-flex items-center gap-3"
          >
            <Sparkles className="w-6 h-6 text-indigo-200" />
            Build My Free Resume Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950/90 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-white font-heading">ResumeCraft AI</span>
          </div>

          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} ResumeCraft AI. All rights reserved. ATS-optimized resume builder.
          </p>

          <div className="flex gap-6 text-xs text-slate-400">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Contact Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
