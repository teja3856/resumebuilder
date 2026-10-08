import React, { useState } from 'react';
import { Bot, MessageSquare, X, Send, Sparkles, User, HelpCircle, ArrowRight } from 'lucide-react';

interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
}

export const AIChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputMsg, setInputMsg] = useState<string>('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'ai',
      text: "Hello! I'm ResumeAI Assistant. Ask me anything about what to write, ATS scoring rules, or how to describe your experience!"
    }
  ]);

  const quickPrompts = [
    "What should I write in summary?",
    "Explain ATS compatibility",
    "How to describe projects?",
    "Suggest action verbs"
  ];

  const handleSend = (textToSend?: string) => {
    const q = textToSend || inputMsg;
    if (!q.trim()) return;

    const newMsgs: ChatMessage[] = [...messages, { sender: 'user', text: q }];
    setMessages(newMsgs);
    if (!textToSend) setInputMsg('');

    // Generate intelligent responses based on query keywords
    setTimeout(() => {
      let reply = "Start experience bullet points with strong action verbs like Engineered, Spearheaded, or Automated, and include numbers like percentages (%) or dollar amounts ($).";
      const lower = q.toLowerCase();

      if (lower.includes("summary")) {
        reply = "In your summary, write 3 sentences covering: 1) Your target role & experience level, 2) Core technical stack, 3) Key quantifiable accomplishment.";
      } else if (lower.includes("ats")) {
        reply = "ATS (Applicant Tracking System) scans for matching keywords in plain text. Avoid graphics, multi-column tables inside PDF text areas, and non-standard section headers.";
      } else if (lower.includes("project")) {
        reply = "Describe projects using: [Action Verb] + [Core Tech Used] + [What You Built] + [User/Business Outcome]. Example: Built a React app serving 500 users.";
      } else if (lower.includes("verb") || lower.includes("skill")) {
        reply = "Top action verbs: Engineered, Spearheaded, Optimized, Accelerated, Automated, Architected, Designed, Formulated.";
      }

      setMessages([...newMsgs, { sender: 'ai', text: reply }]);
    }, 500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="p-4 rounded-full bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-600 text-white shadow-2xl shadow-indigo-500/40 hover:scale-110 active:scale-95 transition-all flex items-center justify-center group"
          title="Open AI Chat Assistant"
        >
          <Bot className="w-6 h-6 animate-pulse" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap text-xs font-bold pl-0 group-hover:pl-2">
            Ask ResumeAI
          </span>
        </button>
      )}

      {/* Floating Chat Modal */}
      {isOpen && (
        <div className="w-[360px] sm:w-[400px] h-[520px] glass-card rounded-3xl p-4 border border-slate-700/80 shadow-2xl flex flex-col justify-between overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          
          {/* Header */}
          <div className="flex justify-between items-center pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white font-heading">ResumeAI Chatbot</h4>
                <p className="text-[10px] text-emerald-400 font-medium">Online • Instant Advice</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto py-3 space-y-3 pr-1 text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-2 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'ai' && (
                  <div className="w-6 h-6 rounded-lg bg-indigo-600/30 text-indigo-300 flex items-center justify-center shrink-0">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}
                <div
                  className={`p-3 rounded-2xl max-w-[80%] leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-indigo-600 text-white rounded-tr-none font-medium'
                      : 'glass-panel text-slate-200 border border-slate-800 rounded-tl-none'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Prompts */}
          <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {quickPrompts.map((p, i) => (
              <button
                key={i}
                onClick={() => handleSend(p)}
                className="px-2.5 py-1 rounded-full glass-panel border border-slate-800 text-[10px] font-medium text-slate-300 hover:text-white hover:border-indigo-500/50 whitespace-nowrap transition-all"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="flex items-center gap-2 pt-2 border-t border-slate-800"
          >
            <input
              type="text"
              placeholder="Ask anything about your resume..."
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              className="flex-1 px-3.5 py-2 rounded-xl glass-input text-xs"
            />
            <button
              type="submit"
              className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-md transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}

    </div>
  );
};
