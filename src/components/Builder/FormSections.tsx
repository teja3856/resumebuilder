import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  Copy, 
  ChevronUp, 
  ChevronDown, 
  HelpCircle, 
  Sparkles, 
  Mic, 
  MicOff, 
  User, 
  FileText, 
  Briefcase, 
  GraduationCap, 
  Code, 
  Award, 
  Trophy, 
  Globe, 
  Heart, 
  Users 
} from 'lucide-react';
import { ResumeData, ExperienceItem, EducationItem, ProjectItem, SkillItem, CertificationItem, AchievementItem, LanguageItem, InterestItem, ReferenceItem } from '../../types/resume';

interface FormSectionsProps {
  resume: ResumeData;
  onChange: (updated: ResumeData) => void;
  onOpenAISuggestions: (type: 'summary' | 'experience' | 'skills') => void;
  onOpenFieldHelp: (fieldId: string) => void;
}

interface InputFieldProps {
  label: string;
  fieldId: string;
  value: string;
  placeholder: string;
  isTextArea?: boolean;
  onChangeVal: (val: string) => void;
  onOpenFieldHelp: (fieldId: string) => void;
  onVoiceInput: (fieldId: string, currentVal: string, updateFn: (val: string) => void) => void;
  isListening: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  fieldId,
  value,
  placeholder,
  isTextArea = false,
  onChangeVal,
  onOpenFieldHelp,
  onVoiceInput,
  isListening
}) => (
  <div className="space-y-1.5">
    <div className="flex justify-between items-center">
      <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
        {label}
        <button
          type="button"
          onClick={() => onOpenFieldHelp(fieldId)}
          className="text-slate-500 hover:text-indigo-400 p-0.5 rounded-full transition-colors"
          title="Explain this field"
        >
          <HelpCircle className="w-3.5 h-3.5" />
        </button>
      </label>

      <button
        type="button"
        onClick={() => onVoiceInput(fieldId, value, onChangeVal)}
        className={`px-2 py-0.5 rounded-lg text-[10px] font-semibold flex items-center gap-1 border transition-all ${
          isListening 
            ? 'bg-rose-500/20 text-rose-300 border-rose-500 animate-pulse' 
            : 'glass-panel text-slate-400 hover:text-white border-slate-700'
        }`}
      >
        {isListening ? <MicOff className="w-3 h-3 text-rose-400" /> : <Mic className="w-3 h-3 text-indigo-400" />}
        {isListening ? 'Listening...' : 'Voice Input'}
      </button>
    </div>

    {isTextArea ? (
      <textarea
        rows={3}
        value={value}
        onChange={(e) => onChangeVal(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 rounded-xl glass-input text-xs leading-relaxed"
      />
    ) : (
      <input
        type="text"
        value={value}
        onChange={(e) => onChangeVal(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 rounded-xl glass-input text-xs"
      />
    )}
  </div>
);

export const FormSections: React.FC<FormSectionsProps> = ({
  resume,
  onChange,
  onOpenAISuggestions,
  onOpenFieldHelp
}) => {
  const [activeSection, setActiveSection] = useState<string>('personal');
  const [isListening, setIsListening] = useState<string | null>(null);

  // Speech Recognition Voice Input Handler
  const handleVoiceInput = (fieldId: string, currentVal: string, updateFn: (val: string) => void) => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice input SpeechRecognition is not supported in this browser. Please use Chrome or Edge.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(fieldId);
    recognition.onend = () => setIsListening(null);
    recognition.onerror = () => setIsListening(null);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      updateFn(currentVal ? `${currentVal} ${transcript}` : transcript);
    };

    recognition.start();
  };

  const renderFieldProps = (
    label: string,
    fieldId: string,
    value: string,
    placeholder: string,
    onChangeVal: (val: string) => void,
    isTextArea = false
  ) => ({
    label,
    fieldId,
    value,
    placeholder,
    isTextArea,
    onChangeVal,
    onOpenFieldHelp,
    onVoiceInput: handleVoiceInput,
    isListening: isListening === fieldId
  });

  const sectionsList = [
    { id: 'personal', name: 'Personal Info', icon: User },
    { id: 'education', name: 'Education', icon: GraduationCap },
    { id: 'summary', name: 'Objective', icon: FileText },
    { id: 'projects', name: 'Projects', icon: Code },
    { id: 'skills', name: 'Skills', icon: Award },
    { id: 'experience', name: 'Experience', icon: Briefcase },
    { id: 'certifications', name: 'Certifications', icon: Trophy },
    { id: 'achievements', name: 'Achievements', icon: Trophy },
    { id: 'languages', name: 'Languages', icon: Globe },
    { id: 'interests', name: 'Interests', icon: Heart },
    { id: 'references', name: 'References', icon: Users },
  ];

  // Intern guide banner — shown inside each section
  const InternTip = ({ children }: { children: React.ReactNode }) => (
    <div className="flex gap-2.5 p-3 rounded-xl bg-violet-950/60 border border-violet-700/40 text-violet-200 text-xs leading-relaxed mb-2">
      <span className="text-base leading-none mt-0.5">🎓</span>
      <span>{children}</span>
    </div>
  );

  return (
    <div className="space-y-6">
      
      {/* Section Navigation Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {sectionsList.map((sec) => {
          const Icon = sec.icon;
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => setActiveSection(sec.id)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 border ${
                isActive
                  ? 'bg-indigo-600 border-indigo-500 text-white shadow-md'
                  : 'glass-panel border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {sec.name}
            </button>
          );
        })}
      </div>

      {/* SECTION 1: PERSONAL INFORMATION */}
      {activeSection === 'personal' && (
        <div className="p-6 rounded-2xl glass-card border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white font-heading border-b border-slate-800 pb-2">
            Personal Information
          </h3>

          <InternTip>
            <strong>Fresher Tips:</strong> Use your <strong>university email</strong> (e.g. name@college.edu). Always add your <strong>GitHub</strong> — recruiters check your repos! Add LinkedIn too. Leave Website blank if you don't have a portfolio yet.
          </InternTip>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField
              {...renderFieldProps("Full Name", "fullName", resume.personalInfo.fullName, "e.g. Johnathon Vance", (val) => onChange({
                ...resume,
                personalInfo: { ...resume.personalInfo, fullName: val }
              }))}
            />

            <InputField
              {...renderFieldProps("Target Job Title", "jobTitle", resume.personalInfo.jobTitle, "e.g. Senior Software Engineer", (val) => onChange({
                ...resume,
                personalInfo: { ...resume.personalInfo, jobTitle: val }
              }))}
            />

            <InputField
              {...renderFieldProps("Email Address", "email", resume.personalInfo.email, "e.g. alex.vance@gmail.com", (val) => onChange({
                ...resume,
                personalInfo: { ...resume.personalInfo, email: val }
              }))}
            />

            <InputField
              {...renderFieldProps("Phone Number", "phone", resume.personalInfo.phone, "e.g. +1 (555) 019-2834", (val) => onChange({
                ...resume,
                personalInfo: { ...resume.personalInfo, phone: val }
              }))}
            />

            <InputField
              {...renderFieldProps("City, State / Country", "location", resume.personalInfo.location, "e.g. San Francisco, CA", (val) => onChange({
                ...resume,
                personalInfo: { ...resume.personalInfo, location: val }
              }))}
            />

            <InputField
              {...renderFieldProps("LinkedIn URL", "linkedin", resume.personalInfo.linkedin || '', "e.g. linkedin.com/in/alexvance", (val) => onChange({
                ...resume,
                personalInfo: { ...resume.personalInfo, linkedin: val }
              }))}
            />

            <InputField
              {...renderFieldProps("GitHub Profile URL", "github", resume.personalInfo.github || '', "e.g. github.com/alexvance", (val) => onChange({
                ...resume,
                personalInfo: { ...resume.personalInfo, github: val }
              }))}
            />

            <InputField
              {...renderFieldProps("Portfolio Website URL", "website", resume.personalInfo.website || '', "e.g. alexvance.dev", (val) => onChange({
                ...resume,
                personalInfo: { ...resume.personalInfo, website: val }
              }))}
            />
          </div>
        </div>
      )}

      {/* SECTION 2: CAREER OBJECTIVE / SUMMARY */}
      {activeSection === 'summary' && (
        <div className="p-6 rounded-2xl glass-card border border-slate-800 space-y-4">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2">
            <h3 className="text-base font-bold text-white font-heading">
              Career Objective
            </h3>
            <button
              onClick={() => onOpenAISuggestions('summary')}
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-xs shadow-md flex items-center gap-1.5 hover:scale-105 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" /> AI Suggest Objective
            </button>
          </div>

          <InternTip>
            <strong>For freshers, write a Career Objective (2–3 lines):</strong>
            <br />1. <em>Who you are</em> → "Final year B.Tech CSE student at [College]..."
            <br />2. <em>What you know</em> → "...with skills in Python, React, and SQL..."
            <br />3. <em>What you want</em> → "...seeking a Software Engineering Internship to contribute and learn."
          </InternTip>

          <InputField
            {...renderFieldProps("Career Objective", "summary", resume.summary, "e.g. Final year B.Tech CSE student with skills in Python & React, seeking a Software Engineering Internship to build real-world experience.", (val) => onChange({ ...resume, summary: val }), true)}
          />
        </div>
      )}

      {/* SECTION 3: WORK EXPERIENCE */}
      {activeSection === 'experience' && (
        <div className="p-6 rounded-2xl glass-card border border-slate-800 space-y-6">
          <div className="flex flex-wrap justify-between items-center border-b border-slate-800 pb-3 gap-2">
            <div>
              <h3 className="text-base font-bold text-white font-heading">Work Experience</h3>
              <p className="text-xs text-slate-400">Reverse chronological order of past roles</p>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => onOpenAISuggestions('experience')}
                className="px-3 py-1.5 rounded-xl bg-purple-600/30 hover:bg-purple-600 text-purple-200 hover:text-white font-semibold text-xs border border-purple-500/40 flex items-center gap-1.5 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" /> No Experience? AI Helper
              </button>

              <button
                onClick={() => {
                  const newExp: ExperienceItem = {
                    id: 'exp_' + Date.now(),
                    company: '',
                    role: '',
                    location: '',
                    startDate: '',
                    endDate: '',
                    isCurrent: false,
                    bullets: ['']
                  };
                  onChange({ ...resume, experiences: [...resume.experiences, newExp] });
                }}
                className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all"
              >
                <Plus className="w-3.5 h-3.5" /> Add Role
              </button>
            </div>
          </div>

          {resume.experiences.length === 0 ? (
            <div className="space-y-3 py-2">
              <InternTip>
                <strong>No work experience? That's perfectly fine! 👍</strong>
                <br />Most interns don't. Instead you can add:
                <br />• <strong>College lab assistant</strong> or Teaching Assistant role
                <br />• <strong>Freelance projects</strong> done for clients (even free ones count)
                <br />• <strong>Internship from college</strong> (even 1-month mini internships)
                <br />• <strong>Open-source contributions</strong> on GitHub
                <br />• <strong>Hackathon volunteer / organiser</strong> roles
                <br /><br />If you have <em>none of the above</em>, leave this section <strong>empty</strong> — your Projects section will carry you!
              </InternTip>
              <p className="text-xs text-slate-400 text-center py-2">
                Click "Add Role" above if you have any part-time, freelance, internship, or volunteering experience.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {resume.experiences.map((exp, index) => (
                <div key={exp.id} className="p-4 rounded-xl glass-panel border border-slate-800 space-y-4 relative group">
                  <div className="flex justify-between items-center border-b border-slate-800/80 pb-2">
                    <span className="text-xs font-bold text-indigo-400 font-mono">Role #{index + 1}</span>
                    
                    <div className="flex items-center gap-1">
                      {index > 0 && (
                        <button
                          onClick={() => {
                            const arr = [...resume.experiences];
                            const tmp = arr[index];
                            arr[index] = arr[index - 1];
                            arr[index - 1] = tmp;
                            onChange({ ...resume, experiences: arr });
                          }}
                          className="p-1 text-slate-400 hover:text-white"
                          title="Move Up"
                        >
                          <ChevronUp className="w-4 h-4" />
                        </button>
                      )}
                      {index < resume.experiences.length - 1 && (
                        <button
                          onClick={() => {
                            const arr = [...resume.experiences];
                            const tmp = arr[index];
                            arr[index] = arr[index + 1];
                            arr[index + 1] = tmp;
                            onChange({ ...resume, experiences: arr });
                          }}
                          className="p-1 text-slate-400 hover:text-white"
                          title="Move Down"
                        >
                          <ChevronDown className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => {
                          const dup = { ...exp, id: 'exp_' + Date.now() };
                          const arr = [...resume.experiences];
                          arr.splice(index + 1, 0, dup);
                          onChange({ ...resume, experiences: arr });
                        }}
                        className="p-1 text-slate-400 hover:text-white"
                        title="Duplicate"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          onChange({
                            ...resume,
                            experiences: resume.experiences.filter(e => e.id !== exp.id)
                          });
                        }}
                        className="p-1 text-slate-400 hover:text-rose-400"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <InputField
                      {...renderFieldProps("Job Role / Position", "experience", exp.role, "e.g. Lead Frontend Engineer", (val) => {
                        const arr = [...resume.experiences];
                        arr[index] = { ...arr[index], role: val };
                        onChange({ ...resume, experiences: arr });
                      })}
                    />
                    <InputField
                      {...renderFieldProps("Company Name", "experience", exp.company, "e.g. TechCorp Solutions", (val) => {
                        const arr = [...resume.experiences];
                        arr[index] = { ...arr[index], company: val };
                        onChange({ ...resume, experiences: arr });
                      })}
                    />
                    <InputField
                      {...renderFieldProps("Start Date", "experience", exp.startDate, "e.g. Jun 2022", (val) => {
                        const arr = [...resume.experiences];
                        arr[index] = { ...arr[index], startDate: val };
                        onChange({ ...resume, experiences: arr });
                      })}
                    />
                    <InputField
                      {...renderFieldProps("End Date", "experience", exp.endDate, "e.g. Present or Dec 2023", (val) => {
                        const arr = [...resume.experiences];
                        arr[index] = { ...arr[index], endDate: val };
                        onChange({ ...resume, experiences: arr });
                      })}
                    />
                  </div>

                  {/* Bullet Points */}
                  <div className="space-y-2 pt-2">
                    <label className="text-xs font-semibold text-slate-300">Bullet Points (Action Verbs + Impact)</label>
                    {exp.bullets.map((bullet, bIdx) => (
                      <div key={bIdx} className="flex gap-2 items-center">
                        <input
                          type="text"
                          value={bullet}
                          placeholder="e.g. Engineered automated ETL pipelines handling 2TB daily data..."
                          onChange={(e) => {
                            const arr = [...resume.experiences];
                            const newBullets = [...arr[index].bullets];
                            newBullets[bIdx] = e.target.value;
                            arr[index] = { ...arr[index], bullets: newBullets };
                            onChange({ ...resume, experiences: arr });
                          }}
                          className="flex-1 px-3 py-1.5 rounded-xl glass-input text-xs"
                        />
                        <button
                          onClick={() => {
                            const arr = [...resume.experiences];
                            const newBullets = arr[index].bullets.filter((_, i) => i !== bIdx);
                            arr[index] = { ...arr[index], bullets: newBullets };
                            onChange({ ...resume, experiences: arr });
                          }}
                          className="p-1 text-slate-500 hover:text-rose-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        const arr = [...resume.experiences];
                        arr[index] = { ...arr[index], bullets: [...arr[index].bullets, ''] };
                        onChange({ ...resume, experiences: arr });
                      }}
                      className="text-xs text-indigo-400 font-semibold hover:underline flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" /> Add Bullet Point
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SECTION 4: SKILLS */}
      {activeSection === 'skills' && (
        <div className="p-6 rounded-2xl glass-card border border-slate-800 space-y-4">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2">
            <h3 className="text-base font-bold text-white font-heading">Key Skills</h3>
            <button
              onClick={() => onOpenAISuggestions('skills')}
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-xs shadow-md flex items-center gap-1.5 hover:scale-105 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" /> AI Suggest Skills
            </button>
          </div>

          <InternTip>
            <strong>Skills to include as a fresher:</strong> Programming languages you've learned (<em>Python, Java, C++</em>), web frameworks (<em>React, Node.js, Spring Boot</em>), databases (<em>MySQL, MongoDB</em>), tools (<em>Git, VS Code, Postman, Linux</em>), and soft skills (<em>Problem Solving, Teamwork</em>). Don't worry if your level is Beginner — honesty matters!
          </InternTip>

          <div className="flex flex-wrap gap-2 py-2">
            {resume.skills.map((sk, index) => (
              <span 
                key={sk.id}
                className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs font-medium flex items-center gap-2"
              >
                {sk.name}
                <button
                  onClick={() => {
                    onChange({
                      ...resume,
                      skills: resume.skills.filter(s => s.id !== sk.id)
                    });
                  }}
                  className="text-slate-500 hover:text-rose-400"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 5: EDUCATION */}
      {activeSection === 'education' && (
        <div className="p-6 rounded-2xl glass-card border border-slate-800 space-y-4">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2">
            <h3 className="text-base font-bold text-white font-heading">Education</h3>
            <button
              onClick={() => {
                const newEdu: EducationItem = {
                  id: 'edu_' + Date.now(),
                  institution: '',
                  degree: '',
                  fieldOfStudy: '',
                  location: '',
                  startDate: '',
                  endDate: ''
                };
                onChange({ ...resume, education: [...resume.education, newEdu] });
              }}
              className="px-4 py-1.5 rounded-xl bg-indigo-600 text-white font-bold text-xs flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" /> Add Education
            </button>
          </div>

          <InternTip>
            <strong>Education is your strongest selling point as a fresher!</strong> Fill in your college name, degree (B.Tech / B.Sc / BCA), branch (CSE / IT), CGPA/GPA, and expected graduation year. Add a <em>Relevant Coursework</em> bullet with subjects like Data Structures, DBMS, OS — recruiters love seeing this!
          </InternTip>

          {resume.education.map((edu, index) => (
            <div key={edu.id} className="p-4 rounded-xl glass-panel border border-slate-800 space-y-3">
              <div className="flex justify-between">
                <span className="text-xs font-bold text-indigo-400 font-mono">Education #{index + 1}</span>
                <button
                  onClick={() => onChange({ ...resume, education: resume.education.filter(e => e.id !== edu.id) })}
                  className="text-slate-500 hover:text-rose-400"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <InputField
                  {...renderFieldProps("Degree / Diploma", "education", edu.degree, "e.g. Bachelor of Science", (val) => {
                    const arr = [...resume.education];
                    arr[index] = { ...arr[index], degree: val };
                    onChange({ ...resume, education: arr });
                  })}
                />
                <InputField
                  {...renderFieldProps("University / Institution", "education", edu.institution, "e.g. Stanford University", (val) => {
                    const arr = [...resume.education];
                    arr[index] = { ...arr[index], institution: val };
                    onChange({ ...resume, education: arr });
                  })}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SECTION 6: PROJECTS */}
      {activeSection === 'projects' && (
        <div className="p-6 rounded-2xl glass-card border border-slate-800 space-y-4">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2">
            <h3 className="text-base font-bold text-white font-heading">Key Projects</h3>
            <button
              onClick={() => {
                const newProj: ProjectItem = {
                  id: 'proj_' + Date.now(),
                  title: '',
                  description: '',
                  techStack: [],
                  bullets: ['']
                };
                onChange({ ...resume, projects: [...resume.projects, newProj] });
              }}
              className="px-4 py-1.5 rounded-xl bg-indigo-600 text-white font-bold text-xs flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" /> Add Project
            </button>
          </div>

          <InternTip>
            <strong>Projects are the MOST important section for interns! 🚀</strong> Add every project you built — college assignments, GitHub repos, personal builds, hackathon projects, open-source contributions. For each project, explain: <em>what it does</em>, <em>what tech you used</em>, and <em>what you learned or achieved</em>. Link your GitHub repo if you have one.
          </InternTip>

          {resume.projects.length === 0 ? (
            <p className="text-xs text-slate-400 text-center py-4">No projects added yet.</p>
          ) : (
            resume.projects.map((proj, index) => (
              <div key={proj.id} className="p-4 rounded-xl glass-panel border border-slate-800 space-y-3">
                <div className="flex justify-between">
                  <span className="text-xs font-bold text-indigo-400 font-mono">Project #{index + 1}</span>
                  <button
                    onClick={() => onChange({ ...resume, projects: resume.projects.filter(p => p.id !== proj.id) })}
                    className="text-slate-500 hover:text-rose-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <InputField
                  {...renderFieldProps("Project Title", "projects", proj.title, "e.g. AI Portfolio Generator App", (val) => {
                    const arr = [...resume.projects];
                    arr[index] = { ...arr[index], title: val };
                    onChange({ ...resume, projects: arr });
                  })}
                />

                <InputField
                  {...renderFieldProps("Project Description", "projects", proj.description, "Describe key features, user adoption metrics, and core tech used...", (val) => {
                    const arr = [...resume.projects];
                    arr[index] = { ...arr[index], description: val };
                    onChange({ ...resume, projects: arr });
                  }, true)}
                />
              </div>
            ))
          )}
        </div>
      )}

      {/* SECTION 7: CERTIFICATIONS */}
      {activeSection === 'certifications' && (
        <div className="p-6 rounded-2xl glass-card border border-slate-800 space-y-4">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2">
            <h3 className="text-base font-bold text-white font-heading">Certifications & Licenses</h3>
            <button
              onClick={() => {
                const newCert: CertificationItem = {
                  id: 'cert_' + Date.now(),
                  name: '',
                  issuer: '',
                  issueDate: ''
                };
                onChange({ ...resume, certifications: [...(resume.certifications || []), newCert] });
              }}
              className="px-4 py-1.5 rounded-xl bg-indigo-600 text-white font-bold text-xs flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" /> Add Certification
            </button>
          </div>

          {(!resume.certifications || resume.certifications.length === 0) ? (
            <p className="text-xs text-slate-400 text-center py-4">No certifications added yet.</p>
          ) : (
            resume.certifications.map((cert, index) => (
              <div key={cert.id} className="p-4 rounded-xl glass-panel border border-slate-800 space-y-3">
                <div className="flex justify-between">
                  <span className="text-xs font-bold text-indigo-400 font-mono">Certification #{index + 1}</span>
                  <button
                    onClick={() => onChange({ ...resume, certifications: resume.certifications.filter(c => c.id !== cert.id) })}
                    className="text-slate-500 hover:text-rose-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <InputField
                    {...renderFieldProps("Certification Name", "certifications", cert.name, "e.g. AWS Solutions Architect", (val) => {
                      const arr = [...resume.certifications];
                      arr[index] = { ...arr[index], name: val };
                      onChange({ ...resume, certifications: arr });
                    })}
                  />
                  <InputField
                    {...renderFieldProps("Issuing Organization", "certifications", cert.issuer, "e.g. Amazon Web Services", (val) => {
                      const arr = [...resume.certifications];
                      arr[index] = { ...arr[index], issuer: val };
                      onChange({ ...resume, certifications: arr });
                    })}
                  />
                  <InputField
                    {...renderFieldProps("Issue Date", "certifications", cert.issueDate, "e.g. Aug 2023", (val) => {
                      const arr = [...resume.certifications];
                      arr[index] = { ...arr[index], issueDate: val };
                      onChange({ ...resume, certifications: arr });
                    })}
                  />
                  <InputField
                    {...renderFieldProps("Expiry Date (Optional)", "certifications", cert.expiryDate || '', "e.g. Aug 2026", (val) => {
                      const arr = [...resume.certifications];
                      arr[index] = { ...arr[index], expiryDate: val };
                      onChange({ ...resume, certifications: arr });
                    })}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* SECTION 8: ACHIEVEMENTS & AWARDS */}
      {activeSection === 'achievements' && (
        <div className="p-6 rounded-2xl glass-card border border-slate-800 space-y-4">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2">
            <h3 className="text-base font-bold text-white font-heading">Achievements & Honors</h3>
            <button
              onClick={() => {
                const newAch: AchievementItem = {
                  id: 'ach_' + Date.now(),
                  title: '',
                  organization: '',
                  date: '',
                  description: ''
                };
                onChange({ ...resume, achievements: [...(resume.achievements || []), newAch] });
              }}
              className="px-4 py-1.5 rounded-xl bg-indigo-600 text-white font-bold text-xs flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" /> Add Achievement
            </button>
          </div>

          {(!resume.achievements || resume.achievements.length === 0) ? (
            <p className="text-xs text-slate-400 text-center py-4">No achievements added yet.</p>
          ) : (
            resume.achievements.map((ach, index) => (
              <div key={ach.id} className="p-4 rounded-xl glass-panel border border-slate-800 space-y-3">
                <div className="flex justify-between">
                  <span className="text-xs font-bold text-indigo-400 font-mono">Achievement #{index + 1}</span>
                  <button
                    onClick={() => onChange({ ...resume, achievements: resume.achievements.filter(a => a.id !== ach.id) })}
                    className="text-slate-500 hover:text-rose-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <InputField
                    {...renderFieldProps("Title / Award", "achievements", ach.title, "e.g. Hackathon Winner 1st Place", (val) => {
                      const arr = [...resume.achievements];
                      arr[index] = { ...arr[index], title: val };
                      onChange({ ...resume, achievements: arr });
                    })}
                  />
                  <InputField
                    {...renderFieldProps("Organization", "achievements", ach.organization, "e.g. TechCrunch Disrupt", (val) => {
                      const arr = [...resume.achievements];
                      arr[index] = { ...arr[index], organization: val };
                      onChange({ ...resume, achievements: arr });
                    })}
                  />
                </div>

                <InputField
                  {...renderFieldProps("Description", "achievements", ach.description, "Briefly describe the context or criteria for this award...", (val) => {
                    const arr = [...resume.achievements];
                    arr[index] = { ...arr[index], description: val };
                    onChange({ ...resume, achievements: arr });
                  }, true)}
                />
              </div>
            ))
          )}
        </div>
      )}

      {/* SECTION 9: LANGUAGES */}
      {activeSection === 'languages' && (
        <div className="p-6 rounded-2xl glass-card border border-slate-800 space-y-4">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2">
            <h3 className="text-base font-bold text-white font-heading">Languages</h3>
            <button
              onClick={() => {
                const newLang: LanguageItem = {
                  id: 'lang_' + Date.now(),
                  language: '',
                  proficiency: 'Fluent'
                };
                onChange({ ...resume, languages: [...(resume.languages || []), newLang] });
              }}
              className="px-4 py-1.5 rounded-xl bg-indigo-600 text-white font-bold text-xs flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" /> Add Language
            </button>
          </div>

          {(!resume.languages || resume.languages.length === 0) ? (
            <p className="text-xs text-slate-400 text-center py-4">No languages added yet.</p>
          ) : (
            <div className="space-y-3">
              {resume.languages.map((lang, index) => (
                <div key={lang.id} className="p-3 rounded-xl glass-panel border border-slate-800 flex items-center gap-3">
                  <input
                    type="text"
                    placeholder="e.g. English, Spanish, French"
                    value={lang.language}
                    onChange={(e) => {
                      const arr = [...resume.languages];
                      arr[index] = { ...arr[index], language: e.target.value };
                      onChange({ ...resume, languages: arr });
                    }}
                    className="flex-1 px-3 py-1.5 rounded-xl glass-input text-xs"
                  />
                  <select
                    value={lang.proficiency}
                    onChange={(e) => {
                      const arr = [...resume.languages];
                      arr[index] = { ...arr[index], proficiency: e.target.value as any };
                      onChange({ ...resume, languages: arr });
                    }}
                    className="bg-slate-900 text-slate-200 text-xs px-3 py-1.5 rounded-xl border border-slate-700"
                  >
                    <option value="Native">Native</option>
                    <option value="Fluent">Fluent</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Basic">Basic</option>
                  </select>
                  <button
                    onClick={() => onChange({ ...resume, languages: resume.languages.filter(l => l.id !== lang.id) })}
                    className="text-slate-500 hover:text-rose-400 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SECTION 10: INTERESTS & HOBBIES */}
      {activeSection === 'interests' && (
        <div className="p-6 rounded-2xl glass-card border border-slate-800 space-y-4">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2">
            <h3 className="text-base font-bold text-white font-heading">Interests & Hobbies</h3>
            <button
              onClick={() => {
                const newInt: InterestItem = {
                  id: 'int_' + Date.now(),
                  name: ''
                };
                onChange({ ...resume, interests: [...(resume.interests || []), newInt] });
              }}
              className="px-4 py-1.5 rounded-xl bg-indigo-600 text-white font-bold text-xs flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" /> Add Interest
            </button>
          </div>

          {(!resume.interests || resume.interests.length === 0) ? (
            <p className="text-xs text-slate-400 text-center py-4">No interests added yet.</p>
          ) : (
            <div className="flex flex-wrap gap-2 py-2">
              {resume.interests.map((int, index) => (
                <div key={int.id} className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700">
                  <input
                    type="text"
                    placeholder="e.g. Open Source, Photography"
                    value={int.name}
                    onChange={(e) => {
                      const arr = [...resume.interests];
                      arr[index] = { ...arr[index], name: e.target.value };
                      onChange({ ...resume, interests: arr });
                    }}
                    className="bg-transparent text-xs text-white focus:outline-none w-36"
                  />
                  <button
                    onClick={() => onChange({ ...resume, interests: resume.interests.filter(i => i.id !== int.id) })}
                    className="text-slate-500 hover:text-rose-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SECTION 11: REFERENCES */}
      {activeSection === 'references' && (
        <div className="p-6 rounded-2xl glass-card border border-slate-800 space-y-4">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2">
            <h3 className="text-base font-bold text-white font-heading">References</h3>
            <button
              onClick={() => {
                const newRef: ReferenceItem = {
                  id: 'ref_' + Date.now(),
                  name: '',
                  position: '',
                  company: '',
                  email: '',
                  phone: ''
                };
                onChange({ ...resume, references: [...(resume.references || []), newRef] });
              }}
              className="px-4 py-1.5 rounded-xl bg-indigo-600 text-white font-bold text-xs flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" /> Add Reference
            </button>
          </div>

          {(!resume.references || resume.references.length === 0) ? (
            <p className="text-xs text-slate-400 text-center py-4">No references added yet.</p>
          ) : (
            resume.references.map((ref, index) => (
              <div key={ref.id} className="p-4 rounded-xl glass-panel border border-slate-800 space-y-3">
                <div className="flex justify-between">
                  <span className="text-xs font-bold text-indigo-400 font-mono">Reference #{index + 1}</span>
                  <button
                    onClick={() => onChange({ ...resume, references: resume.references.filter(r => r.id !== ref.id) })}
                    className="text-slate-500 hover:text-rose-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <InputField
                    {...renderFieldProps("Full Name", "references", ref.name, "e.g. Dr. Robert Miller", (val) => {
                      const arr = [...resume.references];
                      arr[index] = { ...arr[index], name: val };
                      onChange({ ...resume, references: arr });
                    })}
                  />
                  <InputField
                    {...renderFieldProps("Position / Role", "references", ref.position, "e.g. VP of Engineering", (val) => {
                      const arr = [...resume.references];
                      arr[index] = { ...arr[index], position: val };
                      onChange({ ...resume, references: arr });
                    })}
                  />
                  <InputField
                    {...renderFieldProps("Company / Organization", "references", ref.company, "e.g. TechCorp Solutions", (val) => {
                      const arr = [...resume.references];
                      arr[index] = { ...arr[index], company: val };
                      onChange({ ...resume, references: arr });
                    })}
                  />
                  <InputField
                    {...renderFieldProps("Email Address", "references", ref.email, "e.g. rmiller@techcorp.io", (val) => {
                      const arr = [...resume.references];
                      arr[index] = { ...arr[index], email: val };
                      onChange({ ...resume, references: arr });
                    })}
                  />
                  <InputField
                    {...renderFieldProps("Phone Number", "references", ref.phone, "e.g. +1 (555) 019-2834", (val) => {
                      const arr = [...resume.references];
                      arr[index] = { ...arr[index], phone: val };
                      onChange({ ...resume, references: arr });
                    })}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      )}

    </div>
  );
};
