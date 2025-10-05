import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

export default function OrdersHeader() {
  const { t } = useTranslation();
  
  return (
    <header className="mb-4 md:mb-6">
      <nav className="flex items-center gap-2 text-xs sm:text-sm mb-2 md:mb-4" aria-label="Breadcrumb">
        <a href="/" className="flex items-center gap-1 sm:gap-2 text-primary-100 hover:text-primary-200 transition-colors">
          <FontAwesomeIcon icon={faGlobe} className="text-xs sm:text-sm" />
          <span className="hidden sm:inline">{t('orders.breadcrumb.dashboard')}</span>
        </a>
        <FontAwesomeIcon icon={faChevronRight} className="text-xs text-gray-400" />
        <span className="text-gray-900 font-medium">{t('orders.breadcrumb.orders')}</span>
      </nav>
    </header>
  );
}
