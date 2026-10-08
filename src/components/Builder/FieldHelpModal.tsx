import React from 'react';
import { X, HelpCircle, CheckCircle2, XCircle, AlertTriangle, Lightbulb } from 'lucide-react';
import { FIELD_EXPLANATIONS, FieldExplanation } from '../../data/aiDatabase';

interface FieldHelpModalProps {
  fieldId: string | null;
  onClose: () => void;
}

export const FieldHelpModal: React.FC<FieldHelpModalProps> = ({ fieldId, onClose }) => {
  if (!fieldId) return null;

  const explanation: FieldExplanation = FIELD_EXPLANATIONS[fieldId] || {
    fieldId,
    fieldName: fieldId,
    whyItMatters: "This section provides essential context to recruiters assessing your qualifications.",
    recruiterExpectations: "Clear, concise, and error-free text aligned with job description criteria.",
    goodExamples: ["Engineered scalable backend service handling 50k requests/min."],
    badExamples: ["Helped out with backend stuff."],
    commonMistakes: ["Using passive language or vague bullet points."],
    atsTips: ["Use standard industry terms and quantifiable metrics."]
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-xl glass-card rounded-3xl p-6 sm:p-8 border border-slate-700/80 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        
        {/* Top Glow */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold font-heading text-white">
              Field Guide: {explanation.fieldName}
            </h3>
            <p className="text-xs text-slate-400">Recruiter expectations & ATS tips for beginners</p>
          </div>
        </div>

        {/* Body Guide Sections */}
        <div className="space-y-5 text-xs text-slate-300">
          
          {/* Why It Matters */}
          <div className="p-4 rounded-2xl glass-panel border border-slate-800 space-y-1">
            <h4 className="font-bold text-indigo-300 text-xs uppercase tracking-wider flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-amber-400" /> Why It Matters
            </h4>
            <p className="leading-relaxed text-slate-200">{explanation.whyItMatters}</p>
          </div>

          {/* Recruiter Expectations */}
          <div className="p-4 rounded-2xl glass-panel border border-slate-800 space-y-1">
            <h4 className="font-bold text-indigo-300 text-xs uppercase tracking-wider">
              Recruiter Expectations
            </h4>
            <p className="leading-relaxed text-slate-200">{explanation.recruiterExpectations}</p>
          </div>

          {/* Good vs Bad Examples */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-2">
              <h4 className="font-bold text-emerald-400 text-xs flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Good Examples
              </h4>
              <ul className="space-y-1 list-disc list-inside text-emerald-200/90 text-[11px]">
                {explanation.goodExamples.map((ex, i) => (
                  <li key={i}>{ex}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-500/30 space-y-2">
              <h4 className="font-bold text-rose-400 text-xs flex items-center gap-1.5">
                <XCircle className="w-4 h-4" /> Bad Examples
              </h4>
              <ul className="space-y-1 list-disc list-inside text-rose-200/90 text-[11px]">
                {explanation.badExamples.map((ex, i) => (
                  <li key={i}>{ex}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Common Mistakes */}
          <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-1">
            <h4 className="font-bold text-amber-400 text-xs flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" /> Common Mistakes
            </h4>
            <ul className="list-disc list-inside text-amber-200/90 space-y-1 text-[11px]">
              {explanation.commonMistakes.map((m, i) => (
                <li key={i}>{m}</li>
              ))}
            </ul>
          </div>

          {/* ATS Tips */}
          <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 space-y-1">
            <h4 className="font-bold text-indigo-400 text-xs flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-indigo-400" /> ATS Optimization Tips
            </h4>
            <ul className="list-disc list-inside text-indigo-200/90 space-y-1 text-[11px]">
              {explanation.atsTips.map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
};
