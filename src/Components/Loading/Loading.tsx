import { useTranslation } from 'react-i18next';

const LOGO = new URL('../../assets/Images/LOGO.svg', import.meta.url).href;

interface LoadingProps {
  fullScreen?: boolean;
  message?: string;
  size?: 'small' | 'medium' | 'large';
}

export default function Loading({ 
  fullScreen = false, 
  message,
  size = 'medium' 
}: LoadingProps) {
  const { t } = useTranslation();

  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-16 h-16',
    large: 'w-24 h-24'
  };

  const containerClass = fullScreen
    ? 'fixed inset-0 bg-primary-50 flex items-center justify-center z-50'
    : 'flex items-center justify-center p-8';

  return (
    <div className={containerClass}>
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          <img 
            src={LOGO} 
            alt="JinStore Logo" 
            className={`${sizeClasses[size]} object-contain animate-pulse-slow`}
          />
          <div className="absolute inset-0 -m-4">
            <div className={`${sizeClasses[size]} mx-auto border-4 border-primary-100 border-t-transparent rounded-full animate-spin-slow`}></div>
          </div>
        </div>

        <div className="flex gap-2">
          <div className="w-3 h-3 bg-primary-100 rounded-full animate-bounce-delay-0"></div>
          <div className="w-3 h-3 bg-primary-200 rounded-full animate-bounce-delay-1"></div>
          <div className="w-3 h-3 bg-primary-300 rounded-full animate-bounce-delay-2"></div>
        </div>

        <p className="text-gray-700 font-medium text-lg animate-pulse">
          {message || t('loading.message')}
        </p>
      </div>

      <style>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(0.95);
          }
        }
        
        @keyframes bounce-dots {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .animate-spin-slow {
          animation: spin-slow 2s linear infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
        
        .animate-bounce-delay-0 {
          animation: bounce-dots 1.4s ease-in-out infinite;
          animation-delay: 0s;
        }
        
        .animate-bounce-delay-1 {
          animation: bounce-dots 1.4s ease-in-out infinite;
          animation-delay: 0.2s;
        }
        
        .animate-bounce-delay-2 {
          animation: bounce-dots 1.4s ease-in-out infinite;
          animation-delay: 0.4s;
        }
      `}</style>
    </div>
  );
}

export function Spinner({ className = '' }: { className?: string }) {
  return (
    <div className={`inline-block ${className}`}>
      <div className="w-6 h-6 border-3 border-primary-100 border-t-transparent rounded-full animate-spin"></div>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
}

