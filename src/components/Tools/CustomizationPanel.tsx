import React from 'react';
import { X, Palette, Layout, Sliders, Type } from 'lucide-react';
import { CustomizationOptions } from '../../types/resume';

interface CustomizationPanelProps {
  customization: CustomizationOptions;
  onChange: (updated: CustomizationOptions) => void;
  onClose: () => void;
}

export const CustomizationPanel: React.FC<CustomizationPanelProps> = ({
  customization,
  onChange,
  onClose
}) => {
  const colorPalettes = [
    { name: 'Indigo', color: '#6366f1' },
    { name: 'Royal Blue', color: '#2563eb' },
    { name: 'Ocean', color: '#0284c7' },
    { name: 'Teal', color: '#0d9488' },
    { name: 'Emerald', color: '#059669' },
    { name: 'Cypress', color: '#166534' },
    { name: 'Amber', color: '#d97706' },
    { name: 'Gold', color: '#ca8a04' },
    { name: 'Bronze', color: '#92400e' },
    { name: 'Coral', color: '#e11d48' },
    { name: 'Rose', color: '#f43f5e' },
    { name: 'Violet', color: '#8b5cf6' },
    { name: 'Deep Purple', color: '#6b21a8' },
    { name: 'Dark Slate', color: '#1e293b' },
    { name: 'Charcoal', color: '#374151' },
    { name: 'Wine', color: '#881337' }
  ];

  const fonts = [
    { id: 'sans', name: 'Inter (Clean Sans)' },
    { id: 'heading', name: 'Outfit (Modern)' },
    { id: 'serif', name: 'Playfair (Executive Serif)' },
    { id: 'mono', name: 'Fira Code (Developer Mono)' }
  ];

  const headerStyles = [
    { id: 'modern', name: 'Modern Split', desc: 'Side-by-side name & contact' },
    { id: 'classic', name: 'Classic Centered', desc: 'Centered name & contact bar' },
    { id: 'minimal', name: 'Minimal Left', desc: 'Compact left-aligned clean' },
    { id: 'banner', name: 'Banner Accent', desc: 'Vibrant colored header bar' },
    { id: 'sidebar', name: 'Sidebar Accent', desc: 'Vertical accent stripe' }
  ];

  return (
    <div className="p-6 rounded-2xl glass-card border border-slate-800 space-y-6 max-h-[85vh] overflow-y-auto">
      
      {/* Top Header */}
      <div className="flex justify-between items-center border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Palette className="w-5 h-5 text-indigo-400" />
          <h3 className="text-base font-bold text-white font-heading">Design & Layout Customization</h3>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Header Layout Style Selector */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
          <Layout className="w-3.5 h-3.5 text-indigo-400" /> Header & Resume Layout Style
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {headerStyles.map((hs) => (
            <button
              key={hs.id}
              onClick={() => onChange({ ...customization, headerStyle: hs.id as any })}
              className={`p-2.5 rounded-xl border text-left transition-all ${
                customization.headerStyle === hs.id || (!customization.headerStyle && hs.id === 'modern')
                  ? 'bg-indigo-600/30 border-indigo-500 text-white shadow-md'
                  : 'glass-panel border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <div className="text-xs font-bold text-slate-100">{hs.name}</div>
              <div className="text-[10px] text-slate-400">{hs.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Accent Color Palette & Custom Color Picker */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-xs font-semibold text-slate-300 block">Theme Accent Color</label>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-indigo-300">{customization.themeColor || '#6366f1'}</span>
            <label className="w-6 h-6 rounded-full border border-slate-600 overflow-hidden cursor-pointer shadow-inner">
              <input
                type="color"
                value={customization.themeColor || '#6366f1'}
                onChange={(e) => onChange({ ...customization, themeColor: e.target.value })}
                className="w-8 h-8 -m-1 cursor-pointer"
              />
            </label>
          </div>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-4 gap-2">
          {colorPalettes.map((cp) => (
            <button
              key={cp.color}
              onClick={() => onChange({ ...customization, themeColor: cp.color })}
              className={`p-2 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-all ${
                customization.themeColor === cp.color
                  ? 'border-white bg-slate-800 text-white shadow-md'
                  : 'border-slate-800 glass-panel text-slate-400 hover:text-white'
              }`}
            >
              <span className="w-3.5 h-3.5 rounded-full shrink-0 border border-white/20" style={{ backgroundColor: cp.color }} />
              <span className="truncate text-[10px]">{cp.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Typography Font Family */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
          <Type className="w-3.5 h-3.5 text-purple-400" /> Typography Font
        </label>
        <div className="grid grid-cols-2 gap-2">
          {fonts.map((f) => (
            <button
              key={f.id}
              onClick={() => onChange({ ...customization, fontFamily: f.id as any })}
              className={`p-2.5 rounded-xl border text-xs font-semibold transition-all ${
                customization.fontFamily === f.id
                  ? 'bg-indigo-600 border-indigo-500 text-white shadow-md'
                  : 'glass-panel border-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              {f.name}
            </button>
          ))}
        </div>
      </div>

      {/* Font Size, Line Spacing & Margins */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-1">Font Size</label>
          <div className="flex gap-1 p-1 rounded-xl bg-slate-900 border border-slate-800">
            {(['small', 'medium', 'large'] as const).map((sz) => (
              <button
                key={sz}
                onClick={() => onChange({ ...customization, fontSize: sz })}
                className={`flex-1 py-1.5 rounded-lg text-[11px] capitalize font-medium transition-all ${
                  customization.fontSize === sz ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {sz}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-1">Line Spacing</label>
          <div className="flex gap-1 p-1 rounded-xl bg-slate-900 border border-slate-800">
            {(['tight', 'normal', 'relaxed'] as const).map((ls) => (
              <button
                key={ls}
                onClick={() => onChange({ ...customization, lineSpacing: ls })}
                className={`flex-1 py-1.5 rounded-lg text-[11px] capitalize font-medium transition-all ${
                  customization.lineSpacing === ls || (!customization.lineSpacing && ls === 'normal') ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {ls}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-1">Page Margins</label>
          <div className="flex gap-1 p-1 rounded-xl bg-slate-900 border border-slate-800">
            {(['compact', 'normal', 'spacious'] as const).map((mg) => (
              <button
                key={mg}
                onClick={() => onChange({ ...customization, margins: mg })}
                className={`flex-1 py-1.5 rounded-lg text-[11px] capitalize font-medium transition-all ${
                  customization.margins === mg ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {mg}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Section Icons Toggle */}
      <div className="flex justify-between items-center pt-2 border-t border-slate-800">
        <div>
          <span className="text-xs font-semibold text-white block">Section Icons</span>
          <span className="text-[10px] text-slate-400">Display section title iconography</span>
        </div>
        <button
          onClick={() => onChange({ ...customization, showIcons: !customization.showIcons })}
          className={`w-12 h-6 rounded-full transition-colors relative ${
            customization.showIcons ? 'bg-indigo-600' : 'bg-slate-800'
          }`}
        >
          <div className={`w-5 h-5 rounded-full bg-white absolute top-0.5 left-0.5 transition-transform ${
            customization.showIcons ? 'translate-x-6' : 'translate-x-0'
          }`} />
        </button>
      </div>

    </div>
  );
};
