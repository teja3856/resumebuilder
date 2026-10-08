import React, { useState } from 'react';
import { ZoomIn, ZoomOut, Maximize2, Minimize2, Layers, Download, Printer, Share2, Sparkles, Check, QrCode, Loader2 } from 'lucide-react';
import { ResumeData, TemplateId } from '../../types/resume';
import { TemplateRenderer } from '../Templates/TemplateRenderer';
import { RESUME_TEMPLATES } from '../../data/templates';
import { exportResumeToTXT, exportResumeToHTML, exportResumeToDOCX, exportResumeToPDF, triggerPrintPDF, generateQRCodeURL } from '../../utils/exporter';

interface ResumePreviewProps {
  resume: ResumeData;
  onUpdateTemplate: (templateId: TemplateId) => void;
  onOpenATSModal: () => void;
  atsScore: number;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({
  resume,
  onUpdateTemplate,
  onOpenATSModal,
  atsScore
}) => {
  const [zoom, setZoom] = useState<number>(0.9);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showShareModal, setShowShareModal] = useState<boolean>(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [exportingFormat, setExportingFormat] = useState<'pdf' | 'docx' | 'txt' | 'html' | null>(null);

  const handleExportPDF = async () => {
    setExportingFormat('pdf');
    try {
      await exportResumeToPDF('printable-resume', undefined, resume.title || resume.personalInfo.fullName);
    } catch (err) {
      console.error('Export PDF error:', err);
    } finally {
      setExportingFormat(null);
    }
  };

  const handleExportDOCX = () => {
    setExportingFormat('docx');
    try {
      exportResumeToDOCX(resume);
    } finally {
      setTimeout(() => setExportingFormat(null), 500);
    }
  };

  const handleExportTXT = () => {
    setExportingFormat('txt');
    try {
      exportResumeToTXT(resume);
    } finally {
      setTimeout(() => setExportingFormat(null), 500);
    }
  };

  const handleExportHTML = () => {
    setExportingFormat('html');
    try {
      exportResumeToHTML(resume);
    } finally {
      setTimeout(() => setExportingFormat(null), 500);
    }
  };

  const handleOpenShare = async () => {
    const url = window.location.href;
    const qr = await generateQRCodeURL(url);
    setQrCodeUrl(qr);
    setShowShareModal(true);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`relative flex flex-col h-full ${isFullscreen ? 'fixed inset-0 z-50 bg-slate-950 p-6' : ''}`}>
      
      {/* Top Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl glass-card border border-slate-800 mb-4 bg-slate-900/80">
        
        {/* Template Selector Dropdown */}
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-indigo-400" />
          <select
            value={resume.templateId}
            onChange={(e) => onUpdateTemplate(e.target.value as TemplateId)}
            className="bg-slate-950 text-white text-xs font-semibold px-3 py-1.5 rounded-xl border border-slate-700 focus:outline-none focus:border-indigo-500"
          >
            {RESUME_TEMPLATES.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name} ({t.category})
              </option>
            ))}
          </select>
        </div>

        {/* ATS Score Badge Button */}
        <button
          onClick={onOpenATSModal}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
            atsScore >= 85 
              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30' 
              : 'bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          ATS Score: {atsScore}/100
        </button>

        {/* Zoom & Screen Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setZoom(Math.max(0.6, zoom - 0.1))}
            className="p-1.5 rounded-lg glass-panel border border-slate-800 text-slate-300 hover:text-white"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-xs font-mono text-slate-400 w-10 text-center">
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={() => setZoom(Math.min(1.3, zoom + 0.1))}
            className="p-1.5 rounded-lg glass-panel border border-slate-800 text-slate-300 hover:text-white"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded-lg glass-panel border border-slate-800 text-slate-300 hover:text-white"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>

        {/* Export Buttons */}
        <div className="flex items-center gap-2">
          <button
            disabled={exportingFormat !== null}
            onClick={handleExportPDF}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
            title="Download PDF document"
          >
            {exportingFormat === 'pdf' ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
            {exportingFormat === 'pdf' ? 'Generating...' : 'PDF'}
          </button>

          <button
            disabled={exportingFormat !== null}
            onClick={handleExportDOCX}
            className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
            title="Download editable Word document"
          >
            {exportingFormat === 'docx' ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
            {exportingFormat === 'docx' ? 'Preparing...' : 'DOCX'}
          </button>

          <button
            disabled={exportingFormat !== null}
            onClick={handleExportTXT}
            className="px-2.5 py-1.5 rounded-xl glass-panel border border-slate-700 disabled:opacity-50 text-slate-200 hover:text-white text-xs font-semibold flex items-center gap-1"
            title="Download plain text file"
          >
            {exportingFormat === 'txt' && <Loader2 className="w-3 h-3 animate-spin" />}
            TXT
          </button>

          <button
            disabled={exportingFormat !== null}
            onClick={handleExportHTML}
            className="px-2.5 py-1.5 rounded-xl glass-panel border border-slate-700 disabled:opacity-50 text-slate-200 hover:text-white text-xs font-semibold flex items-center gap-1"
            title="Download HTML file"
          >
            {exportingFormat === 'html' && <Loader2 className="w-3 h-3 animate-spin" />}
            HTML
          </button>

          <button
            onClick={triggerPrintPDF}
            className="p-1.5 rounded-xl glass-panel border border-slate-700 text-slate-200 hover:text-white"
            title="Browser Print / PDF"
          >
            <Printer className="w-4 h-4" />
          </button>

          <button
            onClick={handleOpenShare}
            className="p-1.5 rounded-xl glass-panel border border-slate-700 text-slate-200 hover:text-white"
            title="Share & QR Code"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Real-time Render Container */}
      <div className="flex-1 overflow-auto p-4 bg-slate-900/60 rounded-2xl border border-slate-800/80 flex justify-center items-start">
        <div 
          style={{ transform: `scale(${zoom})`, transformOrigin: 'top center' }}
          className="transition-transform duration-150 shadow-2xl rounded-sm my-4"
        >
          <TemplateRenderer resume={resume} />
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-sm glass-card rounded-3xl p-6 border border-slate-700 text-center space-y-4">
            <h3 className="text-lg font-bold text-white font-heading">Share Resume & QR Code</h3>
            
            {qrCodeUrl && (
              <div className="bg-white p-3 rounded-2xl w-44 h-44 mx-auto border border-slate-200 flex items-center justify-center shadow-lg">
                <img src={qrCodeUrl} alt="Resume QR Code" className="w-full h-full object-contain" />
              </div>
            )}

            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={window.location.href}
                className="w-full px-3 py-2 rounded-xl glass-input text-xs font-mono"
              />
              <button
                onClick={handleCopyLink}
                className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs flex items-center gap-1.5"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : 'Copy'}
              </button>
            </div>

            <button
              onClick={() => setShowShareModal(false)}
              className="w-full py-2 rounded-xl glass-panel text-slate-300 text-xs font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
