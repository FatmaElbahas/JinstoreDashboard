import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSearch } from '@fortawesome/free-solid-svg-icons';

const ErrorIcon = new URL('../assets/Images/ErrorPageIcon.svg', import.meta.url).href;

export default function NotFound() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <div className="min-h-screen bg-primary-50 flex items-center justify-center px-4 py-12" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8 flex justify-center">
          <img 
            src={ErrorIcon} 
            alt="404 Error" 
            className="w-64 h-64 object-contain animate-bounce-slow"
          />
        </div>

        <div className="mb-6">
          <h1 className="text-8xl md:text-9xl font-bold text-primary-100 mb-4 tracking-tight">
            404
          </h1>
          <h2 className="text-2xl md:text-4xl font-semibold text-gray-900 mb-4">
            {t('error.title')}
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-md mx-auto leading-relaxed">
            {t('error.description')}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
          <Link
            to="/"
            className="group inline-flex items-center gap-3 px-8 py-3 bg-primary-100 text-white rounded-lg font-medium text-lg hover:bg-primary-200 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            <FontAwesomeIcon 
              icon={faHome} 
              className="text-xl group-hover:rotate-12 transition-transform duration-300" 
            />
            <span>{t('error.backHome')}</span>
          </Link>

          <Link
            to="/products/grid"
            className="group inline-flex items-center gap-3 px-8 py-3 bg-white text-primary-100 border-2 border-primary-100 rounded-lg font-medium text-lg hover:bg-primary-50 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
          >
            <FontAwesomeIcon 
              icon={faSearch} 
              className="text-xl group-hover:scale-110 transition-transform duration-300" 
            />
            <span>{t('error.browseProducts')}</span>
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            {t('error.helpText')}{' '}
            <Link 
              to="/products/grid" 
              className="text-primary-100 font-medium hover:text-primary-200 underline transition-colors"
            >
              {t('error.contactSupport')}
            </Link>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

