import React from 'react';
import { CheckCircle2, Sparkles, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  text: string;
  type?: 'success' | 'info';
}

interface ToastProps {
  toast: ToastMessage | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  if (!toast) return null;

  return (
    <aside
      aria-label="Notifications"
      aria-live="polite"
      className="fixed bottom-6 left-6 z-50 flex items-center gap-3 px-4 py-3 bg-[#131b2b] border border-amber-500/30 text-slate-100 rounded-lg shadow-xl shadow-black/50 backdrop-blur-md animate-in fade-in slide-in-from-bottom-2 duration-200"
    >
      {toast.type === 'info' ? (
        <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
      ) : (
        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
      )}
      <span className="text-sm font-medium tracking-wide">{toast.text}</span>
      <button
        onClick={onClose}
        className="ml-2 text-slate-400 hover:text-white transition-colors"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </aside>
  );
};
