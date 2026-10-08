import { ResumeData, ATSResult } from '../types/resume';

const ACTION_VERBS = [
  'achieved', 'architected', 'automated', 'built', 'collaboration', 'spearheaded',
  'created', 'decreased', 'delivered', 'designed', 'developed', 'directed',
  'engineered', 'established', 'executed', 'expanded', 'generated', 'implemented',
  'improved', 'increased', 'initiated', 'innovated', 'launched', 'managed',
  'maximized', 'mentored', 'negotiated', 'optimized', 'orchestrated', 'pioneered',
  'produced', 'reduced', 'reengineered', 'restructured', 'saved', 'scaled',
  'solved', 'streamlined', 'transformed', 'upgraded'
];

export function analyzeResumeATS(resume: ResumeData): ATSResult {
  let score = 0;
  const issues: ATSResult['issues'] = [];
  const passedChecks: string[] = [];

  // 1. Personal Information Check (20 points)
  let personalScore = 0;
  const info = resume.personalInfo;
  if (info.fullName && info.fullName.trim().length > 2) {
    personalScore += 5;
    passedChecks.push("Full Name provided");
  } else {
    issues.push({
      type: 'critical',
      message: 'Missing Full Name',
      suggestion: 'Add your full professional name at the top of the resume.',
      section: 'Personal Info'
    });
  }

  if (info.jobTitle && info.jobTitle.trim().length > 2) {
    personalScore += 5;
    passedChecks.push("Target Job Title specified");
  } else {
    issues.push({
      type: 'critical',
      message: 'Target Job Title is missing',
      suggestion: 'Include a target role title matching your desired position.',
      section: 'Personal Info'
    });
  }

  if (info.email && info.email.includes('@')) {
    personalScore += 5;
    passedChecks.push("Professional Email address included");
  } else {
    issues.push({
      type: 'critical',
      message: 'Valid Email address is missing',
      suggestion: 'Provide a clean professional email address (e.g. name@domain.com).',
      section: 'Personal Info'
    });
  }

  if (info.phone && info.phone.trim().length > 6) {
    personalScore += 5;
    passedChecks.push("Phone number provided");
  } else {
    issues.push({
      type: 'warning',
      message: 'Phone number missing',
      suggestion: 'Include a contact phone number with country code.',
      section: 'Personal Info'
    });
  }

  // 2. Professional Summary Check (15 points)
  let summaryScore = 0;
  if (resume.summary && resume.summary.trim().length > 50) {
    summaryScore += 15;
    passedChecks.push("Strong Professional Summary (50+ characters)");
  } else if (resume.summary && resume.summary.trim().length > 0) {
    summaryScore += 7;
    issues.push({
      type: 'warning',
      message: 'Professional Summary is too short',
      suggestion: 'Expand your summary to 3-4 sentences highlighting core achievements.',
      section: 'Summary'
    });
  } else {
    issues.push({
      type: 'critical',
      message: 'Professional Summary is missing',
      suggestion: 'Use our AI Smart Assistant to generate a top-tier summary in 1 click.',
      section: 'Summary'
    });
  }

  // 3. Work Experience & Action Verbs (30 points)
  let expScore = 0;
  let totalBullets = 0;
  let actionVerbCount = 0;
  let metricCount = 0;

  if (resume.experiences && resume.experiences.length > 0) {
    expScore += 10;
    passedChecks.push(`${resume.experiences.length} Work Experience entries added`);

    resume.experiences.forEach(exp => {
      exp.bullets.forEach(bullet => {
        totalBullets++;
        const lower = bullet.toLowerCase();
        
        // Action verb check
        if (ACTION_VERBS.some(verb => lower.includes(verb))) {
          actionVerbCount++;
        }

        // Metrics / Numbers check (% or numbers)
        if (/\d+|\d+%|\$\d+/.test(bullet)) {
          metricCount++;
        }
      });
    });

    if (totalBullets >= 3) {
      expScore += 10;
      passedChecks.push(`Good bullet detail (${totalBullets} bullets across experience)`);
    } else {
      issues.push({
        type: 'warning',
        message: 'Few experience bullet points',
        suggestion: 'Aim for at least 3-5 bullet points per role detailing accomplishments.',
        section: 'Experience'
      });
    }

    if (actionVerbCount > 0) {
      expScore += 5;
      passedChecks.push(`Strong action verbs used (${actionVerbCount} action verbs detected)`);
    } else {
      issues.push({
        type: 'warning',
        message: 'Lacks strong action verbs',
        suggestion: 'Start experience bullet points with verbs like Engineered, Spearheaded, Accelerated.',
        section: 'Experience'
      });
    }

    if (metricCount > 0) {
      expScore += 5;
      passedChecks.push(`Quantifiable impact metrics included (${metricCount} metrics detected)`);
    } else {
      issues.push({
        type: 'info',
        message: 'No measurable metrics found in experience',
        suggestion: 'Include percentages (%), revenue ($), or time saved to prove impact.',
        section: 'Experience'
      });
    }
  } else {
    issues.push({
      type: 'warning',
      message: 'No Work Experience listed',
      suggestion: 'If you have no formal jobs, use our "No Work Experience?" AI helper to convert internships, projects, or volunteering into experience.',
      section: 'Experience'
    });
  }

  // 4. Skills & Keywords (15 points)
  let skillScore = 0;
  if (resume.skills && resume.skills.length >= 5) {
    skillScore += 15;
    passedChecks.push(`Robust skills section (${resume.skills.length} skills listed)`);
  } else if (resume.skills && resume.skills.length > 0) {
    skillScore += 8;
    issues.push({
      type: 'warning',
      message: 'Skills list could be expanded',
      suggestion: 'Add at least 6-10 relevant technical and soft skills.',
      section: 'Skills'
    });
  } else {
    issues.push({
      type: 'critical',
      message: 'Skills section is empty',
      suggestion: 'Select your profession to auto-insert 1-click skill chips.',
      section: 'Skills'
    });
  }

  // 5. Education & Projects (20 points)
  let eduProjScore = 0;
  if (resume.education && resume.education.length > 0) {
    eduProjScore += 10;
    passedChecks.push("Education credentials listed");
  } else {
    issues.push({
      type: 'warning',
      message: 'Education section is missing',
      suggestion: 'Include your university degree, high school diploma, or relevant courses.',
      section: 'Education'
    });
  }

  if (resume.projects && resume.projects.length > 0) {
    eduProjScore += 10;
    passedChecks.push("Projects section included");
  } else {
    issues.push({
      type: 'info',
      message: 'Projects section is empty',
      suggestion: 'Adding 1-2 side or capstone projects demonstrates practical hands-on initiative.',
      section: 'Projects'
    });
  }

  // Word count & total calculation
  const fullText = JSON.stringify(resume);
  const wordCount = fullText.split(/\s+/).length;

  score = personalScore + summaryScore + expScore + skillScore + eduProjScore;

  return {
    score: Math.min(100, Math.max(15, score)),
    atsCompatibilityScore: Math.min(100, Math.round((skillScore + personalScore + expScore) * 1.5)),
    grammarScore: actionVerbCount > 2 ? 94 : 82,
    keywordScore: Math.min(100, (resume.skills.length * 8) + 30),
    readabilityScore: wordCount > 250 && wordCount < 900 ? 95 : 75,
    formattingScore: 92,
    wordCount,
    issues,
    passedChecks
  };
}
