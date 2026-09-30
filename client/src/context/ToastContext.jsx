import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      removeToast(id);
    }, 4500);
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast container */}
      <div
        style={{
          position: 'fixed',
          top: '24px',
          right: '24px',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          maxWidth: '380px',
          width: 'calc(100% - 48px)',
          pointerEvents: 'none',
        }}
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            style={{
              pointerEvents: 'auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              padding: '14px 18px',
              borderRadius: '12px',
              background: '#0F172A',
              color: '#FFFFFF',
              boxShadow: '0 10px 25px rgba(0,0,0,0.6)',
              border:
                toast.type === 'success'
                  ? '1px solid rgba(0, 191, 255, 0.6)'
                  : toast.type === 'error'
                  ? '1px solid rgba(239, 68, 68, 0.6)'
                  : '1px solid rgba(59, 130, 246, 0.6)',
              animation: 'slideIn 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {toast.type === 'success' && (
                <CheckCircle2 size={20} color="#00BFFF" style={{ flexShrink: 0 }} />
              )}
              {toast.type === 'error' && (
                <AlertCircle size={20} color="#EF4444" style={{ flexShrink: 0 }} />
              )}
              {toast.type === 'info' && (
                <Info size={20} color="#60A5FA" style={{ flexShrink: 0 }} />
              )}
              <span style={{ fontSize: '0.9rem', fontWeight: 500, lineHeight: 1.4 }}>
                {toast.message}
              </span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#94A3B8',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: '2px',
              }}
              aria-label="Close notification"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
