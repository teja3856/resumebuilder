import React, { useState } from 'react';
import { X, Sparkles, Check, Briefcase, GraduationCap, Code, Layers, ArrowRight } from 'lucide-react';
import { SUMMARY_SUGGESTIONS, NO_EXPERIENCE_TYPES, NO_EXPERIENCE_GENERATORS, PROFESSION_SKILLS } from '../../data/aiDatabase';
import { ExperienceItem } from '../../types/resume';

interface AISuggestionModalProps {
  isOpen: boolean;
  type: 'summary' | 'experience' | 'skills';
  onClose: () => void;
  onSelectSummary?: (summary: string) => void;
  onAddExperience?: (exp: ExperienceItem) => void;
  onAddSkills?: (skills: string[]) => void;
}

export const AISuggestionModal: React.FC<AISuggestionModalProps> = ({
  isOpen,
  type,
  onClose,
  onSelectSummary,
  onAddExperience,
  onAddSkills
}) => {
  const [selectedRole, setSelectedRole] = useState<string>('Software Engineer');
  const [selectedExpType, setSelectedExpType] = useState<string>('academic');
  const [selectedProfession, setSelectedProfession] = useState<string>('Software Developer');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  if (!isOpen) return null;

  const handleToggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl glass-card rounded-3xl p-6 sm:p-8 border border-slate-700/80 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Top Header */}
        <div className="flex justify-between items-center pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold font-heading text-white">
                {type === 'summary' && 'AI Smart Summary Suggestions'}
                {type === 'experience' && 'No Experience? AI Work Helper'}
                {type === 'skills' && 'Profession-Based Skill Generator'}
              </h3>
              <p className="text-xs text-slate-400">
                {type === 'summary' && 'Select your background to insert a high-impact professional summary in 1-click.'}
                {type === 'experience' && 'Select your non-traditional work type to generate optimized experience bullet points.'}
                {type === 'skills' && 'Select your target career path to pick recruiter-recommended skills.'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="py-6 overflow-y-auto space-y-6 flex-1 pr-1">
          
          {/* SUMMARY MODE */}
          {type === 'summary' && (
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {Object.keys(SUMMARY_SUGGESTIONS).map((role) => (
                  <button
                    key={role}
                    onClick={() => setSelectedRole(role)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                      selectedRole === role
                        ? 'bg-indigo-600 text-white shadow-md'
                        : 'glass-panel text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>

              <div className="space-y-3 pt-2">
                {SUMMARY_SUGGESTIONS[selectedRole]?.map((sugg, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-2xl glass-panel border border-slate-800 hover:border-indigo-500/50 transition-all text-xs text-slate-200 leading-relaxed flex flex-col justify-between gap-3 group"
                  >
                    <p>"{sugg}"</p>
                    <button
                      onClick={() => {
                        if (onSelectSummary) onSelectSummary(sugg);
                        onClose();
                      }}
                      className="self-end px-3 py-1.5 rounded-lg bg-indigo-600/30 hover:bg-indigo-600 text-indigo-200 hover:text-white font-semibold text-xs transition-all flex items-center gap-1.5"
                    >
                      <span>Insert 1-Click</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* EXPERIENCE MODE */}
          {type === 'experience' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {NO_EXPERIENCE_TYPES.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedExpType(t.id)}
                    className={`p-3 rounded-xl text-left border transition-all ${
                      selectedExpType === t.id
                        ? 'bg-indigo-600/20 border-indigo-500 text-white'
                        : 'glass-panel border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <h5 className="font-bold text-xs">{t.label}</h5>
                    <p className="text-[10px] text-slate-400 line-clamp-1">{t.desc}</p>
                  </button>
                ))}
              </div>

              {NO_EXPERIENCE_GENERATORS[selectedExpType] && (
                <div className="p-5 rounded-2xl glass-panel border border-indigo-500/30 space-y-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-sm text-white">
                        {NO_EXPERIENCE_GENERATORS[selectedExpType].role}
                      </h4>
                      <p className="text-xs text-indigo-400">
                        {NO_EXPERIENCE_GENERATORS[selectedExpType].company}
                      </p>
                    </div>
                    <span className="text-[10px] px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-semibold">
                      AI Generated Entry
                    </span>
                  </div>

                  <ul className="list-disc list-inside text-xs text-slate-300 space-y-1.5 pt-2 border-t border-slate-800">
                    {NO_EXPERIENCE_GENERATORS[selectedExpType].bullets.map((b, idx) => (
                      <li key={idx} className="leading-relaxed">{b}</li>
                    ))}
                  </ul>

                  <button
                    onClick={() => {
                      if (onAddExperience) {
                        const gen = NO_EXPERIENCE_GENERATORS[selectedExpType];
                        onAddExperience({
                          id: 'exp_' + Date.now(),
                          role: gen.role,
                          company: gen.company,
                          location: 'Remote / Campus',
                          startDate: '2023',
                          endDate: '2024',
                          isCurrent: false,
                          type: selectedExpType as any,
                          bullets: gen.bullets
                        });
                      }
                      onClose();
                    }}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-xs shadow-lg shadow-indigo-500/20 hover:scale-[1.01] transition-all flex items-center justify-center gap-2 mt-4"
                  >
                    <span>Insert This Experience Entry</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* SKILLS MODE */}
          {type === 'skills' && (
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {Object.keys(PROFESSION_SKILLS).map((prof) => (
                  <button
                    key={prof}
                    onClick={() => setSelectedProfession(prof)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                      selectedProfession === prof
                        ? 'bg-indigo-600 text-white shadow-md'
                        : 'glass-panel text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    {prof}
                  </button>
                ))}
              </div>

              {PROFESSION_SKILLS[selectedProfession] && (
                <div className="space-y-4 pt-2">
                  <div>
                    <h5 className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2">Technical Skills</h5>
                    <div className="flex flex-wrap gap-2">
                      {PROFESSION_SKILLS[selectedProfession].technical.map((sk) => (
                        <button
                          key={sk}
                          onClick={() => handleToggleSkill(sk)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all flex items-center gap-1.5 ${
                            selectedSkills.includes(sk)
                              ? 'bg-indigo-600 border-indigo-500 text-white'
                              : 'glass-panel border-slate-800 text-slate-300 hover:border-indigo-500/50'
                          }`}
                        >
                          {selectedSkills.includes(sk) && <Check className="w-3.5 h-3.5" />}
                          {sk}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h5 className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-2">Soft Skills</h5>
                    <div className="flex flex-wrap gap-2">
                      {PROFESSION_SKILLS[selectedProfession].soft.map((sk) => (
                        <button
                          key={sk}
                          onClick={() => handleToggleSkill(sk)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all flex items-center gap-1.5 ${
                            selectedSkills.includes(sk)
                              ? 'bg-purple-600 border-purple-500 text-white'
                              : 'glass-panel border-slate-800 text-slate-300 hover:border-purple-500/50'
                          }`}
                        >
                          {selectedSkills.includes(sk) && <Check className="w-3.5 h-3.5" />}
                          {sk}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h5 className="text-xs font-bold text-pink-400 uppercase tracking-wider mb-2">Tools & Tech</h5>
                    <div className="flex flex-wrap gap-2">
                      {PROFESSION_SKILLS[selectedProfession].tools.map((sk) => (
                        <button
                          key={sk}
                          onClick={() => handleToggleSkill(sk)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all flex items-center gap-1.5 ${
                            selectedSkills.includes(sk)
                              ? 'bg-pink-600 border-pink-500 text-white'
                              : 'glass-panel border-slate-800 text-slate-300 hover:border-pink-500/50'
                          }`}
                        >
                          {selectedSkills.includes(sk) && <Check className="w-3.5 h-3.5" />}
                          {sk}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
                    <span className="text-xs text-slate-400">
                      {selectedSkills.length} skills selected
                    </span>
                    <button
                      onClick={() => {
                        if (onAddSkills && selectedSkills.length > 0) {
                          onAddSkills(selectedSkills);
                        }
                        onClose();
                      }}
                      disabled={selectedSkills.length === 0}
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-xs shadow-lg disabled:opacity-50 transition-all flex items-center gap-2"
                    >
                      <span>Insert Selected Skills ({selectedSkills.length})</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
