import React, { useEffect, useState } from 'react';
import { CloudIcon, ArrowRight, X, RefreshCw } from 'lucide-react';
import { ResumeData, UserProfile } from '../types/resume';

interface WelcomeBackBannerProps {
  user: UserProfile;
  resumes: ResumeData[];
  lastActiveResumeId: string | null;
  isLoading: boolean;
  onResumeEditing: (resumeId: string) => void;
  onDismiss: () => void;
}

export const WelcomeBackBanner: React.FC<WelcomeBackBannerProps> = ({
  user,
  resumes,
  lastActiveResumeId,
  isLoading,
  onResumeEditing,
  onDismiss
}) => {
  const [visible, setVisible] = useState(false);

  // Animate in on mount
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const handleDismiss = () => {
    setVisible(false);
    setTimeout(onDismiss, 300);
  };

  // Determine which resume to jump to
  const targetResume =
    resumes.find(r => r.id === lastActiveResumeId) || resumes[0];

  const recentResume = [...resumes].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  )[0];

  const jumpTarget = targetResume || recentResume;

  return (
    <div
      className={`fixed bottom-6 left-1/2 z-50 transition-all duration-300 ease-out ${
        visible
          ? 'opacity-100 translate-y-0 -translate-x-1/2'
          : 'opacity-0 translate-y-6 -translate-x-1/2'
      }`}
      style={{ width: 'min(92vw, 580px)' }}
    >
      <div className="relative rounded-2xl border border-indigo-500/40 bg-slate-900/95 backdrop-blur-xl shadow-2xl shadow-indigo-900/30 overflow-hidden">
        
        {/* Gradient top accent bar */}
        <div className="h-0.5 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

        <div className="p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          
          {/* Icon */}
          <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center shadow-lg">
            {isLoading ? (
              <RefreshCw className="w-5 h-5 text-white animate-spin" />
            ) : (
              <CloudIcon className="w-5 h-5 text-white" />
            )}
          </div>

          {/* Text */}
          <div className="flex-1 min-w-0">
            {isLoading ? (
              <>
                <p className="text-sm font-bold text-white">
                  Loading your saved resumes…
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  Syncing from cloud — just a moment
                </p>
              </>
            ) : (
              <>
                <p className="text-sm font-bold text-white">
                  👋 Welcome back, {user.name.split(' ')[0]}!
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  {resumes.length === 1
                    ? `We restored your saved resume.`
                    : `We restored ${resumes.length} saved resumes from the cloud.`}
                  {jumpTarget && (
                    <span className="text-slate-300">
                      {' '}Last edited: <strong>{jumpTarget.title}</strong>
                    </span>
                  )}
                </p>
              </>
            )}
          </div>

          {/* Actions */}
          {!isLoading && jumpTarget && (
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => {
                  onResumeEditing(jumpTarget.id);
                  handleDismiss();
                }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold shadow-md hover:scale-105 active:scale-95 transition-all"
              >
                Resume Editing
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Dismiss X */}
          <button
            onClick={handleDismiss}
            className="absolute top-3 right-3 p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
