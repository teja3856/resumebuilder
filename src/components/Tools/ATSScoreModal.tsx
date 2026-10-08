import React from 'react';
import { X, Sparkles, CheckCircle2, AlertTriangle, AlertCircle, TrendingUp, Award, Layers } from 'lucide-react';
import { ResumeData } from '../../types/resume';
import { analyzeResumeATS } from '../../utils/atsAnalyzer';

interface ATSScoreModalProps {
  isOpen: boolean;
  resume: ResumeData;
  onClose: () => void;
}

export const ATSScoreModal: React.FC<ATSScoreModalProps> = ({ isOpen, resume, onClose }) => {
  if (!isOpen) return null;

  const result = analyzeResumeATS(resume);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl glass-card rounded-3xl p-6 sm:p-8 border border-slate-700/80 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        
        {/* Top Glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center mx-auto mb-3 shadow-xl shadow-indigo-500/25">
            <Sparkles className="w-7 h-7 text-white" />
          </div>
          <h3 className="text-2xl font-black font-heading text-white">ATS Compatibility Audit</h3>
          <p className="text-xs text-slate-400">Detailed breakdown of recruiter and ATS scoring criteria</p>
        </div>

        {/* Big Score Meter */}
        <div className="p-6 rounded-2xl glass-panel border border-slate-800 text-center mb-8 bg-slate-900/60">
          <div className="text-5xl font-black font-heading bg-gradient-to-r from-emerald-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
            {result.score}<span className="text-xl font-normal text-slate-400">/100</span>
          </div>
          <p className="text-xs font-semibold text-slate-300 mt-2">
            {result.score >= 85 ? '🎉 Outstanding! High probability of passing recruiter filters.' : '⚠️ Good foundation. Follow recommendations below to hit 90+.'}
          </p>
        </div>

        {/* Category Meters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          <div className="p-3 rounded-xl glass-panel border border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">ATS Parser</span>
            <span className="text-lg font-bold text-emerald-400">{result.atsCompatibilityScore}%</span>
          </div>
          <div className="p-3 rounded-xl glass-panel border border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Grammar & Verbs</span>
            <span className="text-lg font-bold text-indigo-400">{result.grammarScore}%</span>
          </div>
          <div className="p-3 rounded-xl glass-panel border border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Keywords</span>
            <span className="text-lg font-bold text-purple-400">{result.keywordScore}%</span>
          </div>
          <div className="p-3 rounded-xl glass-panel border border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Readability</span>
            <span className="text-lg font-bold text-pink-400">{result.readabilityScore}%</span>
          </div>
        </div>

        {/* Actionable Recommendations List */}
        {result.issues.length > 0 && (
          <div className="space-y-3 mb-8">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" /> Actionable Improvements
            </h4>
            <div className="space-y-2">
              {result.issues.map((iss, idx) => (
                <div 
                  key={idx} 
                  className={`p-3.5 rounded-xl border text-xs flex justify-between items-start gap-3 ${
                    iss.type === 'critical'
                      ? 'bg-rose-950/20 border-rose-500/40 text-rose-200'
                      : iss.type === 'warning'
                      ? 'bg-amber-950/20 border-amber-500/40 text-amber-200'
                      : 'bg-indigo-950/20 border-indigo-500/40 text-indigo-200'
                  }`}
                >
                  <div>
                    <span className="font-bold block mb-0.5">{iss.message} [{iss.section}]</span>
                    <p className="opacity-90">{iss.suggestion}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Passed Checks */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Passed ATS Checks ({result.passedChecks.length})
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {result.passedChecks.map((chk, i) => (
              <div key={i} className="p-2.5 rounded-xl glass-panel border border-slate-800 text-[11px] text-slate-300 flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{chk}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
