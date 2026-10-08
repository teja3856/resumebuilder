import React from 'react';
import { ResumeData } from '../../types/resume';
import { Mail, Phone, MapPin, Globe, Linkedin, Github, Award, BookOpen, Briefcase, Code, User, Trophy, Heart, Users } from 'lucide-react';

interface TemplateRendererProps {
  resume: ResumeData;
  highContrast?: boolean;
}

export const TemplateRenderer: React.FC<TemplateRendererProps> = ({ resume, highContrast }) => {
  const { personalInfo: p, customization: c, templateId } = resume;
  const accent = c?.themeColor || '#6366f1';

  const fontClass = 
    c?.fontFamily === 'serif' ? 'font-serif' :
    c?.fontFamily === 'mono' ? 'font-mono' :
    c?.fontFamily === 'heading' ? 'font-heading' : 'font-sans';

  const marginClass = 
    c?.margins === 'compact' ? 'p-4 sm:p-6' :
    c?.margins === 'spacious' ? 'p-8 sm:p-12' : 'p-6 sm:p-8';

  const fontScale = 
    c?.fontSize === 'small' ? 'text-[11px]' :
    c?.fontSize === 'large' ? 'text-sm' : 'text-xs';

  const leadingClass = 
    c?.lineSpacing === 'tight' ? 'leading-snug' :
    c?.lineSpacing === 'relaxed' ? 'leading-relaxed' : 'leading-normal';

  const headerStyle = c?.headerStyle || (
    templateId === 'classic' || templateId === 'executive' ? 'classic' :
    templateId === 'minimal' ? 'minimal' :
    templateId === 'premium' || templateId === 'creative' ? 'banner' : 'modern'
  );

  // Helper for Section Titles
  const SectionTitle = ({ title, icon: Icon }: { title: string; icon?: any }) => (
    <div className="border-b-2 pb-1 mb-3 flex items-center gap-2" style={{ borderColor: accent }}>
      {c?.showIcons !== false && Icon && <Icon className="w-4 h-4" style={{ color: accent }} />}
      <h3 className="font-bold uppercase tracking-wider text-xs" style={{ color: accent }}>
        {title}
      </h3>
    </div>
  );

  // Header Renderer Component
  const RenderHeader = () => {
    if (headerStyle === 'banner') {
      return (
        <div className="-mx-6 -mt-6 sm:-mx-8 sm:-mt-8 p-6 mb-6 text-white transition-colors" style={{ backgroundColor: accent }}>
          <h1 className="text-3xl font-extrabold tracking-tight">{p.fullName || 'Your Name'}</h1>
          <p className="text-sm font-semibold opacity-90 mt-0.5">{p.jobTitle || 'Target Role Title'}</p>
          <div className="flex flex-wrap gap-3 mt-3 text-[11px] opacity-80">
            {p.email && <span>{p.email}</span>}
            {p.phone && <span>• {p.phone}</span>}
            {p.location && <span>• {p.location}</span>}
            {p.linkedin && <span>• {p.linkedin}</span>}
            {p.github && <span>• {p.github}</span>}
            {p.website && <span>• {p.website}</span>}
          </div>
        </div>
      );
    }

    if (headerStyle === 'classic') {
      return (
        <div className="text-center border-b pb-5 mb-6">
          <h1 className="text-3xl font-black uppercase tracking-wide text-slate-900">{p.fullName || 'Your Name'}</h1>
          <p className="text-sm font-semibold tracking-wider uppercase mt-1" style={{ color: accent }}>{p.jobTitle || 'Target Role Title'}</p>
          <div className={`flex flex-wrap justify-center gap-3 mt-3 text-slate-600 ${fontScale}`}>
            {p.email && <span>{p.email}</span>}
            {p.phone && <span>• {p.phone}</span>}
            {p.location && <span>• {p.location}</span>}
            {p.linkedin && <span>• {p.linkedin}</span>}
            {p.github && <span>• {p.github}</span>}
            {p.website && <span>• {p.website}</span>}
          </div>
        </div>
      );
    }

    if (headerStyle === 'minimal') {
      return (
        <div className="border-b pb-4 mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">{p.fullName || 'Your Name'}</h1>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mt-0.5">{p.jobTitle || 'Target Role Title'}</p>
          <div className={`flex flex-wrap gap-3 mt-2 text-slate-600 ${fontScale}`}>
            {p.email && <span>{p.email}</span>}
            {p.phone && <span>| {p.phone}</span>}
            {p.location && <span>| {p.location}</span>}
            {p.linkedin && <span>| {p.linkedin}</span>}
            {p.github && <span>| {p.github}</span>}
          </div>
        </div>
      );
    }

    if (headerStyle === 'sidebar') {
      return (
        <div className="border-l-4 pl-4 pb-2 mb-6" style={{ borderColor: accent }}>
          <h1 className="text-3xl font-black text-slate-900">{p.fullName || 'Your Name'}</h1>
          <p className="text-sm font-semibold mt-0.5" style={{ color: accent }}>{p.jobTitle || 'Target Role Title'}</p>
          <div className={`flex flex-wrap gap-3 mt-2 text-slate-600 ${fontScale}`}>
            {p.email && <span>{p.email}</span>}
            {p.phone && <span>• {p.phone}</span>}
            {p.location && <span>• {p.location}</span>}
            {p.linkedin && <span>• {p.linkedin}</span>}
            {p.github && <span>• {p.github}</span>}
          </div>
        </div>
      );
    }

    // Default 'modern' split header
    return (
      <div className="border-b pb-6 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            {p.fullName || 'Your Name'}
          </h1>
          <p className="text-sm font-semibold mt-0.5" style={{ color: accent }}>
            {p.jobTitle || 'Target Role Title'}
          </p>
        </div>

        <div className={`space-y-1 text-right text-slate-600 ${fontScale}`}>
          {p.email && <div className="flex items-center sm:justify-end gap-1.5"><Mail className="w-3 h-3 text-slate-400" /> {p.email}</div>}
          {p.phone && <div className="flex items-center sm:justify-end gap-1.5"><Phone className="w-3 h-3 text-slate-400" /> {p.phone}</div>}
          {p.location && <div className="flex items-center sm:justify-end gap-1.5"><MapPin className="w-3 h-3 text-slate-400" /> {p.location}</div>}
          {p.linkedin && <div className="flex items-center sm:justify-end gap-1.5"><Linkedin className="w-3 h-3 text-slate-400" /> {p.linkedin}</div>}
          {p.github && <div className="flex items-center sm:justify-end gap-1.5"><Github className="w-3 h-3 text-slate-400" /> {p.github}</div>}
          {p.website && <div className="flex items-center sm:justify-end gap-1.5"><Globe className="w-3 h-3 text-slate-400" /> {p.website}</div>}
        </div>
      </div>
    );
  };

  // Modern Dual Column Layouts (modern, designer, startup, creative)
  if (templateId === 'modern' || templateId === 'designer' || templateId === 'startup' || templateId === 'creative') {
    return (
      <div 
        id="printable-resume"
        className={`w-full min-h-[1056px] bg-white text-slate-900 shadow-xl ${fontClass} ${marginClass} transition-all`}
      >
        <RenderHeader />

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Content (2 cols) */}
          <div className="md:col-span-2 space-y-6">
            {resume.summary && (
              <div>
                <SectionTitle title="Professional Summary" icon={User} />
                <p className={`text-slate-700 ${leadingClass} ${fontScale}`}>{resume.summary}</p>
              </div>
            )}

            {resume.experiences && resume.experiences.length > 0 && (
              <div>
                <SectionTitle title="Work Experience" icon={Briefcase} />
                <div className="space-y-4">
                  {resume.experiences.map((exp) => (
                    <div key={exp.id}>
                      <div className="flex justify-between items-baseline font-bold text-slate-900">
                        <span>{exp.role}</span>
                        <span className="text-[11px] font-medium text-slate-500">{exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}</span>
                      </div>
                      <div className="text-[11px] font-semibold text-slate-600 mb-1">{exp.company} • {exp.location}</div>
                      {exp.bullets && exp.bullets.length > 0 && (
                        <ul className={`list-disc list-inside space-y-1 text-slate-700 ${fontScale} ${leadingClass}`}>
                          {exp.bullets.map((b, i) => (
                            <li key={i}>{b}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {resume.projects && resume.projects.length > 0 && (
              <div>
                <SectionTitle title="Key Projects" icon={Code} />
                <div className="space-y-3">
                  {resume.projects.map((proj) => (
                    <div key={proj.id}>
                      <div className="flex justify-between font-bold text-slate-900">
                        <span>{proj.title}</span>
                        {proj.techStack && proj.techStack.length > 0 && (
                          <span className="text-[10px] text-indigo-600 font-mono">[{proj.techStack.join(', ')}]</span>
                        )}
                      </div>
                      <p className={`text-slate-700 ${fontScale} ${leadingClass} mb-1`}>{proj.description}</p>
                      {proj.bullets && proj.bullets.length > 0 && (
                        <ul className={`list-disc list-inside space-y-0.5 text-slate-600 ${fontScale}`}>
                          {proj.bullets.map((b, i) => <li key={i}>{b}</li>)}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {resume.achievements && resume.achievements.length > 0 && (
              <div>
                <SectionTitle title="Achievements & Awards" icon={Trophy} />
                <div className="space-y-2">
                  {resume.achievements.map((ach) => (
                    <div key={ach.id} className={fontScale}>
                      <div className="font-bold text-slate-900">{ach.title} <span className="text-slate-500 font-normal">({ach.organization}, {ach.date})</span></div>
                      <p className="text-slate-700">{ach.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {resume.references && resume.references.length > 0 && (
              <div>
                <SectionTitle title="References" icon={Users} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-700 text-xs">
                  {resume.references.map((ref) => (
                    <div key={ref.id} className="p-2 bg-slate-50 rounded border border-slate-200">
                      <div className="font-bold text-slate-900">{ref.name}</div>
                      <div className="text-[11px] text-slate-600">{ref.position} — {ref.company}</div>
                      <div className="text-[10px] text-slate-500">{ref.email} | {ref.phone}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar (1 col) */}
          <div className="space-y-6 border-l border-slate-200 pl-4">
            {resume.skills && resume.skills.length > 0 && (
              <div>
                <SectionTitle title="Skills & Tools" icon={Award} />
                <div className="flex flex-wrap gap-1.5">
                  {resume.skills.map((sk) => (
                    <span 
                      key={sk.id} 
                      className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-800 border border-slate-200"
                    >
                      {sk.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {resume.education && resume.education.length > 0 && (
              <div>
                <SectionTitle title="Education" icon={BookOpen} />
                <div className="space-y-3">
                  {resume.education.map((edu) => (
                    <div key={edu.id} className={fontScale}>
                      <div className="font-bold text-slate-900">{edu.degree}</div>
                      <div className="text-slate-700 font-medium">{edu.institution}</div>
                      <div className="text-slate-500 text-[10px]">{edu.startDate} – {edu.endDate}</div>
                      {edu.gpa && <div className="text-indigo-600 font-semibold text-[10px]">GPA: {edu.gpa}</div>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {resume.certifications && resume.certifications.length > 0 && (
              <div>
                <SectionTitle title="Certifications" icon={Award} />
                <div className="space-y-2 text-slate-700 text-xs">
                  {resume.certifications.map((cert) => (
                    <div key={cert.id}>
                      <div className="font-bold">{cert.name}</div>
                      <div className="text-[10px] text-slate-500">{cert.issuer} • {cert.issueDate}{cert.expiryDate ? ` - ${cert.expiryDate}` : ''}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {resume.languages && resume.languages.length > 0 && (
              <div>
                <SectionTitle title="Languages" icon={Globe} />
                <div className="space-y-1 text-xs">
                  {resume.languages.map((lang) => (
                    <div key={lang.id} className="flex justify-between text-slate-700">
                      <span>{lang.language}</span>
                      <span className="text-slate-500 font-medium text-[10px]">{lang.proficiency}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {resume.interests && resume.interests.length > 0 && (
              <div>
                <SectionTitle title="Interests" icon={Heart} />
                <div className="flex flex-wrap gap-1">
                  {resume.interests.map((int) => (
                    <span key={int.id} className="px-2 py-0.5 rounded text-[10px] bg-slate-50 text-slate-700 border border-slate-200">
                      {int.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Single-Column ATS Layouts (dark, classic, executive, minimal, ats-professional, etc.)
  return (
    <div 
      id="printable-resume"
      className={`w-full min-h-[1056px] ${templateId === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-white text-slate-900'} shadow-xl ${fontClass} ${marginClass} space-y-5 transition-all`}
    >
      <RenderHeader />

      {/* Summary */}
      {resume.summary && (
        <div>
          <SectionTitle title="Professional Summary" icon={User} />
          <p className={`text-slate-700 ${fontScale} ${leadingClass}`}>{resume.summary}</p>
        </div>
      )}

      {/* Experience */}
      {resume.experiences && resume.experiences.length > 0 && (
        <div>
          <SectionTitle title="Work Experience" icon={Briefcase} />
          <div className="space-y-3">
            {resume.experiences.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between font-bold text-slate-900 text-xs">
                  <span>{exp.role} — <span className="font-semibold text-slate-600">{exp.company}</span></span>
                  <span className="text-[11px] font-medium text-slate-500">{exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}</span>
                </div>
                {exp.bullets && exp.bullets.length > 0 && (
                  <ul className={`list-disc list-inside space-y-0.5 text-slate-700 ${fontScale} ${leadingClass} mt-1`}>
                    {exp.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education & Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resume.education && resume.education.length > 0 && (
          <div>
            <SectionTitle title="Education" icon={BookOpen} />
            <div className="space-y-2">
              {resume.education.map((edu) => (
                <div key={edu.id} className={fontScale}>
                  <div className="font-bold text-slate-900">{edu.degree}</div>
                  <div className="text-slate-600">{edu.institution} ({edu.startDate} - {edu.endDate}){edu.gpa ? ` | GPA: ${edu.gpa}` : ''}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {resume.skills && resume.skills.length > 0 && (
          <div>
            <SectionTitle title="Core Skills" icon={Award} />
            <div className="flex flex-wrap gap-1">
              {resume.skills.map((sk) => (
                <span key={sk.id} className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-800 border">
                  {sk.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Projects */}
      {resume.projects && resume.projects.length > 0 && (
        <div>
          <SectionTitle title="Key Projects" icon={Code} />
          <div className="space-y-2">
            {resume.projects.map((proj) => (
              <div key={proj.id} className={fontScale}>
                <div className="font-bold text-slate-900">{proj.title} {proj.techStack?.length > 0 && <span className="font-mono text-[10px] text-indigo-600">[{proj.techStack.join(', ')}]</span>}</div>
                <p className={`text-slate-700 ${leadingClass}`}>{proj.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications & Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resume.certifications && resume.certifications.length > 0 && (
          <div>
            <SectionTitle title="Certifications" icon={Award} />
            <div className="space-y-1 text-xs text-slate-700">
              {resume.certifications.map((cert) => (
                <div key={cert.id}>
                  <span className="font-bold">{cert.name}</span> — {cert.issuer} ({cert.issueDate})
                </div>
              ))}
            </div>
          </div>
        )}

        {resume.achievements && resume.achievements.length > 0 && (
          <div>
            <SectionTitle title="Achievements" icon={Trophy} />
            <div className="space-y-1 text-xs text-slate-700">
              {resume.achievements.map((ach) => (
                <div key={ach.id}>
                  <span className="font-bold">{ach.title}</span> ({ach.organization}, {ach.date})
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Languages & Interests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resume.languages && resume.languages.length > 0 && (
          <div>
            <SectionTitle title="Languages" icon={Globe} />
            <div className="flex flex-wrap gap-3 text-xs text-slate-700">
              {resume.languages.map((lang) => (
                <span key={lang.id}>
                  <strong>{lang.language}:</strong> {lang.proficiency}
                </span>
              ))}
            </div>
          </div>
        )}

        {resume.interests && resume.interests.length > 0 && (
          <div>
            <SectionTitle title="Interests & Hobbies" icon={Heart} />
            <div className="flex flex-wrap gap-1.5 text-xs text-slate-700">
              {resume.interests.map((int) => (
                <span key={int.id} className="px-2 py-0.5 bg-slate-100 rounded border border-slate-200">
                  {int.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* References */}
      {resume.references && resume.references.length > 0 && (
        <div>
          <SectionTitle title="References" icon={Users} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
            {resume.references.map((ref) => (
              <div key={ref.id} className="p-2 border border-slate-200 rounded">
                <div className="font-bold">{ref.name}</div>
                <div className="text-[11px] text-slate-600">{ref.position} — {ref.company}</div>
                <div className="text-[10px] text-slate-500">{ref.email} | {ref.phone}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
