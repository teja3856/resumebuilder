import React from 'react';
import { 
  Sparkles, 
  LayoutDashboard, 
  FileText, 
  Palette, 
  Sun, 
  Moon, 
  Eye, 
  User, 
  Briefcase, 
  Globe, 
  Award,
  Download
} from 'lucide-react';
import { UserProfile } from '../types/resume';

interface NavbarProps {
  activeTab: 'landing' | 'dashboard' | 'builder' | 'cover-letter' | 'portfolio' | 'templates';
  setActiveTab: (tab: 'landing' | 'dashboard' | 'builder' | 'cover-letter' | 'portfolio' | 'templates') => void;
  theme: 'dark' | 'light' | 'high-contrast';
  setTheme: (t: 'dark' | 'light' | 'high-contrast') => void;
  user: UserProfile | null;
  onOpenAuth: (mode?: 'login' | 'signup') => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  theme,
  setTheme,
  user,
  onOpenAuth,
  onLogout
}) => {
  const toggleTheme = () => {
    if (theme === 'dark') setTheme('light');
    else if (theme === 'light') setTheme('high-contrast');
    else setTheme('dark');
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-card border-b border-slate-800/60 bg-slate-950/80 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <div 
          onClick={() => setActiveTab('landing')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-white animate-pulse" />
          </div>
          <div>
            <span className="text-xl font-extrabold bg-gradient-to-r from-white via-indigo-200 to-purple-400 bg-clip-text text-transparent font-heading">
              ResumeCraft<span className="text-indigo-400 font-mono text-sm ml-1 px-1.5 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/30">AI</span>
            </span>
          </div>
        </div>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-slate-800/80">
          <button
            onClick={() => setActiveTab('landing')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'landing' 
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            Home
          </button>
          
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'dashboard' 
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            Dashboard
          </button>

          <button
            onClick={() => setActiveTab('builder')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'builder' 
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            Resume Builder
          </button>

          <button
            onClick={() => setActiveTab('templates')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'templates' 
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            Templates (15)
          </button>

          <button
            onClick={() => setActiveTab('cover-letter')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'cover-letter' 
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            Cover Letter
          </button>

          <button
            onClick={() => setActiveTab('portfolio')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'portfolio' 
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            Portfolio Generator
          </button>
        </nav>

        {/* Right Tools & User */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            title={`Current theme: ${theme}. Click to switch.`}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          >
            {theme === 'dark' && <Moon className="w-4 h-4 text-purple-400" />}
            {theme === 'light' && <Sun className="w-4 h-4 text-amber-400" />}
            {theme === 'high-contrast' && <Eye className="w-4 h-4 text-emerald-400" />}
          </button>

          {/* User Auth */}
          {user ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800">
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white">
                  {user.name.charAt(0)}
                </div>
                <span className="text-xs font-medium text-slate-200 hidden sm:inline">{user.name}</span>
              </div>
              <button
                onClick={onLogout}
                className="text-xs text-slate-400 hover:text-rose-400 px-2 py-1 transition-colors font-semibold"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onOpenAuth('login')}
                className="px-3 py-1.5 rounded-xl text-slate-300 hover:text-white text-xs font-semibold glass-panel border border-slate-800 transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => onOpenAuth('signup')}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white text-xs font-semibold shadow-lg shadow-indigo-500/20 hover:opacity-95 hover:scale-[1.02] transition-all flex items-center gap-1.5"
              >
                <User className="w-3.5 h-3.5" />
                Sign Up
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};
