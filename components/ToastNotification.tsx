
import React from 'react';

interface ToastNotificationProps {
  message: string;
  show: boolean;
}

export const ToastNotification: React.FC<ToastNotificationProps> = ({ message, show }) => {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-slate-800 text-white px-6 py-3 rounded-full shadow-lg transition-all duration-300 ease-in-out z-[100]
        ${show ? 'transform translate-y-0 opacity-100' : 'transform translate-y-10 opacity-0 pointer-events-none'}
      `}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span className="font-medium">{message}</span>
    </div>
  );
};
