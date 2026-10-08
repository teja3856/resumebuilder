import QRCode from 'qrcode';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { ResumeData } from '../types/resume';

export async function generateQRCodeURL(text: string): Promise<string> {
  try {
    return await QRCode.toDataURL(text, { margin: 1, width: 200 });
  } catch (err) {
    console.error('Failed to generate QR Code:', err);
    return '';
  }
}

export async function exportResumeToPDF(elementId: string = 'printable-resume', fileName?: string, resumeName?: string): Promise<void> {
  const elem = document.getElementById(elementId);
  if (!elem) {
    alert("Could not find resume element to generate PDF.");
    return;
  }

  const outName = fileName || `${(resumeName || 'Resume').trim().replace(/\s+/g, '_')}.pdf`;

  try {
    if (document.fonts) {
      await document.fonts.ready;
    }

    const canvas = await html2canvas(elem, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: null,
      windowWidth: 794,
      onclone: (clonedDoc) => {
        const clonedElem = clonedDoc.getElementById(elementId);
        if (clonedElem) {
          clonedElem.style.transform = 'none';
          clonedElem.style.margin = '0 auto';
          clonedElem.style.boxShadow = 'none';
          clonedElem.style.width = '794px';
          clonedElem.style.minWidth = '794px';
          clonedElem.style.maxWidth = '794px';
          clonedElem.style.letterSpacing = 'normal';
          clonedElem.style.wordSpacing = 'normal';

          if (clonedElem.parentElement) {
            clonedElem.parentElement.style.transform = 'none';
            clonedElem.parentElement.style.padding = '0';
            clonedElem.parentElement.style.margin = '0';
            clonedElem.parentElement.style.width = '794px';
          }

          const allChildren = clonedElem.querySelectorAll('*');
          allChildren.forEach((child: any) => {
            child.style.letterSpacing = 'normal';
            child.style.wordSpacing = 'normal';
          });
        }

        if (clonedDoc.body) {
          clonedDoc.body.style.margin = '0';
          clonedDoc.body.style.padding = '0';
          clonedDoc.body.style.width = '794px';
        }
      }
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    if (imgHeight <= pdfHeight) {
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    } else {
      let heightLeft = imgHeight;
      let page = 0;

      while (heightLeft > 0) {
        if (page > 0) {
          pdf.addPage();
        }
        const position = -(page * pdfHeight);
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
        page++;
      }
    }

    pdf.save(outName);
  } catch (err) {
    console.error("PDF export error:", err);
    alert("Failed to export PDF directly. Opening print dialog as fallback...");
    window.print();
  }
}

export function exportResumeToTXT(resume: ResumeData): void {
  const p = resume.personalInfo;
  const name = (p.fullName || 'RESUME').trim();
  let text = `====================================================\n`;
  text += `${name.toUpperCase()}\n`;
  if (p.jobTitle) text += `${p.jobTitle}\n`;
  text += `Email: ${p.email || ''} | Phone: ${p.phone || ''} | Location: ${p.location || ''}\n`;
  if (p.linkedin) text += `LinkedIn: ${p.linkedin} | `;
  if (p.github) text += `GitHub: ${p.github} | `;
  if (p.website) text += `Portfolio: ${p.website}\n`;
  text += `====================================================\n\n`;

  if (resume.summary) {
    text += `PROFESSIONAL SUMMARY\n--------------------\n${resume.summary}\n\n`;
  }

  if (resume.experiences && resume.experiences.length > 0) {
    text += `WORK EXPERIENCE\n---------------\n`;
    resume.experiences.forEach(exp => {
      text += `${exp.role.toUpperCase()} - ${exp.company} (${exp.startDate} - ${exp.isCurrent ? 'Present' : exp.endDate})\n`;
      if (exp.location) text += `Location: ${exp.location}\n`;
      if (exp.bullets) exp.bullets.forEach(b => text += `  • ${b}\n`);
      text += `\n`;
    });
  }

  if (resume.education && resume.education.length > 0) {
    text += `EDUCATION\n---------\n`;
    resume.education.forEach(edu => {
      text += `${edu.degree} ${edu.fieldOfStudy ? 'in ' + edu.fieldOfStudy : ''}\n${edu.institution} | ${edu.startDate} - ${edu.endDate}\n`;
      if (edu.gpa) text += `GPA: ${edu.gpa}\n`;
      text += `\n`;
    });
  }

  if (resume.skills && resume.skills.length > 0) {
    text += `SKILLS\n------\n`;
    text += resume.skills.map(s => s.name).join(', ') + `\n\n`;
  }

  if (resume.projects && resume.projects.length > 0) {
    text += `PROJECTS\n--------\n`;
    resume.projects.forEach(proj => {
      text += `${proj.title} [${(proj.techStack || []).join(', ')}]\n`;
      if (proj.description) text += `${proj.description}\n`;
      if (proj.bullets) proj.bullets.forEach(b => text += `  • ${b}\n`);
      text += `\n`;
    });
  }

  if (resume.certifications && resume.certifications.length > 0) {
    text += `CERTIFICATIONS\n--------------\n`;
    resume.certifications.forEach(cert => {
      text += `• ${cert.name} - ${cert.issuer} (${cert.issueDate}${cert.expiryDate ? ' - ' + cert.expiryDate : ''})\n`;
    });
    text += `\n`;
  }

  if (resume.achievements && resume.achievements.length > 0) {
    text += `ACHIEVEMENTS & AWARDS\n---------------------\n`;
    resume.achievements.forEach(ach => {
      text += `• ${ach.title} (${ach.organization}, ${ach.date})\n  ${ach.description}\n`;
    });
    text += `\n`;
  }

  if (resume.languages && resume.languages.length > 0) {
    text += `LANGUAGES\n---------\n`;
    text += resume.languages.map(l => `${l.language} (${l.proficiency})`).join(', ') + `\n\n`;
  }

  if (resume.interests && resume.interests.length > 0) {
    text += `INTERESTS & HOBBIES\n-------------------\n`;
    text += resume.interests.map(i => i.name).join(', ') + `\n\n`;
  }

  if (resume.references && resume.references.length > 0) {
    text += `REFERENCES\n----------\n`;
    resume.references.forEach(ref => {
      text += `• ${ref.name} - ${ref.position} at ${ref.company} (${ref.email} | ${ref.phone})\n`;
    });
    text += `\n`;
  }

  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${name.replace(/\s+/g, '_')}_Resume.txt`;
  link.click();
  URL.revokeObjectURL(url);
}

export function exportResumeToHTML(resume: ResumeData, elementId: string = 'printable-resume'): void {
  const elem = document.getElementById(elementId);
  if (!elem) return;

  const title = (resume.personalInfo.fullName || 'Resume').trim();
  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - Resume</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Outfit:wght@500;600;700;800&family=Roboto+Slab:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
      background-color: #0f172a;
      min-height: 100vh;
      padding: 2rem 1rem;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      margin: 0;
    }
    #printable-resume {
      max-width: 800px;
      width: 100%;
      margin: 0 auto;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
      border-radius: 8px;
      overflow: hidden;
    }
  </style>
</head>
<body>
  ${elem.outerHTML}
</body>
</html>`;

  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${title.replace(/\s+/g, '_')}_Resume.html`;
  link.click();
  URL.revokeObjectURL(url);
}

export function exportResumeToDOCX(resume: ResumeData): void {
  const p = resume.personalInfo;
  const name = (p.fullName || 'Resume').trim();
  
  let docHtml = `
  <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
  <head>
    <meta charset='utf-8'>
    <title>${name}</title>
    <style>
      @page {
        size: 8.5in 11in;
        margin: 0.75in;
      }
      body { font-family: 'Calibri', 'Arial', sans-serif; font-size: 11pt; line-height: 1.35; color: #111827; margin: 0; padding: 0; }
      h1 { font-size: 22pt; color: #0f172a; margin: 0 0 2pt 0; text-transform: uppercase; font-weight: bold; }
      .job-title { font-size: 13pt; color: #4f46e5; font-weight: bold; margin: 0 0 8pt 0; }
      .contact-info { font-size: 9.5pt; color: #4b5563; margin-bottom: 14pt; border-bottom: 1pt solid #cbd5e1; padding-bottom: 6pt; }
      h2 { font-size: 12pt; color: #4f46e5; border-bottom: 1.5pt solid #4f46e5; padding-bottom: 2pt; margin-top: 14pt; margin-bottom: 6pt; text-transform: uppercase; font-weight: bold; }
      .item-header { font-weight: bold; font-size: 11pt; color: #0f172a; margin-top: 6pt; }
      .item-sub { font-style: italic; color: #4b5563; font-size: 10pt; margin-bottom: 4pt; }
      ul { margin: 3pt 0 8pt 18pt; padding: 0; }
      li { margin-bottom: 3pt; }
      p { margin: 3pt 0 6pt 0; }
    </style>
  </head>
  <body>
    <h1>${name}</h1>
    <div class="job-title">${p.jobTitle || ''}</div>
    <div class="contact-info">
      ${[p.email, p.phone, p.location, p.linkedin, p.github, p.website].filter(Boolean).join(' | ')}
    </div>
  `;

  if (resume.summary) {
    docHtml += `<h2>Professional Summary</h2><p>${resume.summary}</p>`;
  }

  if (resume.experiences && resume.experiences.length > 0) {
    docHtml += `<h2>Work Experience</h2>`;
    resume.experiences.forEach(exp => {
      docHtml += `<div class="item-header">${exp.role} — ${exp.company} (${exp.startDate} - ${exp.isCurrent ? 'Present' : exp.endDate})</div>`;
      if (exp.location) docHtml += `<div class="item-sub">${exp.location}</div>`;
      if (exp.bullets && exp.bullets.length > 0) {
        docHtml += `<ul>${exp.bullets.map(b => `<li>${b}</li>`).join('')}</ul>`;
      }
    });
  }

  if (resume.education && resume.education.length > 0) {
    docHtml += `<h2>Education</h2>`;
    resume.education.forEach(edu => {
      docHtml += `<div class="item-header">${edu.degree} ${edu.fieldOfStudy ? 'in ' + edu.fieldOfStudy : ''}</div>`;
      docHtml += `<div class="item-sub">${edu.institution} (${edu.startDate} - ${edu.endDate})${edu.gpa ? ' | GPA: ' + edu.gpa : ''}</div>`;
    });
  }

  if (resume.skills && resume.skills.length > 0) {
    docHtml += `<h2>Skills</h2><p>${resume.skills.map(s => s.name).join(', ')}</p>`;
  }

  if (resume.projects && resume.projects.length > 0) {
    docHtml += `<h2>Key Projects</h2>`;
    resume.projects.forEach(proj => {
      docHtml += `<div class="item-header">${proj.title} ${proj.techStack?.length ? '[' + proj.techStack.join(', ') + ']' : ''}</div>`;
      if (proj.description) docHtml += `<p>${proj.description}</p>`;
      if (proj.bullets && proj.bullets.length > 0) {
        docHtml += `<ul>${proj.bullets.map(b => `<li>${b}</li>`).join('')}</ul>`;
      }
    });
  }

  if (resume.certifications && resume.certifications.length > 0) {
    docHtml += `<h2>Certifications</h2><ul>`;
    resume.certifications.forEach(cert => {
      docHtml += `<li><strong>${cert.name}</strong> — ${cert.issuer} (${cert.issueDate}${cert.expiryDate ? ' - ' + cert.expiryDate : ''})</li>`;
    });
    docHtml += `</ul>`;
  }

  if (resume.achievements && resume.achievements.length > 0) {
    docHtml += `<h2>Achievements & Awards</h2>`;
    resume.achievements.forEach(ach => {
      docHtml += `<div class="item-header">${ach.title} (${ach.organization}, ${ach.date})</div><p>${ach.description}</p>`;
    });
  }

  if (resume.languages && resume.languages.length > 0) {
    docHtml += `<h2>Languages</h2><p>${resume.languages.map(l => `${l.language} (${l.proficiency})`).join(', ')}</p>`;
  }

  if (resume.interests && resume.interests.length > 0) {
    docHtml += `<h2>Interests & Hobbies</h2><p>${resume.interests.map(i => i.name).join(', ')}</p>`;
  }

  if (resume.references && resume.references.length > 0) {
    docHtml += `<h2>References</h2><ul>`;
    resume.references.forEach(ref => {
      docHtml += `<li><strong>${ref.name}</strong> (${ref.position} at ${ref.company}) - ${ref.email} | ${ref.phone}</li>`;
    });
    docHtml += `</ul>`;
  }

  docHtml += `</body></html>`;

  const blob = new Blob(['\ufeff' + docHtml], { type: 'application/msword' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${name.replace(/\s+/g, '_')}_Resume.docx`;
  link.click();
  URL.revokeObjectURL(url);
}

export function triggerPrintPDF(): void {
  window.print();
}

